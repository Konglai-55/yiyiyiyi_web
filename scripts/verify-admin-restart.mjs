import assert from 'node:assert/strict';
import {readFile,writeFile,unlink} from 'node:fs/promises';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:3800';
const stateFile='.private/restart-verification.json';
let cookie='';
async function req(path,method='GET',body,extra={}) {
  return fetch(origin+path,{method,headers:{Origin:origin,Cookie:cookie,...(body?{'Content-Type':'application/json'}:{}),...extra},...(method!=='GET'&&body?{body:JSON.stringify(body)}:{})});
}
if(process.argv[2]==='prepare') {
  const password=process.env.TEST_ADMIN_PASSWORD||(await readFile('.private/后台登录.txt','utf8')).match(/初始密码：([^\r\n]+)/)[1];
  const login=await req('/api/admin/login','POST',{password});
  assert.equal(login.status,200,await login.clone().text());
  cookie=login.headers.get('set-cookie').split(';')[0];
  for(const path of ['/','/news','/news/street-smart-fire-management','/admin'])assert.equal((await req(path)).status,200,path);
  const before=await (await req('/api/admin/stats')).json();
  const event={id:crypto.randomUUID(),session:crypto.randomUUID(),path:'/news',referrer:'https://www.baidu.com/'};
  assert.equal((await req('/api/analytics/pageview','POST',event)).status,200);
  assert.equal((await req('/api/analytics/pageview','POST',event)).status,200);
  assert.equal((await req('/api/analytics/pageview','POST',{...event,id:crypto.randomUUID()},{DNT:'1'})).status,200);
  const after=await (await req('/api/admin/stats')).json();
  assert.equal(after.totals.views,before.totals.views+1);
  const slug='qa-restart-'+Date.now();
  assert.equal((await req('/api/admin/news','POST',{slug,title:'重启验收草稿',summary:'自动测试后删除',category:'测试',cover:'',status:'draft',publishedAt:'2026-01-01',sections:[{title:'检查',text:'不公开的测试内容'}],source:{title:'',publisher:'',url:''}})).status,201);
  await writeFile(stateFile,JSON.stringify({cookie,views:after.totals.views,slug}),{mode:0o600});
  console.log('PASS public pages 200, pageview deduplication, DNT opt-out; restart the server then run check.');
}else if(process.argv[2]==='check') {
  const state=JSON.parse(await readFile(stateFile,'utf8'));cookie=state.cookie;
  assert.equal((await req('/api/admin/session')).status,200);
  const stats=await (await req('/api/admin/stats')).json();assert.ok(stats.totals.views>=state.views);
  const article=(await (await req('/api/admin/news')).json()).articles.find(a=>a.slug===state.slug);
  assert.ok(article);assert.equal(article.status,'draft');
  assert.equal((await req('/news/'+state.slug)).status,404);
  assert.equal((await req('/api/admin/news/'+state.slug,'DELETE',{version:article.version})).status,200);
  assert.equal((await req('/api/admin/logout','POST',{})).status,200);
  assert.equal((await req('/api/admin/session')).status,401);
  await unlink(stateFile);
  console.log('PASS restart persistence: login session, statistics and private draft; test article removed and session revoked.');
}else throw new Error('Use prepare or check');
