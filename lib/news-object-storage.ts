import { AwsClient } from 'aws4fetch';
import { config } from './server-env';

export class StorageConflict extends Error {}
export class StorageUnavailable extends Error {}
export async function newsStorageConfig() {
  const env = await config();
  for (const key of ['S3_ENDPOINT','S3_BUCKET','S3_PUBLIC_URL','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY']) {
    if (!env[key]) throw new StorageUnavailable(`Missing ${key}`);
  }
  const prefix = env.NEWS_STORAGE_PREFIX || 'cms-private/news-v1';
  if (!/^cms-private\/[a-zA-Z0-9/_-]+$/.test(prefix)) throw new StorageUnavailable('News prefix must be inside cms-private/');
  return {env, prefix};
}
async function objectUrl(key: string) {
  const {env,prefix} = await newsStorageConfig();
  if (!key.startsWith(prefix+'/') || key.includes('..')) throw new StorageUnavailable('Invalid news key');
  return `${env.S3_ENDPOINT!.replace(/\/$/,'')}/${env.S3_BUCKET}/${key}`;
}
export async function signedObject(key: string, init: RequestInit = {}) {
  const {env} = await newsStorageConfig();
  const aws = new AwsClient({accessKeyId:env.S3_ACCESS_KEY_ID!,secretAccessKey:env.S3_SECRET_ACCESS_KEY!,service:'s3',region:env.S3_REGION||'us-east-1',retries:0});
  try {
    return await aws.fetch(await objectUrl(key), {...init, cache:'no-store', signal:AbortSignal.timeout(12000)});
  } catch { throw new StorageUnavailable('News object storage request failed'); }
}
export async function readNewsObject<T>(key: string): Promise<{data:T; etag:string} | null> {
  const r = await signedObject(key);
  if (r.status === 404) return null;
  if (!r.ok) throw new StorageUnavailable(`News read failed: ${r.status}`);
  const etag = r.headers.get('etag');
  if (!etag) throw new StorageUnavailable('News response has no ETag');
  try { return {data:await r.json() as T,etag}; }
  catch { throw new StorageUnavailable('News data is not valid JSON'); }
}
export async function writeNewsObject(key: string, data: unknown, condition: {etag:string} | {create:true}) {
  const body = JSON.stringify(data);
  if (new TextEncoder().encode(body).length > 16*1024*1024) throw new StorageUnavailable('News catalog exceeds 16 MB; archive or migrate before adding more');
  const r = await signedObject(key,{method:'PUT',headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'private, no-store',...('etag' in condition?{'If-Match':condition.etag}:{'If-None-Match':'*'})},body});
  if ([409,412].includes(r.status)) throw new StorageConflict('News was changed by another editor');
  if (!r.ok) throw new StorageUnavailable(`News write failed: ${r.status}`);
}

// Contains no article data. Refuse writes if privacy or concurrency checks fail.
let checked: {until:number; task:Promise<void>} | undefined;
export async function ensurePrivateNewsStorage() {
  if (checked && checked.until > Date.now()) return checked.task;
  const task = (async () => {
    const {env,prefix} = await newsStorageConfig();
    const key = `${prefix}/checks/${crypto.randomUUID()}.json`;
    try {
      await writeNewsObject(key,{probe:1},{create:true});
      for (const url of [`${env.S3_PUBLIC_URL!.replace(/\/$/,'')}/${key}`,await objectUrl(key)]) {
        const r = await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});
        if (![403,404].includes(r.status)) throw new StorageUnavailable('Private news prefix is publicly readable; refusing write');
      }
      const first = await readNewsObject(key);
      if (!first) throw new StorageUnavailable('News probe missing');
      let rejected=false;
      try { await writeNewsObject(key,{probe:2},{create:true}); } catch(e) { if(e instanceof StorageConflict) rejected=true; else throw e; }
      if (!rejected) throw new StorageUnavailable('Storage does not enforce conditional create');
      await writeNewsObject(key,{probe:2},{etag:first.etag});
      rejected=false;
      try { await writeNewsObject(key,{probe:3},{etag:first.etag}); } catch(e) { if(e instanceof StorageConflict) rejected=true; else throw e; }
      if (!rejected) throw new StorageUnavailable('Storage does not enforce conditional update');
    } finally {
      await signedObject(key,{method:'DELETE'}).catch(() => undefined);
    }
  })();
  checked={until:Date.now()+300000,task};
  try { await task; } catch(error) { checked=undefined; throw error; }
}
