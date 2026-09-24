// Copy the existing private news namespace into NEWS_S3_* without deleting the source.
// Run once with both old S3_* and new NEWS_S3_* variables configured.
import assert from 'node:assert/strict';
import { AwsClient } from 'aws4fetch';

const env = process.env;
const required = ['S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY','NEWS_S3_BUCKET','NEWS_S3_ACCESS_KEY_ID','NEWS_S3_SECRET_ACCESS_KEY'];
for (const name of required) if (!env[name]) throw new Error(`Missing ${name}`);
const sourceEndpoint = env.S3_ENDPOINT.replace(/\/$/,'');
const targetEndpoint = (env.NEWS_S3_ENDPOINT || env.S3_ENDPOINT).replace(/\/$/,'');
const prefix = env.NEWS_STORAGE_PREFIX || 'cms-private/news-v1';
if (!/^cms-private\/[a-zA-Z0-9/_-]+$/.test(prefix)) throw new Error('News must use a cms-private/ prefix');
const source = new AwsClient({accessKeyId:env.S3_ACCESS_KEY_ID,secretAccessKey:env.S3_SECRET_ACCESS_KEY,region:env.S3_REGION||'us-east-1',service:'s3',retries:1});
const target = new AwsClient({accessKeyId:env.NEWS_S3_ACCESS_KEY_ID,secretAccessKey:env.NEWS_S3_SECRET_ACCESS_KEY,region:env.NEWS_S3_REGION||env.S3_REGION||'us-east-1',service:'s3',retries:1});

async function listKeys() {
  const url = `${sourceEndpoint}/${env.S3_BUCKET}?list-type=2&prefix=${encodeURIComponent(prefix + '/')}`;
  const response = await source.fetch(url,{signal:AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`Source list failed: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<Key>([^<]+)<\/Key>/g)].map(match => match[1]);
}
async function copy(key) {
  const sourceUrl = `${sourceEndpoint}/${env.S3_BUCKET}/${key}`;
  const targetUrl = `${targetEndpoint}/${env.NEWS_S3_BUCKET}/${key}`;
  const read = await source.fetch(sourceUrl,{signal:AbortSignal.timeout(20000)});
  if (!read.ok) throw new Error(`Read failed for ${key}: ${read.status}`);
  const body = await read.arrayBuffer();
  const headers = {'Content-Type':read.headers.get('content-type') || 'application/json; charset=utf-8','Cache-Control':'private, no-store','If-None-Match':'*'};
  const write = await target.fetch(targetUrl,{method:'PUT',headers,body,signal:AbortSignal.timeout(20000)});
  if (write.status === 412) return 'exists';
  if (!write.ok) throw new Error(`Write failed for ${key}: ${write.status}`);
  return 'copied';
}

const keys = await listKeys();
assert.ok(keys.length,'No news objects found in the source namespace');
let copied = 0, existing = 0;
for (const key of keys) {
  if ((await copy(key)) === 'copied') copied++; else existing++;
}
console.log(`News migration complete: ${keys.length} objects scanned, ${copied} copied, ${existing} already present. Source was not deleted.`);
