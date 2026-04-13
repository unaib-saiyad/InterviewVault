import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ChartCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <div className={cn('min-h-0 rounded-lg border border-slate-200 bg-white shadow-xs transition-all duration-200 ease-out hover:shadow-md hover:border-slate-300', className)}>
      <div className="px-6 py-5 border-b border-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">{title}</h3>
      </div>
      <div className="px-6 py-5">
        <div className="h-80 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
