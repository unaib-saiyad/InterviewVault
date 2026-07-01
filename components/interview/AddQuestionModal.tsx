'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuestionTypeValue, TopicOption, SubTopicOption } from '@/types/questionTypes';
import { createQuestion } from '@/lib/questionApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/lib/useToast';
import TopicSelector from './TopicSelector';
import SubTopicSelector from './SubTopicSelector';

type AddQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionFormData) => void;
  parentQuestionText?: string;
  parentQuestionId: string;
  selectedRoundId: string;
};

export type QuestionFormData = {
  question: string;
  type: QuestionTypeValue;
  difficulty: string;
  answer: string;
  notes: string;
  solved: boolean;
  confidenceScore?: 1 | 2 | 3 | 4 | 5;
  topic: TopicOption | null;
  subTopic: SubTopicOption | null;
};

const questionTypes = [
  { value: 'technical', label: 'Technical' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'system_design', label: 'System Design' },
  { value: 'coding', label: 'Coding' },
  { value: 'hr', label: 'HR' },
  { value: 'dsa', label: 'DSA' },
  { value: 'situational', label: 'Situational' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'brain_storming', label: 'Brain Storming' },
  { value: 'others', label: 'Others' },
];

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function AddQuestionModal({ isOpen, onClose, onSubmit, parentQuestionId, parentQuestionText, selectedRoundId }: AddQuestionModalProps) {
  const { showSuccess } = useToast();
  const queryClient = useQueryClient();
  const createQuestionMutation = useMutation({
    mutationFn: ({ formData, parentQuestionId, selectedRoundId }: { formData: any; parentQuestionId: string; selectedRoundId: string }) => createQuestion({ data: formData, parentQuestionId, selectedRoundId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewQuestions', selectedRoundId] });
      onClose();
    }
  });

  const [formData, setFormData] = useState<QuestionFormData>({
    question: '',
    type: 'technical',
    difficulty: 'medium',
    answer: '',
    notes: '',
    solved: false,
    confidenceScore: 3,
    topic: null,
    subTopic: null
  });

  const handleChange = (field: keyof QuestionFormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) return;
    await createQuestionMutation.mutateAsync({ formData, parentQuestionId, selectedRoundId });
    showSuccess('Question added', 'Question added successfully!');
    onSubmit(formData);
    setFormData({
      question: '',
      type: 'technical',
      difficulty: 'medium',
      answer: '',
      notes: '',
      solved: false,
      confidenceScore: 3,
      topic: null,
      subTopic: null
    });
  };

  const handleTopicChange = (topic: TopicOption) => {
    setFormData((prev) => ({ ...prev, topic, subTopic: null }));
  };

  const handleSubTopicChange = (subTopic: SubTopicOption) => {
    setFormData((prev) => ({ ...prev, subTopic }));
  };

  // Handle escape key
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


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg mx-4 my-8 sm:my-16"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-elevated">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {parentQuestionText ? 'Add Follow-up Question' : 'Add New Question'}
                  </h2>
                  {parentQuestionText && (
                    <p className="text-sm text-gray-500 mt-0.5 truncate max-w-sm">
                      to: &ldquo;{parentQuestionText.slice(0, 60)} {parentQuestionText.length > 60 ? '...' : ''}&rdquo;
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                {/* Question */}
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="question"
                    rows={3}
                    value={formData.question}
                    onChange={(e) => handleChange('question', e.target.value)}
                    placeholder="Enter the interview question..."
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Type and Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Type
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    >
                      {questionTypes.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
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
                </div>
                {/* Topic and SubTopic */}
                <div className="grid grid-cols-2 gap-4">
                  <TopicSelector
                    value={formData.topic}
                    onChange={handleTopicChange}
                  />

                  <SubTopicSelector
                    value={formData.subTopic}
                    onChange={handleSubTopicChange}
                  />
                </div>
                {/* Answer */}
                <div>
                  <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Answer
                  </label>
                  <textarea
                    id="answer"
                    rows={3}
                    value={formData.answer}
                    onChange={(e) => handleChange('answer', e.target.value)}
                    placeholder="Write the ideal answer or solution..."
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200 resize-none"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                  </label>
                  <input
                    id="notes"
                    type="text"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Key observations or hints..."
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                  />
                </div>

                {/* Solved toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange('solved', !formData.solved)}
                    className={cn(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                      formData.solved ? 'bg-emerald-500' : 'bg-gray-300'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
                        formData.solved ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                  <span className="text-sm text-gray-700 font-medium">
                    Mark as solved
                  </span>
                </div>

                {/* Confidence Score */}
                <div
                  className="flex items-center gap-3"
                  title="Indicates how confident you are about this question. Useful for prioritization and review."
                >
                  <label htmlFor="confidence" className="block text-sm font-medium text-gray-700">
                    Confidence
                  </label>
                  <select
                    id="confidence"
                    value={formData.confidenceScore}
                    onChange={(e) => handleChange('confidenceScore', parseInt(e.target.value))}
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                  >
                    <option value={1}>No Idea</option>
                    <option value={2}>Weak</option>
                    <option value={3}>Moderate</option>
                    <option value={4}>Good</option>
                    <option value={5}>Mastered</option>
                  </select>
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
                    disabled={!formData.question.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    Save Question
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