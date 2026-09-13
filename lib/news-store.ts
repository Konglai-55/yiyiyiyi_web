import { db } from './server-env';
import { newsArticles,newsDate,type NewsArticle } from './news';
import { HttpError } from './admin-security';
export type ManagedArticle=NewsArticle & {cover:string;status:'draft'|'published'|'offline';publishedAt:string;updatedAt:string;version:number};
type Row={slug:string;title:string;category:string;summary:string;sections:string;source:string;cover:string;status:ManagedArticle['status'];published_at:string;updated_at:string;version:number};
const decode=(r:Row):ManagedArticle=>({...r,sections:JSON.parse(r.sections),source:JSON.parse(r.source),publishedAt:r.published_at,updatedAt:r.updated_at});
export async function seedNews() {
  if(await db().prepare("SELECT value FROM settings WHERE key='news_seeded'").first())return;
  const now=new Date().toISOString();
  await db().batch([...newsArticles.map(a=>db().prepare("INSERT OR IGNORE INTO news (slug,title,category,summary,sections,source,cover,status,published_at,updated_at,version) SELECT ?,?,?,?,?,?,'','published',?,?,1 WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key='news_seeded')").bind(a.slug,a.title,a.category,a.summary,JSON.stringify(a.sections),JSON.stringify(a.source),newsDate,now)),db().prepare("INSERT OR IGNORE INTO settings (key,value) VALUES ('news_seeded','1')")]);
}
export async function listNews(all=false) {
  const rows=await db().prepare(`SELECT * FROM news ${all?'':"WHERE status='published' AND published_at <= date('now','+8 hours')"} ORDER BY published_at DESC, updated_at DESC`).all<Row>();
  return rows.results.map(decode);
}
export async function getNews(slug:string) {
  const row=await db().prepare("SELECT * FROM news WHERE slug=? AND status='published' AND published_at <= date('now','+8 hours')").bind(slug).first<Row>();
  return row?decode(row):null;
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
