/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
import type { ReactNode } from 'react';
import { AlarmSmoke, ArrowUpRight, Building2, Database, Home, Newspaper, PhoneCall } from 'lucide-react';
import CorporateMotion from './corporate-motion';
import './corporate-home.css';
import './news-page.css';

export default function NewsShell({ children, section = 'news' }: { children: ReactNode; section?: 'news' | 'cases' }) {
  return <div className={`corporate news-page ${section === 'cases' ? 'case-page' : ''}`} id="top">
    <CorporateMotion />
    <header className="c-header">
      <a className="c-brand" href="/" aria-label="返回首页"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" /><span><b>壹壹壹壹</b><small>（北京）安全技术有限公司</small></span></a>
      <nav aria-label="主导航"><a href="/">首页</a><a href="/products">产品展示</a><a href="/products/smoke">AI 大数据烟感</a><a href="/#projects" aria-current={section === 'cases' ? 'page' : undefined}>项目案例</a><a href="/news" aria-current={section === 'news' ? 'page' : undefined}>新闻资讯</a></nav>
      <a className="c-header-contact" href="/contact">联系我们 <ArrowUpRight size={17} /></a>
    </header>
    <nav className="c-mobile-dock" aria-label="手机快捷导航"><a href="/"><Home /><span>首页</span></a><a href="/products"><Database /><span>产品</span></a><a href="/products/smoke"><AlarmSmoke /><span>AI烟感</span></a><a href="/#projects" aria-current={section === 'cases' ? 'page' : undefined}><Building2 /><span>案例</span></a><a href="/news" aria-current={section === 'news' ? 'page' : undefined}><Newspaper /><span>资讯</span></a><a href="/contact"><PhoneCall /><span>联系</span></a></nav>
    <main>{children}<div className="c-footer-city" aria-hidden="true"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/d942268682076ef7/assets/footer-city-skyline-v2.png" alt="" loading="lazy" /></div></main>
    <footer className="c-footer"><div className="c-shell news-footer"><div><h2>壹壹壹壹</h2><p>（北京）安全技术有限公司</p></div><nav aria-label="页脚导航"><a href="/products">产品展示</a><a href="/products/smoke">AI 大数据烟感</a><a href="/news">新闻资讯</a><a href="/contact">联系我们</a></nav><a href="tel:4006222119">项目咨询：4006-222-119</a></div><div className="c-shell c-copyright"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><a href="#top">回到顶部 <ArrowUpRight /></a></div></footer>
  </div>;
}
