import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function DashboardPageLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DashboardLayout title="Dashboard">
      {children}
    </DashboardLayout>
  );
}