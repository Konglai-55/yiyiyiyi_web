import { newsArticles,newsDate,type NewsArticle } from './news';
import { HttpError } from './admin-security';
import { ensurePrivateNewsStorage, newsStorageConfig, readNewsObject, writeNewsObject, StorageConflict, StorageUnavailable } from './news-object-storage';
export type ManagedArticle=NewsArticle & {cover:string;status:'draft'|'published'|'offline';publishedAt:string;updatedAt:string;version:number};
type Catalog = {schema:1; revision:number; updatedAt:string; articles:ManagedArticle[]; retiredVersions:Record<string,number>};
const today = () => new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
const catalogKey = async () => `${(await newsStorageConfig()).prefix}/catalog.json`;

function validateCatalog(value: Catalog): Catalog {
  if (!value || value.schema!==1 || !Number.isSafeInteger(value.revision) || value.revision<1 || !Array.isArray(value.articles) || !value.retiredVersions) throw new StorageUnavailable('Invalid news catalog');
  const slugs=new Set<string>();
  for (const article of value.articles) {
    validateArticle(article);
    if(slugs.has(article.slug) || !Number.isSafeInteger(article.version) || article.version<1 || !Number.isFinite(Date.parse(article.updatedAt))) throw new StorageUnavailable('Invalid news article record');
    slugs.add(article.slug);
  }
  return value;
}
async function readCatalog() {
  const result = await readNewsObject<Catalog>(await catalogKey());
  // Missing/unavailable storage is not an empty newsroom and must never resurrect offline articles.
  if (!result) throw new StorageUnavailable('News is not initialized; run scripts/init-news-storage.mjs');
  return {...result,data:validateCatalog(result.data)};
}
export async function initializeNews(articles: ManagedArticle[]) {
  await ensurePrivateNewsStorage();
  const catalog: Catalog=validateCatalog({schema:1,revision:1,updatedAt:new Date().toISOString(),articles,retiredVersions:{}});
  // Conditional create only: repeat initialization cannot overwrite existing edits or deletions.
  await writeNewsObject(await catalogKey(),catalog,{create:true});
}
export function initialBundledNews(): ManagedArticle[] {
  return newsArticles.map(a=>({...a,cover:'',status:'published',publishedAt:newsDate,updatedAt:new Date().toISOString(),version:1}));
}
export async function listNews(all=false) {
  const {data} = await readCatalog();
  return data.articles.filter(a=>all||(a.status==='published'&&a.publishedAt<=today()))
    .sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||b.updatedAt.localeCompare(a.updatedAt));
}
export async function getNews(slug:string) { return (await listNews()).find(a=>a.slug===slug) ?? null; }

async function mutateNews(change:(data:Catalog)=>void) {
  await ensurePrivateNewsStorage();
  for(let attempt=0;attempt<4;attempt++) {
    const {data,etag}=await readCatalog();
    const original=structuredClone(data);
    change(data);
    data.revision++; data.updatedAt=new Date().toISOString();
    const {prefix}=await newsStorageConfig();
    // Archive the previous state BEFORE replacing the live catalog. If backup fails, do not save.
    await writeNewsObject(`${prefix}/history/${original.revision}-${crypto.randomUUID()}.json`,original,{create:true});
    try { await writeNewsObject(await catalogKey(),data,{etag}); return; }
    catch(error) { if(!(error instanceof StorageConflict)) throw error; }
  }
  throw new HttpError(409,'其他窗口正在保存文章，请刷新后重试');
}
export async function createNews(input:ReturnType<typeof validateArticle>) {
  await mutateNews(data=>{
    if(data.articles.some(a=>a.slug===input.slug)) throw new HttpError(409,'文章地址已存在，请换一个地址');
    const version=(Object.hasOwn(data.retiredVersions,input.slug)?data.retiredVersions[input.slug]:0)+1;
    data.articles.push({...input,version,updatedAt:new Date().toISOString()});
  });
}
export async function updateNews(slug:string,input:ReturnType<typeof validateArticle>,version:number) {
  await mutateNews(data=>{
    const index=data.articles.findIndex(a=>a.slug===slug);
    if(index<0||data.articles[index].version!==version) throw new HttpError(409,'其他窗口已修改这篇文章，请刷新后编辑');
    data.articles[index]={...input,version:version+1,updatedAt:new Date().toISOString()};
  });
}
export async function deleteNews(slug:string,version:number) {
  await mutateNews(data=>{
    const article=data.articles.find(a=>a.slug===slug);
    if(!article||article.version!==version) throw new HttpError(409,'文章已被更改或删除，请刷新列表');
    data.retiredVersions[slug]=version;
    data.articles=data.articles.filter(a=>a.slug!==slug);
  });
}
function field(value:unknown,max:number,required=true) {
  if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw new HttpError(400,'请填写完整信息，并检查内容长度');
  return value.trim();
}
function safeUrl(value:unknown) {const raw=field(value??'',2048,false);if(!raw)return '';try{if(new URL(raw).protocol==='https:')return raw;}catch{}throw new HttpError(400,'链接必须是完整的 HTTPS 地址');}
export function validateArticle(input:Record<string,unknown>) {
  const slug=field(input.slug,100);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw new HttpError(400,'文章地址只支持小写英文、数字和短横线');
  if(!['draft','published','offline'].includes(String(input.status)))throw new HttpError(400,'无效的发布状态');
  const publishedAt=field(input.publishedAt,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)||!Number.isFinite(Date.parse(publishedAt))||new Date(publishedAt).toISOString().slice(0,10)!==publishedAt)throw new HttpError(400,'请选择有效的发布日期');
  if(!Array.isArray(input.sections)||!input.sections.length||input.sections.length>40)throw new HttpError(400,'请添加 1–40 个正文段落');
  const source=(input.source??{}) as Record<string,unknown>;
  return {slug,title:field(input.title,160),category:field(input.category,40),summary:field(input.summary,1000),cover:safeUrl(input.cover),status:input.status as ManagedArticle['status'],publishedAt,
    sections:input.sections.map(s=>({title:field(s?.title,160),text:field(s?.text,20000)})),source:{title:field(source.title??'',200,false),publisher:field(source.publisher??'',200,false),url:safeUrl(source.url)}};
}
