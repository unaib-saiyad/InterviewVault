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
    <div className={cn('rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-gray-300', className)}>
      <div className="px-6 py-5 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">{title}</h3>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="px-6 py-6">
        {children}
      </div>
    </div>
  );
}
