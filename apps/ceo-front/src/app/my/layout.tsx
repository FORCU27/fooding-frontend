import { SidebarLayout } from '@/components/Layouts/SidebarLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
