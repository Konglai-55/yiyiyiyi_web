import type { Metadata } from "next";
import "./globals.css";
import SiteAnalytics from '@/components/site-analytics';
import assetManifest from '@/lib/asset-manifest.json';

const siteUrl = 'https://yiyiyiyi.xn--fiqs8s';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // 使用品牌标识作为浏览器标签页图标（favicon），避免显示通用默认图标。
  icons: {
    icon: [
      {
        url: assetManifest['/assets/brand-mark.jpg'],
        type: "image/jpeg",
      },
    ],
    shortcut: assetManifest['/assets/brand-mark.jpg'],
  },
  title: "壹消智慧消防｜城市基层智慧消防运营服务商",
  description: "壹壹壹壹（北京）安全技术有限公司，面向政府与基层治理部门提供智慧消防平台、智能感知设备及专业代运维服务。",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', url: siteUrl, siteName: '壹消智慧消防', locale: 'zh_CN',
    title: '壹消智慧消防｜城市基层智慧消防运营服务商',
    description: '面向街道、社区、园区与校园的智慧消防平台、感知设备和代运维服务。',
    images: [{url: '/assets/smart-city-hero-desktop-refined.webp', width: 1920, height: 1080, alt: '壹消智慧消防城市安全平台'}],
  },
  twitter: { card: 'summary_large_image', title: '壹消智慧消防｜城市基层智慧消防运营服务商', description: '智慧消防平台、智能感知设备与专业代运维服务。', images: ['/assets/smart-city-hero-desktop-refined.webp'] },
};

const organization = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': `${siteUrl}/#organization`,
  name: '壹壹壹壹（北京）安全技术有限公司', alternateName: '壹消智慧消防', url: siteUrl,
  logo: `${siteUrl}${assetManifest['/assets/brand-mark.jpg']}`, email: 'yixiaopingtai@126.com', telephone: '+86-176-0000-0015',
  areaServed: ['北京','南京','邯郸'], knowsAbout: ['智慧消防','消防设备运维','智能烟感','城市安全治理'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization).replace(/</g,'\\u003c')}} /><SiteAnalytics /></body></html>;
}
