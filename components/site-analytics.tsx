'use client';
import { useEffect } from 'react';
export default function SiteAnalytics(){
  useEffect(()=>{
    if(location.pathname.startsWith('/admin')||navigator.doNotTrack==='1'||(navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl)return;
    let session:string;
    try{session=sessionStorage.getItem('yixiao-session')||crypto.randomUUID();sessionStorage.setItem('yixiao-session',session);}catch{return;}
    const controller=new AbortController();
    const timer=setTimeout(()=>{void fetch('/api/analytics/pageview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),session,path:location.pathname,referrer:document.referrer}),signal:controller.signal}).catch(()=>{});},250);
    return ()=>{clearTimeout(timer);controller.abort();};
  },[]);return null;
}
