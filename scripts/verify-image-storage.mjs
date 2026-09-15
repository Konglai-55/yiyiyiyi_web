import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {AwsClient} from 'aws4fetch';
const origin=process.env.TEST_ORIGIN||'http://localhost:3000';
const password=process.env.TEST_ADMIN_PASSWORD||(await readFile('.private/后台登录.txt','utf8')).match(/初始密码：([^\r\n]+)/)[1];
const login=await fetch(origin+'/api/admin/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({password})});
assert.equal(login.status,200);
const cookie=login.headers.get('set-cookie').split(';')[0];
let key;
const aws=new AwsClient({accessKeyId:process.env.S3_ACCESS_KEY_ID,secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,region:process.env.S3_REGION||'us-east-1',service:'s3',retries:0});
try {
  const bytes=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aH1cAAAAASUVORK5CYII=','base64');
  const r=await fetch(origin+'/api/admin/upload',{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'image/png'},body:bytes});
  assert.equal(r.status,200,await r.clone().text());
  const {url}=await r.json();
  assert.ok(url.startsWith(process.env.S3_PUBLIC_URL.replace(/\/$/,'')+'/website/news/'));
  key=url.slice(process.env.S3_PUBLIC_URL.replace(/\/$/,'').length+1);
  const image=await fetch(url);assert.equal(image.status,200);assert.deepEqual(Buffer.from(await image.arrayBuffer()),bytes);
  console.log('PASS authenticated image upload, direct public URL and exact file content');
}finally{
  if(key)assert.ok((await aws.fetch(`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`,{method:'DELETE'})).ok);
  await fetch(origin+'/api/admin/logout',{method:'POST',headers:{Origin:origin,Cookie:cookie,'Content-Type':'application/json'},body:'{}'});
  console.log('Removed test image; existing images and videos unchanged.');
}
