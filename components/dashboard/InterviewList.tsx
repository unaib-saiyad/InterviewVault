import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type Interview = {
  id: string;
  company: string;
  role: string;
  date: string;
  status: 'selected' | 'rejected' | 'pending';
};

type InterviewListProps = {
  interviews: Interview[];
  className?: string;
};

const statusConfig = {
  selected: { label: 'Selected', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
};

export function InterviewList({ interviews, className }: InterviewListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {interviews.map((interview) => (
        <div key={interview.id} className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-xs transition-all duration-200 hover:bg-gray-50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="font-semibold text-gray-900 truncate">{interview.company}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1.5 truncate">{interview.role}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{interview.date}</span>
            </div>
          </div>
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200',
            statusConfig[interview.status].className
          )}>
            {statusConfig[interview.status].label}
          </span>
        </div>
      ))}
    </div>
  );
}