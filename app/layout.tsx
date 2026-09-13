import type { Metadata } from "next";
import "./globals.css";
import SiteAnalytics from '@/components/site-analytics';
import assetManifest from '@/lib/asset-manifest.json';

export const metadata: Metadata = {
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}<SiteAnalytics /></body></html>;
}
