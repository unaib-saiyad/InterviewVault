import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
};

export function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-gray-300 hover:-translate-y-1',
      className
    )}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
        </div>
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-brand-600 transition-all duration-200 hover:bg-brand-50 hover:scale-105">
          {icon}
        </div>
      </div>
    </div>
  );
}