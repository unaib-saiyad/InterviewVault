'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  MessageSquare,
  Plus,
  User,
  Edit3,
  FileText,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoundResultBadge } from './StatusBadge';
import { DifficultyBadge, RoundTypeBadge } from './DifficultyBadge';
import type { Round } from './mockData';
import type { InterviewRoundDetails } from '@/types/interviewTypes';
type RoundCardProps = {
  round: InterviewRoundDetails;
  onViewQuestions: (round: InterviewRoundDetails) => void;
  onAddQuestion: (round: InterviewRoundDetails) => void;
  onEditRound: (round: InterviewRoundDetails) => void;
};

export function RoundCard({ round, onViewQuestions, onAddQuestion, onEditRound }: RoundCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'rounded-xl border bg-white shadow-xs transition-all duration-300',
        isExpanded
          ? 'border-brand-200 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      )}
    >
      {/* Round Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          {/* Left section */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Round number badge */}
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 shrink-0">
              <span className="text-lg font-bold text-brand-600">{round.roundNumber}</span>
            </div>
 
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <RoundTypeBadge type={round.roundType} />
                <DifficultyBadge difficulty={round.difficulty} />
                <RoundResultBadge result={round.result} />
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  <span>{new Date(round.interviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span>{round.durationInMinutes} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <span className="truncate">{round.interviewerName}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                  <span>{round.questions.length} questions</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right section - expand icon */}
          <div className="shrink-0">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center h-9 w-9 rounded-lg bg-gray-50 border border-gray-200 text-gray-500"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 sm:px-6 py-5 space-y-4">
              {/* Feedback */}
              {round.feedback && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Feedback</h4>
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                    <FileText className="h-3.5 w-3.5 text-amber-600" />
                    <p className="text-sm text-amber-800">{round.feedback}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewQuestions(round)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 border border-brand-200 px-3.5 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-all duration-200"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Questions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddQuestion(round)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Question
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onEditRound(round)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit Round
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}