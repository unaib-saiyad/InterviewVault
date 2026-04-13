import { Skeleton } from '@/components/ui/Skeleton';

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-2.5" />
          <Skeleton className="h-9 w-16" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
      </div>
    </div>
  );
}

export function SectionCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="px-6 py-5 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="px-6 py-5">
        <Skeleton className="h-80 w-full rounded" />
      </div>
    </div>
  );
}

export function TaskListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-12 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function InterviewListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-32 mb-1.5" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full flex-shrink-0 ml-3" />
        </div>
      ))}
    </div>
  );
}