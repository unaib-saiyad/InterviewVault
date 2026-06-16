'use client';

import { ArrowLeft, Building2, Calendar, Edit3, Globe, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import { DifficultyBadge } from './DifficultyBadge';
import type { InterviewDetails } from '@/types/interviewTypes';
import { useToast } from '@/lib/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInterview } from '@/lib/interviewApi';
type InterviewHeaderProps = {
  interview: InterviewDetails;
  handleEdit: () => void;
};

export function InterviewHeader({ interview, handleEdit }: InterviewHeaderProps) {
  const { showError, showSuccess } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteInterview(interview._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      showSuccess("Interview deleted successfully", 'Interview deleted successfully.');
      router.push('/interviews');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred while deleting the interview.';
      showError("Failed to delete interview" ,errorMessage);
    }
  });

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      deleteMutation.mutate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/40 via-white to-transparent pointer-events-none" />

      <div className="relative px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        {/* Back button */}
        <Link
          href="/interviews"
          className="group mb-4 sm:mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Interviews
        </Link>

        {/* Main header content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left side - Company and Role info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              {/* Company avatar */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.3)' }}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    {interview.company.name}
                  </h1>
                  <span className="hidden sm:inline text-gray-300">/</span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 truncate w-full sm:w-auto">
                    {interview.role?.title || 'Unknown Role'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <StatusBadge status={interview.status} size="md" />
                  <DifficultyBadge difficulty={interview.experienceLevel.toLowerCase()} size="sm" />
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-gray-400" />
                <span>{interview.source?.name || 'Unknown Source'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{new Date(interview.dateOfApplication).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Right side - Rating and Actions */}
          <div className="flex flex-col items-start lg:items-end gap-4 lg:gap-3 shrink-0">
            {/* Overall Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col items-center lg:items-end"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">Rating</span>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-3.5 w-3.5 transition-colors duration-150',
                        star <= interview.overallRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      )}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900 ml-1">{interview.overallRating}/10</span>
              </div>
            </motion.div>
            <div className='flex gap-2'>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px -2px rgba(59, 130, 246, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-xs hover:border-brand-200 hover:text-brand-600 hover:shadow-sm transition-all duration-200"
                onClick={handleEdit}
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px -2px rgba(59, 130, 246, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-xs hover:border-red-200 hover:text-red-600 hover:shadow-sm transition-all duration-200"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}