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
      'rounded-lg border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 ease-out hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5',
      className
    )}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-200">
          {icon}
        </div>
      </div>
    </div>
  );
}