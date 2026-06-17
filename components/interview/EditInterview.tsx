'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Briefcase } from 'lucide-react';
import { ExperienceLevel, InterviewStatus, InterviewDetails, OverallRating, InterviewData } from '@/types/interviewTypes';
import CompanySelector from '../interview/CompanySelector';
import RoleSelector from '../interview/RoleSelector';
import SourceSelector from '../interview/SourceSelector';
import { useToast } from '@/lib/useToast';
import { updateInterviewAPI } from '@/lib/interviewApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type EditInterviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  interview: InterviewDetails;
};



export function EditInterviewModal({ isOpen, onClose, interview }: EditInterviewModalProps) {
  const { showSuccess, showError, showWarning } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (updatedData: InterviewData) => updateInterviewAPI(interview._id, updatedData),
    onSuccess: (updatedInterview) => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      queryClient.invalidateQueries({ queryKey: ['interviewRound', updatedInterview._id] });
      showSuccess('Interview updated', 'Interview updated successfully!');
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred while updating the interview.';
      showError('Failed to update interview', errorMessage);
    }
  });


  const [formData, setFormData] = useState<InterviewData>({
    _id: interview._id,
    company: interview.company ? { type: 'existing', _id: interview.company._id, name: interview.company.name } : null,
    role: interview.role ? { type: 'existing', _id: interview.role._id, title: interview.role.title, slug: interview.role.slug } : null,
    experienceLevel: interview.experienceLevel as ExperienceLevel,
    status: interview.status as InterviewStatus,
    overallFeedback: interview.overallFeedback,
    overallRating: interview.overallRating as OverallRating,
    source: interview.source ? { type: 'existing', _id: interview.source._id, name: interview.source.name } : null,
    dateOfApplication: interview.dateOfApplication? new Date(interview.dateOfApplication) : null,
  });

  useEffect(() => {
    setFormData({
    _id: interview._id,
    company: interview.company ? { type: 'existing', _id: interview.company._id, name: interview.company.name } : null,
    role: interview.role ? { type: 'existing', _id: interview.role._id, title: interview.role.title, slug: interview.role.slug } : null,
    experienceLevel: interview.experienceLevel as ExperienceLevel,
    status: interview.status as InterviewStatus,
    overallFeedback: interview.overallFeedback,
    overallRating: interview.overallRating as OverallRating,
    source: interview.source ? { type: 'existing', _id: interview.source._id, name: interview.source.name } : null,
    dateOfApplication: interview.dateOfApplication? new Date(interview.dateOfApplication) : null,
  });
  }, [interview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.company || !formData.role || !formData.source) {
      showWarning('Validation error', 'Company, Role, and Source are required fields.');
      return;
    }
    updateMutation.mutate(formData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            style={{ "marginBlockEnd": "0px" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full rounded-2xl bg-white p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Interview</h2>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-2'>

                  <div>
                    <CompanySelector
                      value={formData.company}
                      onChange={(company) => setFormData({ ...formData, company })}
                    />
                  </div>

                  <div>
                    <RoleSelector
                      value={formData.role}
                      onChange={(role) => setFormData({ ...formData, role })}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experienceLevel"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Experience Level
                    </label>

                    <select
                      id="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          experienceLevel: e.target.value as ExperienceLevel,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value={ExperienceLevel.Internship}>
                        Internship
                      </option>

                      <option value={ExperienceLevel.Fresher}>
                        Fresher
                      </option>

                      <option value={ExperienceLevel.Junior}>
                        Junior
                      </option>

                      <option value={ExperienceLevel.Mid}>
                        Mid Level
                      </option>

                      <option value={ExperienceLevel.Senior}>
                        Senior
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>

                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as InterviewStatus,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value={InterviewStatus.Applied}>
                        Applied
                      </option>
                      <option value={InterviewStatus.Shortlisted}>
                        Shortlisted
                      </option>
                      <option value={InterviewStatus.InterviewScheduled}>
                        Interview Scheduled
                      </option>
                      <option value={InterviewStatus.Rejected}>
                        Rejected
                      </option>
                      <option value={InterviewStatus.Selected}>
                        Selected
                      </option>
                      <option value={InterviewStatus.OfferReceived}>
                        Offer Received
                      </option>

                    </select>
                  </div>

                  <div>
                    <label htmlFor="overallFeedback" className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Feedback
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="overallFeedback"
                        name='overallFeedback'
                        value={formData.overallFeedback}
                        onChange={(e) => setFormData({ ...formData, overallFeedback: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors duration-200"
                        placeholder="e.g., Great communication, but technical round was tough"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="overallRating" className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating (0-10)
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="overallRating"
                        name='overallRating'
                        min={0}
                        max={10}
                        value={formData.overallRating}
                        onChange={(e) => {
                          let rating = parseInt(e.target.value);
                          if (isNaN(rating)) rating = 0;
                          else if (rating < 0) rating = 0;
                          else if (rating > 10) rating = 10;
                          setFormData({ ...formData, overallRating: rating as OverallRating });
                        }}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors duration-200"
                        placeholder="e.g., 7"
                      />
                    </div>
                  </div>

                  <div>
                    <SourceSelector
                      value={formData.source}
                      onChange={(source) => setFormData({ ...formData, source })}
                    />
                  </div>
                  <div>
                    <label htmlFor="dateOfApplication" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Application
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        id="dateOfApplication"
                        name='dateOfApplication'
                        value={formData.dateOfApplication ? formData.dateOfApplication.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, dateOfApplication: e.target.value ? new Date(e.target.value) : null })}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Update Interview
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}