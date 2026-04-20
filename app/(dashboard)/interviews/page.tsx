import { Plus } from 'lucide-react';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { InterviewListSkeleton } from '@/components/dashboard/skeletons';
import { InterviewList } from '@/components/dashboard/InterviewList';


const mockInterviews = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    date: 'Mar 10, 2024',
    status: 'selected' as const,
  },
  {
    id: '2',
    company: 'Meta',
    role: 'Full Stack Developer',
    date: 'Feb 28, 2024',
    status: 'pending' as const,
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Software Engineer',
    date: 'Feb 15, 2024',
    status: 'rejected' as const,
  },
  {
    id: '4',
    company: 'Netflix',
    role: 'Senior Software Engineer',
    date: 'Jan 30, 2024',
    status: 'selected' as const,
  },
  {
    id: '5',
    company: 'Microsoft',
    role: 'Principal Engineer',
    date: 'Jan 15, 2024',
    status: 'pending' as const,
  },
];

export default function Interviews() {
    const loading = false;
  return (
        <div className="space-y-8">
        {/* Header with action */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Interview History</h2>
            <p className="mt-1 text-sm text-slate-600">
              Track your interview progress and outcomes
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700">
            <Plus className="h-4 w-4" />
            Add Interview
          </button>
        </div>

        {/* Interview List */}
        <SectionCard title="All Interviews">
          {loading ? (
            <InterviewListSkeleton />
          ) : (
            <InterviewList interviews={mockInterviews} />
          )}
        </SectionCard>
      </div>
  )
}
