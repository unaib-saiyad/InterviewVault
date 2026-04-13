import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionCardProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionCard({ title, children, action, className }: SectionCardProps) {
  return (
    <div className={cn('rounded-lg border border-slate-200 bg-white shadow-xs transition-all duration-200 ease-out hover:shadow-md hover:border-slate-300', className)}>
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">{title}</h3>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  );
}
