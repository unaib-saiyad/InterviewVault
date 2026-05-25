'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  MessageSquarePlus,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyBadge, QuestionTypeBadge } from './DifficultyBadge';
import type { RoundQuestion, FollowUpQuestion } from './mockData';

type QuestionCardProps = {
  question: RoundQuestion | FollowUpQuestion;
  depth?: number;
  isFollowUp?: boolean;
  onAddFollowUp: (parentId: string) => void;
  onEdit: (question: any) => void;
  onDelete: (questionId: string) => void;
  onToggleSolved: (questionId: string) => void;
};

export function QuestionCard({
  question,
  depth = 0,
  isFollowUp = false,
  onAddFollowUp,
  onEdit,
  onDelete,
  onToggleSolved,
}: QuestionCardProps) {
  const [showChildren, setShowChildren] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const hasChildren = 'followUps' in question
    ? (question as RoundQuestion).followUps.length > 0
    : (question as FollowUpQuestion).children.length > 0;

  const children = 'followUps' in question
    ? (question as RoundQuestion).followUps
    : (question as FollowUpQuestion).children;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('relative', depth > 0 && 'ml-6 sm:ml-8')}
    >
      {/* Tree connection line */}
      {depth > 0 && (
        <div className="absolute -left-6 sm:-left-8 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />
      )}
      {depth > 0 && (
        <div className="absolute -left-6 sm:-left-8 top-5 w-6 sm:w-8 h-px bg-gray-200" aria-hidden="true" />
      )}

      <div
        className={cn(
          'group relative rounded-xl border bg-white shadow-xs transition-all duration-200',
          question.solved
            ? 'border-emerald-200 hover:border-emerald-300'
            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
          isFollowUp && 'bg-gray-50/50'
        )}
      >
        {/* Main content */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4">
          {/* Top row - badges and actions */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              <QuestionTypeBadge type={question.type} />
              <DifficultyBadge difficulty={question.difficulty} />
              {question.solved ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Solved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500">
                  <Circle className="h-3 w-3" />
                  Unsolved
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onAddFollowUp(question.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200"
                title="Add Follow-up Question"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onEdit(question)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                title="Edit"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(question.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onToggleSolved(question.id)}
                className={cn(
                  'p-1.5 rounded-lg transition-all duration-200',
                  question.solved
                    ? 'text-emerald-500 hover:bg-emerald-50'
                    : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                )}
                title={question.solved ? 'Mark Unsolved' : 'Mark Solved'}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Question text */}
          <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed mb-2">
            {question.question}
          </p>

          {/* Notes preview and created date */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {question.notes && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-blue-700">
                  <FileText className="h-3 w-3" />
                  {question.notes.length > 40 ? `${question.notes.slice(0, 40)}...` : question.notes}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(question.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Expand children / answer toggle */}
            <div className="flex items-center gap-2">
              {question.answer && (
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-brand-600 transition-colors duration-200"
                >
                  <Sparkles className="h-3 w-3" />
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
              )}
              {hasChildren && (
                <button
                  onClick={() => setShowChildren(!showChildren)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-all duration-200"
                >
                  <motion.div
                    animate={{ rotate: showChildren ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </motion.div>
                  {children.length} {children.length === 1 ? 'follow-up' : 'follow-ups'}
                </button>
              )}
            </div>
          </div>

          {/* Answer section */}
          <AnimatePresence>
            {showAnswer && question.answer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Answer</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{question.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nested Follow-up Questions */}
      <AnimatePresence>
        {showChildren && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {children.map((child) => (
                <QuestionCard
                  key={child.id}
                  question={child}
                  depth={depth + 1}
                  isFollowUp
                  onAddFollowUp={onAddFollowUp}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleSolved={onToggleSolved}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}