import type { Metadata } from 'next';
import ContactPage from '@/components/contact-page';

export const metadata: Metadata = {
  title: '联系我们｜壹壹壹壹（北京）安全技术有限公司',
  description: '联系熊贵齐，4006-222-119。沟通智慧消防设备选型、平台接入、项目建设与代运维服务。',
  alternates: { canonical: '/contact' },
  openGraph: { title: '联系我们｜壹壹壹壹（北京）安全技术有限公司', description: '沟通智慧消防设备选型、平台接入、项目建设与代运维服务。', url: '/contact', type: 'website' },
};

export default ContactPage;
