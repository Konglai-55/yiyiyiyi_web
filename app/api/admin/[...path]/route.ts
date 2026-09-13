import { db } from '@/lib/server-env';
import { cookieToken,digest,HttpError,jsonBody,privateId,rateLimit,requireAdmin,response,routeError,sameOrigin,sessionCookie,verifyPassword } from '@/lib/admin-security';
import { listNews,seedNews,validateArticle } from '@/lib/news-store';
import { uploadImage } from '@/lib/object-storage';
export const dynamic='force-dynamic';
async function handle(request:Request) {
  try {
    const route=new URL(request.url).pathname.replace(/^\/api\/admin\//,'');
    const method=request.method;
    if(method!=='GET')sameOrigin(request);
    if(route==='login'&&method==='POST') {
      const ip=request.headers.get('cf-connecting-ip')||'local';
      await rateLimit(`login:${await privateId(ip)}`,5,900);
      const body=await jsonBody(request);
      if(typeof body.password!=='string'||body.password.length>256||!await verifyPassword(body.password))throw new HttpError(401,'密码不正确');
      const token=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
      await db().batch([db().prepare('DELETE FROM admin_sessions WHERE expires<=?').bind(Math.floor(Date.now()/1000)),db().prepare('INSERT INTO admin_sessions (token,expires) VALUES (?,?)').bind(await digest(token),Math.floor(Date.now()/1000)+28800)]);
      return response({ok:true},200,{'Set-Cookie':sessionCookie(request,token)});
    }
    await requireAdmin(request);
    if(route==='session'&&method==='GET')return response({ok:true});
    if(route==='logout'&&method==='POST') {await db().prepare('DELETE FROM admin_sessions WHERE token=?').bind(await digest(cookieToken(request))).run();return response({ok:true},200,{'Set-Cookie':sessionCookie(request,'',0)});}
    if(route==='news'&&method==='GET') {await seedNews();return response({articles:await listNews(true)});}
    if(route==='news'&&method==='POST') {
      const a=validateArticle(await jsonBody(request));
      const saved=await db().prepare('INSERT OR IGNORE INTO news (slug,title,category,summary,sections,source,cover,status,published_at,updated_at,version) VALUES (?,?,?,?,?,?,?,?,?,?,1)').bind(a.slug,a.title,a.category,a.summary,JSON.stringify(a.sections),JSON.stringify(a.source),a.cover,a.status,a.publishedAt,new Date().toISOString()).run();
      if(!saved.meta.changes)throw new HttpError(409,'文章地址已存在，请换一个地址');
      return response({ok:true},201);
    }
    if(route.startsWith('news/')&&['PUT','DELETE'].includes(method)) {
      const slug=route.slice(5);const body=await jsonBody(request);
      if(!Number.isInteger(body.version)||body.version<1)throw new HttpError(400,'请刷新文章后重试');
      if(method==='DELETE') {const r=await db().prepare('DELETE FROM news WHERE slug=? AND version=?').bind(slug,body.version).run();if(!r.meta.changes)throw new HttpError(409,'文章已被更改或删除，请刷新列表');return response({ok:true});}
      const a=validateArticle(body);if(a.slug!==slug)throw new HttpError(400,'已创建文章的地址不能修改');
      const saved=await db().prepare('UPDATE news SET title=?,category=?,summary=?,sections=?,source=?,cover=?,status=?,published_at=?,updated_at=?,version=version+1 WHERE slug=? AND version=?').bind(a.title,a.category,a.summary,JSON.stringify(a.sections),JSON.stringify(a.source),a.cover,a.status,a.publishedAt,new Date().toISOString(),slug,body.version).run();
      if(!saved.meta.changes)throw new HttpError(409,'其他窗口已修改这篇文章，请刷新后编辑');return response({ok:true});
    }
    if(route==='upload'&&method==='POST') {await rateLimit('admin-upload',30,60);return response(await uploadImage(request));}
    if(route==='stats'&&method==='GET') {
      const days=new URL(request.url).searchParams.get('days')==='7'?7:30;
      const since=new Date(Date.now()-(days-1)*86400000).toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
      const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
      const results=await db().batch([
        db().prepare('SELECT COUNT(*) AS views,COUNT(DISTINCT visitor) AS sessions,COALESCE(SUM(day=?),0) AS today FROM page_views WHERE day>=?').bind(today,since),
        db().prepare('SELECT day,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY day ORDER BY day').bind(since),
        db().prepare('SELECT path,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY path ORDER BY views DESC LIMIT 15').bind(since),
        db().prepare('SELECT device,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY device ORDER BY views DESC').bind(since),
        db().prepare('SELECT referrer,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY referrer ORDER BY views DESC LIMIT 8').bind(since),
        db().prepare("SELECT COUNT(*) AS published FROM news WHERE status='published' AND published_at<=?").bind(today),
      ]);
      return response({days,totals:results[0].results[0],daily:results[1].results,pages:results[2].results,devices:results[3].results,referrers:results[4].results,published:results[5].results[0]});
    }
    throw new HttpError(404,'接口不存在');
  }catch(error){return routeError(error);}
}
export const GET=handle;export const POST=handle;export const PUT=handle;export const DELETE=handle;
