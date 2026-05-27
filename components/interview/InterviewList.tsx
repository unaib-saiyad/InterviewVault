'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InterviewListSkeleton } from '../dashboard/skeletons';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';

type Company = {
  _id: string;
  name: string;
  logo?: string;
};
type Role = {
  _id: string;
  title: string;
};
type Source = {
  _id: string;
  name: string;
};

type Interview = {
  _id: string;
  company: Company;
  role: Role;
  source: Source;
  status: "applied" | "shortlisted" | "interview_scheduled" | "rejected" | "selected" | "offer_received";
  dateOfApplication?: Date | null;

};

const statusConfig = {
  selected: { label: 'Selected', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  applied: { label: 'Applied', className: 'bg-amber-100 text-amber-700' },
  shortlisted: { label: 'Shortlisted', className: 'bg-blue-100 text-blue-700' },
  interview_scheduled: { label: 'Interview Scheduled', className: 'bg-purple-100 text-purple-700' },
  offer_received: { label: 'Offer Received', className: 'bg-green-100 text-green-700' },
};

export function InterviewList() {
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchInterviews = async () => {
      debugger;
      setLoading(true);
      try {
        const response = await api.get('/interviews');
        setInterviews(response.data.data);
        console.log('Fetched interviews:', response.data.data);
      } catch (error) {
        const apiError = error as ApiError;
        console.error('Failed to fetch interviews:', apiError.message);
        alert('Failed to load interviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();

  }, []);

  const handleClick = (id: string) => {
    router.push(`/interviews/${id}`);
  };

  if (loading) {
    return <InterviewListSkeleton />;
  }
  return (
    <div className='space-y-3'>
      {interviews.map((interview) => (
        <div key={interview._id} onClick={() => handleClick(interview._id)} className="cursor-pointer flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-xs transition-all duration-200 hover:bg-gray-50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="font-semibold text-gray-900 truncate">{interview.company.name}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1.5 truncate">{interview.role.title}</p>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{interview.source.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{interview.dateOfApplication ? new Date(interview.dateOfApplication).toLocaleDateString() : 'N/A'}</span>
            </div>
            </div>
          </div>
          <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200', statusConfig[interview.status].className)}>
            {statusConfig[interview.status].label}
          </span>
        </div>
      ))}
    </div>
  );
}