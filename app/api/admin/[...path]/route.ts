import { db } from '@/lib/server-env';
import { clientAddress,cookieToken,digest,HttpError,jsonBody,privateId,rateLimit,requireAdmin,response,routeError,sameOrigin,sessionCookie,verifyPassword } from '@/lib/admin-security';
import { listNews,createNews,updateNews,deleteNews,validateArticle } from '@/lib/news-store';
import { uploadImage } from '@/lib/object-storage';
export const dynamic='force-dynamic';
async function handle(request:Request) {
  try {
    const route=new URL(request.url).pathname.replace(/^\/api\/admin\//,'');
    const method=request.method;
    if(method!=='GET')await sameOrigin(request);
    if(route==='login'&&method==='POST') {
      const ip=await clientAddress(request);
      await rateLimit(`login:${await privateId(ip)}`,5,900);
      const body=await jsonBody(request);
      if(typeof body.password!=='string'||body.password.length>256||!await verifyPassword(body.password))throw new HttpError(401,'密码不正确');
      const token=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');
      const database=await db();
      await database.batch([database.prepare('DELETE FROM admin_sessions WHERE expires<=?').bind(Math.floor(Date.now()/1000)),database.prepare('INSERT INTO admin_sessions (token,expires) VALUES (?,?)').bind(await digest(token),Math.floor(Date.now()/1000)+28800)]);
      return response({ok:true},200,{'Set-Cookie':await sessionCookie(request,token)});
    }
    await requireAdmin(request);
    if(route==='session'&&method==='GET')return response({ok:true});
    if(route==='logout'&&method==='POST') {await (await db()).prepare('DELETE FROM admin_sessions WHERE token=?').bind(await digest(cookieToken(request))).run();return response({ok:true},200,{'Set-Cookie':await sessionCookie(request,'',0)});}
    if(route==='news'&&method==='GET') {return response({articles:await listNews(true)});}
    if(route==='news'&&method==='POST') {
      const a=validateArticle(await jsonBody(request));
      await createNews(a);
      return response({ok:true},201);
    }
    if(route.startsWith('news/')&&['PUT','DELETE'].includes(method)) {
      const slug=route.slice(5);const body=await jsonBody(request);
      if(!Number.isInteger(body.version)||body.version<1)throw new HttpError(400,'请刷新文章后重试');
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw new HttpError(400,'无效文章地址');
      if(method==='DELETE') {await deleteNews(slug,body.version);return response({ok:true});}
      const a=validateArticle(body);if(a.slug!==slug)throw new HttpError(400,'已创建文章的地址不能修改');
      await updateNews(slug,a,body.version);return response({ok:true});
    }
    if(route==='upload'&&method==='POST') {await rateLimit('admin-upload',30,60);return response(await uploadImage(request));}
    if(route==='stats'&&method==='GET') {
      const days=new URL(request.url).searchParams.get('days')==='7'?7:30;
      const since=new Date(Date.now()-(days-1)*86400000).toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
      const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
      const database=await db();
      const results=await database.batch([
        database.prepare('SELECT COUNT(*) AS views,COUNT(DISTINCT visitor) AS sessions,COALESCE(SUM(day=?),0) AS today FROM page_views WHERE day>=?').bind(today,since),
        database.prepare('SELECT day,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY day ORDER BY day').bind(since),
        database.prepare('SELECT path,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY path ORDER BY views DESC LIMIT 15').bind(since),
        database.prepare('SELECT device,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY device ORDER BY views DESC').bind(since),
        database.prepare('SELECT referrer,COUNT(*) AS views FROM page_views WHERE day>=? GROUP BY referrer ORDER BY views DESC LIMIT 8').bind(since),
      ]);
      return response({days,totals:results[0].results[0],daily:results[1].results,pages:results[2].results,devices:results[3].results,referrers:results[4].results,published:{published:(await listNews()).length}});
    }
    throw new HttpError(404,'接口不存在');
  }catch(error){return routeError(error);}
}
export const GET=handle;export const POST=handle;export const PUT=handle;export const DELETE=handle;
