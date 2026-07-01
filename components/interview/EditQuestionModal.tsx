'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateQuestion } from '@/lib/questionApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TopicSelector from './TopicSelector';
import SubTopicSelector from './SubTopicSelector';
import type { InterviewQuestionDetails, TopicOption, SubTopicOption, QuestionTypeValue } from '@/types/questionTypes';
type EditQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questionObj: InterviewQuestionDetails;
  onSubmit: (data: EditQuestionFormData) => void;
  selectedRoundId: string;
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
export type EditQuestionFormData = {
  _id: string;
  question: string;
  type: QuestionTypeValue;
  difficulty: string;
  answer: string;
  notes: string;
  solved: boolean;
  confidenceScore: Number;
  topic: TopicOption | null;
  subTopic: SubTopicOption | null;
};

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

function normalizeData(data: InterviewQuestionDetails): EditQuestionFormData {
  return {
    _id: data._id,
    question: data.question,
    type: data.questionType as QuestionTypeValue,
    difficulty: data.difficulty,
    answer: data.answer,
    notes: data.notes,
    solved: data.solved,
    confidenceScore: data.confidenceScore,
    topic: {
      type: 'existing',
      ...data.topic
    },
    subTopic: {
      type: 'existing',
      ...data.subTopic
    }
  }
}

export function EditQuestionModal({ isOpen, onClose, questionObj, onSubmit, selectedRoundId }: EditQuestionModalProps) {
  const queryClient = useQueryClient();
  const updateQuestionMutation = useMutation({
    mutationFn: ({ formData, questionId }: { formData: any; questionId: string }) => updateQuestion({ data: formData, questionId: questionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewQuestions', selectedRoundId] });
      onClose();
    }
  });

  const [formData, setFormData] = useState<EditQuestionFormData>(normalizeData(questionObj));
  useEffect(() => {
    setFormData(normalizeData(questionObj));
  }, [questionObj]);

  const handleChange = (field: keyof EditQuestionFormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) return;
    await updateQuestionMutation.mutateAsync({ formData, questionId: formData._id });
    onSubmit(formData);
    setFormData({
      _id: '',
      question: '',
      type: 'technical',
      difficulty: 'medium',
      answer: '',
      notes: '',
      solved: false,
      confidenceScore: 3,
      topic: null,
      subTopic: null,
    });
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

  
    const handleTopicChange = (topic: TopicOption) => {
      setFormData((prev) => ({ ...prev, topic, subTopic: null }));
    };
  
    const handleSubTopicChange = (subTopic: SubTopicOption) => {
      setFormData((prev) => ({ ...prev, subTopic }));
    };

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
                    Edit Question
                  </h2>
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
                    value={String(formData.confidenceScore)}
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
                    Save Chnages
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