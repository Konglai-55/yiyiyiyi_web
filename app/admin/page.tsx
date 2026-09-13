import type { Metadata } from 'next';
import AdminConsole from '@/components/admin-console';
export const metadata:Metadata={title:'网站管理｜壹消',robots:{index:false,follow:false}};
export default function AdminPage(){return <AdminConsole />;}
