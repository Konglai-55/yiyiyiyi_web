'use client';
/* oxlint-disable next/no-img-element, next/no-html-link-for-pages -- local assets and full-page route navigation */
import { useState } from 'react';
import { AlarmSmoke, ArrowUpRight, Copy, Database, Home, Newspaper, PhoneCall, Wrench, Building2 } from 'lucide-react';
import CorporateMotion from './corporate-motion';
import './corporate-home.css';
import './contact-page.css';

const enquiries = [
  { title: '设备选型与采购', icon: AlarmSmoke, text: '智能烟感及配套感知设备选型、点位规划、联网安装与使用交接。', prepare: '场所用途、面积或房间数、预计采购数量、现场通信条件。', href: '/products/smoke', link: '了解 AI 烟感' },
  { title: '平台接入与项目建设', icon: Database, text: '新建项目统一监测、存量设备接入、区域分级管理与多角色协同。', prepare: '项目城市、建筑与点位范围、已有设备品牌型号、现有平台情况。', href: '/products', link: '查看产品体系' },
  { title: '消防系统代运维', icon: Wrench, text: '平台值守、告警核实与通知、设备巡检维修，以及运行记录与报告。', prepare: '设备规模、当前故障或管理难点、现有人员分工、期望服务范围。', href: '/#business', link: '查看服务能力' },
];

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyPhone() {
    try { await navigator.clipboard.writeText('17600000015'); setCopyStatus('号码已复制'); }
    catch { setCopyStatus('请长按或选中号码复制：17600000015'); }
  }
  return <div className="corporate contact-page" id="top">
    <CorporateMotion />
    <header className="c-header">
      <a className="c-brand" href="/" aria-label="返回首页"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" /><span><b>壹壹壹壹</b><small>（北京）安全技术有限公司</small></span></a>
      <nav aria-label="主导航"><a href="/">首页</a><a href="/products">产品展示</a><a href="/products/smoke">AI 大数据烟感</a><a href="/#projects">项目案例</a><a href="/news">新闻资讯</a></nav>
      <a className="c-header-contact" href="/contact" aria-current="page">联系我们 <ArrowUpRight size={17} /></a>
    </header>
    <nav className="c-mobile-dock" aria-label="手机快捷导航">
      <a href="/"><Home /><span>首页</span></a><a href="/products"><Database /><span>产品</span></a><a href="/products/smoke"><AlarmSmoke /><span>AI烟感</span></a><a href="/#projects"><Building2 /><span>案例</span></a><a href="/news"><Newspaper /><span>资讯</span></a><a href="/contact" aria-current="page"><PhoneCall /><span>联系</span></a>
    </nav>
    <main>
      <section className="contact-intro">
        <div className="c-shell contact-intro-grid">
          <div className="contact-heading"><p className="contact-eyebrow">壹壹壹壹（北京）安全技术有限公司</p><h1>联系我们</h1><p>从一个烟感点位，到街道、园区与校园的统一管理。与我们沟通现场需求，确定适合项目的设备、平台与运维方案。</p><div className="contact-topics"><span>设备采购</span><span>平台建设</span><span>代运维服务</span></div></div>
          <div className="contact-direct"><div className="contact-direct-top"><p className="contact-eyebrow">项目咨询邮箱</p><span className="contact-status-dot">在线接收</span></div><a className="contact-email-primary" href="mailto:yixiaopingtai@126.com">yixiaopingtai@126.com</a><p className="contact-lead">发送项目需求、现场资料或合作计划，我们会根据场景给出设备、平台与运维建议。</p><div className="contact-person"><span>联系人　熊贵齐</span><span>电话　<a href="tel:17600000015">176 0000 0015</a></span></div><div className="contact-actions"><a href="mailto:yixiaopingtai@126.com">发送邮件 <ArrowUpRight size={19} /></a><a href="tel:17600000015"><PhoneCall size={19} />拨打电话</a><button type="button" onClick={copyPhone}><Copy size={18} />复制电话</button></div><p className="contact-copy-status" role="status" aria-live="polite">{copyStatus || '工作日通常会在 1 个工作日内回复。'}</p><p className="contact-safety">如遇火情，请及时拨打 119。</p></div>
        </div>
      </section>
      <section className="contact-enquiries"><div className="c-shell">
        <div className="contact-section-heading"><h2>咨询内容</h2><p>提前整理以下信息，便于更快明确选型、实施范围与报价。不确定的部分也可以在沟通中一起梳理。</p></div>
        <div className="contact-enquiry-list">{enquiries.map(({ title, icon: Icon, text, prepare, href, link }) => <article key={title}><div className="contact-enquiry-title"><Icon aria-hidden="true" /><h3>{title}</h3></div><div><p>{text}</p><h4>建议准备</h4><p>{prepare}</p></div><a href={href}>{link}<ArrowUpRight size={18} /></a></article>)}</div>
      </div></section>
      <section className="contact-process"><div className="c-shell"><div className="contact-section-heading"><h2>项目沟通流程</h2><p>设备型号、平台功能、交付节点及运维责任逐项确认，服务范围以双方约定为准。</p></div><ol>{[['需求沟通','了解场所、管理范围和使用目标。'],['现场与接入评估','根据项目需要核查点位、通信和设备兼容情况。'],['方案与报价','明确设备、安装、平台及运维服务费用。'],['交付与服务确认','约定实施安排、验收内容和后续服务职责。']].map(([title,text],i)=><li key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
      <div className="c-footer-city" aria-hidden="true"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/d942268682076ef7/assets/footer-city-skyline-v2.png" alt="" loading="lazy" /></div>
    </main>
    <footer className="c-footer"><div className="c-shell contact-footer"><div><h2>壹壹壹壹</h2><p>（北京）安全技术有限公司</p></div><nav aria-label="页脚导航"><a href="/">首页</a><a href="/products">产品展示</a><a href="/products/smoke">AI 大数据烟感</a><a href="/#projects">项目案例</a></nav><div className="contact-footer-contact"><a href="tel:17600000015">项目咨询：176 0000 0015</a><a href="mailto:yixiaopingtai@126.com">邮箱：yixiaopingtai@126.com</a></div></div><div className="c-shell c-copyright"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><a href="#top">回到顶部 <ArrowUpRight /></a></div></footer>
  </div>;
}
