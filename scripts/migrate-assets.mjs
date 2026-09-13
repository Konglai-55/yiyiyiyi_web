// Upload only the website's public image library. Never upload source materials or secrets.
import { AwsClient } from 'aws4fetch';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, '');
if (!base || !process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY) throw new Error('Missing S3 environment');
const aws = new AwsClient({ accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, region: process.env.S3_REGION || 'us-east-1', service: 's3', retries: 2 });
const types = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.gif':'image/gif', '.ico':'image/x-icon' };
const manifest = {};
async function walk(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    const type = types[path.extname(file).toLowerCase()];
    if (!type) continue;
    const bytes = await readFile(file);
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0,16);
    const relative = path.relative(path.join(root,'public'),file).replaceAll('\\','/');
    const key = `website/${hash}/${relative}`;
    const url = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`;
    const response = await aws.fetch(url, {method:'PUT',headers:{'Content-Type':type,'Cache-Control':'public, max-age=31536000, immutable'},body:bytes});
    if (!response.ok) throw new Error(`Upload failed: ${relative} HTTP ${response.status}`);
    const publicUrl = `${base}/${key}`;
    const check = await fetch(publicUrl, {signal:AbortSignal.timeout(20000)});
    if (!check.ok) throw new Error(`Public read failed: ${relative} HTTP ${check.status}; enable public read for website/* only`);
    const received = new Uint8Array(await check.arrayBuffer());
    if (createHash('sha256').update(received).digest('hex').slice(0,16) !== hash) throw new Error(`Checksum mismatch: ${relative}`);
    manifest[`/${relative}`] = publicUrl;
    console.log(`Verified ${relative}`);
  }
}
await walk(path.join(root,'public'));
await writeFile(path.join(root,'lib/asset-manifest.json'), JSON.stringify(manifest,null,2)+'\n');
// Bulk mechanical replacement is deliberately performed only after ALL public URLs pass verification.
async function replace(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const file = path.join(dir,entry.name);
    if(entry.isDirectory()) { await replace(file); continue; }
    if(!/\.(tsx?|css)$/.test(file)) continue;
    let source = await readFile(file,'utf8');
    const before = source;
    for(const [local,remote] of Object.entries(manifest)) source = source.split(local).join(remote);
    if(source !== before) await writeFile(file,source);
  }
}
for(const dir of ['app','components','lib']) await replace(path.join(root,dir));
console.log(`Migrated ${Object.keys(manifest).length} images; local originals retained.`);
