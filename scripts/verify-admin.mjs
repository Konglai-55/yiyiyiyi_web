import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:3000';
const password=(await readFile('.private/后台登录.txt','utf8')).match(/初始密码：([^\r\n]+)/)[1];
let cookie='';
async function req(path,method='GET',body,authenticated=true,extra={}){
  return fetch(origin+path,{method,headers:{Origin:origin,...(authenticated&&cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{}),...extra},body:body?JSON.stringify(body):undefined});
}
assert.equal((await req('/api/admin/news','GET',undefined,false)).status,401);
assert.equal((await req('/api/admin/login','POST',{password},false,{Origin:'https://untrusted.example'})).status,403);
const login=await req('/api/admin/login','POST',{password});
if(login.status!==200) throw new Error(`Login: ${login.status} ${await login.text()}`);
cookie=login.headers.get('set-cookie').split(';')[0];
assert.match(login.headers.get('set-cookie'),/HttpOnly/);
let result=await req('/api/admin/news');assert.equal(result.status,200);
const articles=(await result.json()).articles;assert.ok(articles.length>=5);
console.log('PASS authentication, CSRF rejection, initial article import');
const slug='qa-check-'+Date.now();
let article={slug,title:'临时功能验收文章',category:'测试',summary:'验收结束自动删除',sections:[{title:'测试段落',text:'仅用于本地验收。'}],source:{title:'',publisher:'',url:''},cover:'',status:'draft',publishedAt:new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'})};
try{
  assert.equal((await req('/api/admin/news','POST',article)).status,201);
  assert.equal((await req('/news/'+slug)).status,404);
  article={...article,version:1,status:'published'};
  assert.equal((await req('/api/admin/news/'+slug,'PUT',article)).status,200);
  assert.equal((await req('/news/'+slug)).status,200);
  assert.equal((await req('/api/admin/news/'+slug,'PUT',article)).status,409);
  article={...article,version:2,status:'offline'};
  assert.equal((await req('/api/admin/news/'+slug,'PUT',article)).status,200);
  assert.equal((await req('/news/'+slug)).status,404);
  assert.equal((await req('/api/admin/news','POST',{...article,slug:'qa-invalid',cover:'javascript:alert(1)'})).status,400);
  const rejected=await fetch(origin+'/api/admin/upload',{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'image/png'},body:'not an image'});
  assert.equal(rejected.status,415);
  const stats=await req('/api/admin/stats');assert.equal(stats.status,200);
  assert.ok(Number.isInteger((await stats.json()).totals.views));
  console.log('PASS draft visibility, publish, optimistic locking, offline, invalid URL/file rejection, statistics');
}finally{
  const list=await (await req('/api/admin/news')).json();const record=list.articles?.find(a=>a.slug===slug);
  if(record)assert.equal((await req('/api/admin/news/'+slug,'DELETE',{version:record.version})).status,200);
}
assert.equal((await req('/api/admin/logout','POST',{})).status,200);
assert.equal((await req('/api/admin/session')).status,401);
console.log('PASS delete and logout/session revocation; temporary article removed.');
