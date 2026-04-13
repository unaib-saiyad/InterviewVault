'use client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';


export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:gap-8">
            <div className="max-w-2xl">
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-2">Welcome back!</h1>
                <p className="text-base text-slate-600">Here's your current progress on interview preparation.</p>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}