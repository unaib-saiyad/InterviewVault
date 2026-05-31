'use client';

import { cn } from '@/lib/utils';

const statusConfig: Record<string, { label: string; className: string }> = {
  selected: { label: 'Selected', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  rejected: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200' },
  applied: { label: 'Applied', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  shortlisted: { label: 'Shortlisted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  interview_scheduled: { label: 'Scheduled', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  offer_received: { label: 'Offer Received', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

type StatusBadgeProps = {
  status: string;
  size?: 'sm' | 'md';
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-50 text-gray-700 border-gray-200' };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border font-medium capitalize transition-all duration-200',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        config.className
      )}
    >
      <span className={cn('rounded-full', size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2', 'bg-current')} />
      {config.label}
    </span>
  );
}

const roundResultConfig: Record<string, { label: string; className: string }> = {
  cleared: { label: 'Cleared', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  failed: { label: 'Failed', className: 'bg-red-50 text-red-700 border-red-200' },
  pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  partial: { label: 'Partial', className: 'bg-orange-50 text-orange-700 border-orange-200' },
};

export function RoundResultBadge({ result }: { result: string }) {
  const config = roundResultConfig[result] || { label: result, className: 'bg-gray-50 text-gray-700 border-gray-200' };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize transition-all duration-200',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}