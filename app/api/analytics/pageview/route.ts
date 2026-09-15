import { db } from '@/lib/server-env';
import { clientAddress,jsonBody,privateId,rateLimit,response,routeError,sameOrigin,HttpError } from '@/lib/admin-security';
export async function POST(request:Request) {
  try {
    await sameOrigin(request);
    if(request.headers.get('dnt')==='1'||request.headers.get('sec-gpc')==='1')return response({ok:true});
    const data=await jsonBody(request);const path=String(data.path||'');
    if(!/^\/(?:$|contact$|products(?:\/smoke)?$|news(?:\/[a-z0-9-]+)?$|cases\/[a-z0-9-]+$)/.test(path)||path.length>200)throw new HttpError(400,'无效页面');
    if(!/^[a-f0-9-]{36}$/.test(data.session||'')||!/^[a-f0-9-]{36}$/.test(data.id||''))throw new HttpError(400,'无效会话');
    const ua=request.headers.get('user-agent')||'';if(/bot|spider|crawl|headless/i.test(ua))return response({ok:true});
    const address=await clientAddress(request);
    await rateLimit(`view:${await privateId(address==='shared'?data.session:address)}`,120,60);
    const day=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
    let referrer='直接访问';try{const r=new URL(String(data.referrer));referrer=r.origin===new URL(request.url).origin?'站内跳转':r.hostname.slice(0,150);}catch{}
    const database=await db();
    await database.batch([
      database.prepare('INSERT OR IGNORE INTO page_views (id,day,path,visitor,device,referrer,created) VALUES (?,?,?,?,?,?,?)').bind(data.id,day,path,await privateId(data.session),/mobile|android|iphone|ipad/i.test(ua)?'移动端':'桌面端',referrer,Math.floor(Date.now()/1000)),
      database.prepare('DELETE FROM page_views WHERE day<?').bind(new Date(Date.now()-90*86400000).toISOString().slice(0,10)),
      database.prepare('DELETE FROM rate_limits WHERE expires<?').bind(Math.floor(Date.now()/1000)-86400),
    ]);
    return response({ok:true});
  }catch(error){return routeError(error);}
}
