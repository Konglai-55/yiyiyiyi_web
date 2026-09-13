import { config, db } from './server-env';
const encoder = new TextEncoder();
export class HttpError extends Error { constructor(public status:number,message:string) {super(message);} }
export function response(data:unknown,status=200,extra:Record<string,string>={}) { return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}}); }
export async function digest(text:string) {return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(text))),x=>x.toString(16).padStart(2,'0')).join('');}
export async function privateId(text:string) {
  const secret=config().ADMIN_SESSION_SECRET;
  if(!secret) throw new HttpError(503,'后台尚未配置登录密钥');
  const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(text))),x=>x.toString(16).padStart(2,'0')).join('');
}
export async function limitedBody(request:Request,max=262144) {
  if(Number(request.headers.get('content-length'))>max) throw new HttpError(413,'提交内容过大');
  const reader=request.body?.getReader(); if(!reader) return new Uint8Array();
  const chunks:Uint8Array[]=[]; let size=0;
  while(true) { const {done,value}=await reader.read(); if(done) break; size+=value.length; if(size>max) {await reader.cancel();throw new HttpError(413,'提交内容过大');} chunks.push(value); }
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return bytes;
}
export async function jsonBody(request:Request) {try{return JSON.parse(new TextDecoder().decode(await limitedBody(request)));}catch(e){if(e instanceof HttpError)throw e;throw new HttpError(400,'提交格式不正确');}}
export function sameOrigin(request:Request) {
  if(request.headers.get('origin')!==new URL(request.url).origin) throw new HttpError(403,'请从本站后台操作');
}
export async function rateLimit(key:string,limit:number,seconds:number) {
  const now=Math.floor(Date.now()/1000);
  const result=await db().prepare('INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires <= ? THEN 1 ELSE count+1 END, expires=CASE WHEN expires <= ? THEN excluded.expires ELSE expires END RETURNING count').bind(key,now+seconds,now,now).first<{count:number}>();
  if(!result || result.count>limit) throw new HttpError(429,'操作太频繁，请稍后重试');
}
export function cookieToken(request:Request) {return request.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('yixiao_admin='))?.slice('yixiao_admin='.length) || '';}
export async function requireAdmin(request:Request) {
  const token=cookieToken(request);
  if(!/^[a-f0-9]{64}$/.test(token)) throw new HttpError(401,'请先登录');
  const session=await db().prepare('SELECT expires FROM admin_sessions WHERE token=? AND expires>?').bind(await digest(token),Math.floor(Date.now()/1000)).first();
  if(!session) throw new HttpError(401,'登录已过期，请重新登录');
}
export function sessionCookie(request:Request,token:string,maxAge=28800) {return `yixiao_admin=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${new URL(request.url).protocol==='https:'?'; Secure':''}`;}
export async function verifyPassword(password:string) {
  const setting=await db().prepare('SELECT value FROM settings WHERE key=?').bind('admin_password_hash').first<{value:string}>();
  const encoded=setting?.value || config().ADMIN_PASSWORD_HASH;
  if(!encoded) throw new HttpError(503,'后台尚未配置初始密码');
  const [salt,iterations,expected]=encoded.split(':');
  if(!salt || !expected || Number(iterations)!==100000) throw new HttpError(503,'密码配置无效');
  const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encoder.encode(salt),iterations:Number(iterations)},key,256);
  const actual=Array.from(new Uint8Array(bits),x=>x.toString(16).padStart(2,'0')).join('');
  let diff=actual.length ^ expected.length;for(let i=0;i<actual.length;i++)diff|=actual.charCodeAt(i)^expected.charCodeAt(i);return diff===0;
}
export async function routeError(error:unknown) {
  if(error instanceof HttpError)return response({error:error.message},error.status);
  console.error('Admin service error',error instanceof Error?error.message:'unknown');
  return response({error:'服务暂时不可用，请稍后重试。输入内容已保留。'},503);
}
