// Real S3 integration tests in a disposable private namespace, not the live catalog.
import assert from 'node:assert/strict';
import {register} from 'node:module';
register('./typescript-loader.mjs',import.meta.url);
process.env.NEWS_STORAGE_PREFIX=`cms-private/qa-news-${crypto.randomUUID()}`;
const storage=await import('../lib/news-object-storage.ts');
const news=await import('../lib/news-store.ts');
const realFetch=globalThis.fetch;
const created=new Set();
let rejectBackups=false;
let outage=false;
globalThis.fetch=async (input,init)=>{
  const request=new Request(input,init);
  const url=new URL(request.url);
  if(url.pathname.includes('/'+process.env.NEWS_STORAGE_PREFIX+'/')){
    if(outage)throw new Error('Simulated network outage');
    if(rejectBackups&&url.pathname.includes('/history/')&&request.method==='PUT')return new Response('Unavailable',{status:503});
    if(request.method==='PUT')created.add(decodeURIComponent(url.pathname.slice(url.pathname.indexOf(process.env.NEWS_STORAGE_PREFIX))));
  }
  return realFetch(request);
};
const draft={slug:'qa-article',title:'测试新闻',summary:'只用于自动验收',category:'测试',cover:'',status:'draft',publishedAt:'2026-01-01',sections:[{title:'说明',text:'私有草稿正文'}],source:{title:'',publisher:'',url:''}};
try {
  await assert.rejects(()=>news.listNews());
  await news.initializeNews(news.initialBundledNews());
  await assert.rejects(()=>news.initializeNews([]),storage.StorageConflict);
  await news.createNews(draft);
  assert.equal(await news.getNews(draft.slug),null);
  const results=await Promise.allSettled([
    news.updateNews(draft.slug,{...draft,status:'published',title:'窗口一'},1),
    news.updateNews(draft.slug,{...draft,status:'published',title:'窗口二'},1),
  ]);
  assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
  assert.equal(results.find(r=>r.status==='rejected').reason.status,409);
  assert.equal((await news.getNews(draft.slug)).version,2);
  await Promise.all([news.createNews({...draft,slug:'qa-other-a'}),news.createNews({...draft,slug:'qa-other-b'})]);
  assert.equal((await news.listNews(true)).length,8);
  console.log('PASS real simultaneous edits: same article conflicts; unrelated articles both survive');
  await news.updateNews(draft.slug,{...draft,publishedAt:'2099-01-01',status:'published'},2);
  assert.equal(await news.getNews(draft.slug),null);
  await news.updateNews(draft.slug,{...draft,status:'offline'},3);
  assert.equal(await news.getNews(draft.slug),null);
  rejectBackups=true;
  await assert.rejects(()=>news.updateNews(draft.slug,{...draft,status:'published'},4));
  rejectBackups=false;
  assert.equal((await news.listNews(true)).find(a=>a.slug===draft.slug).version,4);
  assert.equal(await news.getNews(draft.slug),null);
  outage=true;
  await assert.rejects(()=>news.listNews());
  outage=false;
  console.log('PASS future publication, offline, failed-backup abort and no stale fallback during outage');
  await news.deleteNews(draft.slug,4);
  await news.createNews(draft);
  await assert.rejects(()=>news.updateNews(draft.slug,{...draft,status:'published'},1),e=>e.status===409);
  assert.equal((await news.listNews(true)).find(a=>a.slug===draft.slug).version,5);
  const {env,prefix}=await storage.newsStorageConfig();
  const newsPublicUrl=env.NEWS_S3_PUBLIC_URL||env.S3_PUBLIC_URL;
  assert.equal((await realFetch(`${newsPublicUrl}/${prefix}/catalog.json`)).status,403);
  console.log('PASS deleted slug recreation protection and private draft catalog');
} finally {
  rejectBackups=false;outage=false;
  globalThis.fetch=realFetch;
  for(const key of created)assert.ok((await storage.signedObject(key,{method:'DELETE'})).ok);
  console.log(`Removed ${created.size} isolated test objects; live news untouched.`);
}
