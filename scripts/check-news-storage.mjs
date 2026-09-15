// Uses only a uniquely named, disposable probe. Never changes bucket permissions.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { AwsClient } from 'aws4fetch';
const env = process.env;
for (const name of ['S3_ENDPOINT','S3_BUCKET','S3_PUBLIC_URL','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY']) {
  if (!env[name]) throw new Error(`Missing ${name}`);
}
const prefix = env.NEWS_STORAGE_PREFIX || 'cms-private/news-v1';
if (!/^cms-private\/[a-zA-Z0-9/_-]+$/.test(prefix)) throw new Error('News must use a cms-private/ prefix');
const key = `${prefix}/checks/${randomUUID()}.json`;
const url = `${env.S3_ENDPOINT.replace(/\/$/,'')}/${env.S3_BUCKET}/${key}`;
const aws = new AwsClient({accessKeyId:env.S3_ACCESS_KEY_ID,secretAccessKey:env.S3_SECRET_ACCESS_KEY,region:env.S3_REGION||'us-east-1',service:'s3',retries:0});
const put = (body,condition) => aws.fetch(url,{method:'PUT',headers:{'Content-Type':'application/json','Cache-Control':'private, no-store',...condition},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
try {
  let r = await put({probe:1},{'If-None-Match':'*'});
  assert.ok(r.ok,`Create: ${r.status}`);
  const read = await aws.fetch(url,{signal:AbortSignal.timeout(15000)});
  assert.ok(read.ok); const etag = read.headers.get('etag'); assert.ok(etag);
  assert.deepEqual(await read.json(),{probe:1});
  for (const publicUrl of [`${env.S3_PUBLIC_URL.replace(/\/$/,'')}/${key}`,url]) {
    const anonymous = await fetch(publicUrl,{signal:AbortSignal.timeout(15000)});
    assert.ok([403,404].includes(anonymous.status),`Private prefix is public! HTTP ${anonymous.status}`);
  }
  console.log('PASS signed JSON read/write, anonymous read denied');
  r = await put({probe:2},{'If-None-Match':'*'});
  assert.equal(r.status,412,'Storage must reject duplicate create');
  r = await put({probe:2},{'If-Match':etag});
  assert.ok(r.ok,`Conditional update: ${r.status}`);
  r = await put({probe:3},{'If-Match':etag});
  assert.equal(r.status,412,'Storage must reject stale edits');
  assert.deepEqual(await (await aws.fetch(url)).json(),{probe:2});
  console.log('PASS conditional create/update and stale-write protection');
} finally {
  const removed = await aws.fetch(url,{method:'DELETE',signal:AbortSignal.timeout(15000)});
  console.log(`Probe cleanup: HTTP ${removed.status}`);
}
