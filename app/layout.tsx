import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "壹消智慧消防｜城市基层智慧消防运营服务商",
  description: "壹壹壹壹（北京）安全技术有限公司，面向政府与基层治理部门提供智慧消防平台、智能感知设备及专业代运维服务。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
