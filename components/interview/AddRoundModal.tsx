'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw } from 'lucide-react';

type AddRoundModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roundNumber: number;
  onSubmit: (data: RoundFormData) => void;
};

export type RoundFormData = {
  roundNumber: number;
  roundType: string;
  interviewDate: string;
  durationInMinutes: number;
  difficulty: string;
  interviewerName: string;
  feedback: string;
  result: string;
};

const roundTypes = [
  { value: 'telephonic', label: 'Telephonic' },
  { value: 'online_assessment', label: 'Online Assessment' },
  { value: 'technical', label: 'Technical' },
  { value: 'machine_coding', label: 'Machine Coding' },
  { value: 'system_design', label: 'System Design' },
  { value: 'hr', label: 'HR' },
  { value: 'managerial', label: 'Managerial' },
  { value: 'ceo', label: 'CEO Round' },
  { value: 'other', label: 'Other' },
];

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const getInitialFormData = (roundNumber: number): RoundFormData => ({
  roundNumber,
  roundType: 'technical',
  interviewDate: new Date().toISOString().split('T')[0],
  durationInMinutes: 60,
  difficulty: 'medium',
  interviewerName: '',
  feedback: '',
  result: 'pending',
});

export function AddRoundModal({ isOpen, onClose, onSubmit, roundNumber }: AddRoundModalProps) {
  const [formData, setFormData] = useState<RoundFormData>(getInitialFormData(roundNumber));

  const handleChange = (field: keyof RoundFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.interviewerName.trim()) return;
    onSubmit(formData);
    setFormData({
      roundNumber: roundNumber,
      roundType: 'technical',
      interviewDate: new Date().toISOString().split('T')[0],
      durationInMinutes: 60,
      difficulty: 'medium',
      interviewerName: '',
      feedback: '',
      result: 'pending',
    });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);
  console.log('Rendering AddRoundModal with roundNumber:', formData.roundNumber);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg mx-4 my-8 sm:my-16"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-elevated">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Add New Round</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                {/* Round Number & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roundNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Round Number
                    </label>
                    <input
                      id="roundNumber"
                      type="number"
                      min={1}
                      value={formData.roundNumber}
                      // onChange={(e) => handleChange('roundNumber', parseInt(e.target.value) || 1)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                      readOnly
                   />
                  </div>
                  <div>
                    <label htmlFor="roundType" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Round Type
                    </label>
                    <select
                      id="roundType"
                      value={formData.roundType}
                      onChange={(e) => handleChange('roundType', e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    >
                      {roundTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Interview Date
                    </label>
                    <input
                      id="interviewDate"
                      type="date"
                      value={formData.interviewDate}
                      onChange={(e) => handleChange('interviewDate', e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Duration
                    </label>
                    <select
                      id="duration"
                      value={formData.durationInMinutes}
                      onChange={(e) => handleChange('durationInMinutes', parseInt(e.target.value) || 30)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    >
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>60 min</option>
                      <option value={75}>75 min</option>
                      <option value={90}>90 min</option>
                      <option value={120}>120 min</option>
                      <option value={150}>150 min</option>
                      <option value={180}>180 min</option>
                      <option value={240}>240 min</option>
                    </select>
                  </div>
                </div>

                {/* Difficulty & Interviewer */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roundDifficulty" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Difficulty
                    </label>
                    <select
                      id="roundDifficulty"
                      value={formData.difficulty}
                      onChange={(e) => handleChange('difficulty', e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    >
                      {difficultyLevels.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interviewerName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Interviewer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="interviewerName"
                      type="text"
                      value={formData.interviewerName}
                      onChange={(e) => handleChange('interviewerName', e.target.value)}
                      placeholder="e.g. Sarah Chen"
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Result */}
                <div>
                  <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Result
                  </label>
                  <select
                    id="result"
                    value={formData.result}
                    onChange={(e) => handleChange('result', e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="cleared">Cleared</option>
                    <option value="rejected">Rejected</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>

                {/* Feedback */}
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={2}
                    value={formData.feedback}
                    onChange={(e) => handleChange('feedback', e.target.value)}
                    placeholder="Overall feedback for this round..."
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.interviewerName.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    Add Round
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}