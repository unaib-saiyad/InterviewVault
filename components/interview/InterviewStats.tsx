'use client';

import { motion } from 'framer-motion';
import { BarChart3, Brain, CheckCircle2, Layers, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InterviewRoundDetails, QuestionStats } from '@/types/interviewTypes';

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
  delay: number;
};

function StatCard({ icon: Icon, label, value, subtext, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:border-gray-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {subtext && <span className="text-sm text-gray-500">{subtext}</span>}
          </div>
        </div>
        <div className={cn('rounded-xl p-2.5', color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function InterviewStats({ statistics }: { statistics: QuestionStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        icon={Layers}
        label="Total Rounds"
        value={statistics.totalRounds}
        color="bg-brand-500"
        delay={0.1}
      />
      <StatCard
        icon={Brain}
        label="Total Questions"
        value={statistics.totalQuestions}
        subtext={`incl. ${statistics.totalQuestions - statistics.rootQuestions} follow-ups`}
        color="bg-violet-500"
        delay={0.15}
      />
      <StatCard
        icon={CheckCircle2}
        label="Solved"
        value={statistics.solvedQuestions}
        subtext={`of ${statistics.totalQuestions}`}
        color="bg-emerald-500"
        delay={0.2}
      />
      <StatCard
        icon={Target}
        label="Difficulty"
        value={statistics.difficulty.charAt(0).toUpperCase() + statistics.difficulty.slice(1)}
        color="bg-amber-500"
        delay={0.25}
      />
    </div>
  );
}

// Timeline/progress indicator
export function RoundTimeline({ rounds }: { rounds: InterviewRoundDetails[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs"
    >
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-4">Progress Timeline</h3>
      <div className="flex items-center gap-1 sm:gap-2">
        {rounds.map((round, index) => {
          const isCleared = round.result === 'cleared';
          const isFailed = round.result === 'rejected';
          const isPending = round.result === 'pending';
          const isPartial = round.result === 'on_hold';

          return (
            <div key={round._id} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full" title={round.result.charAt(0).toUpperCase() + round.result.slice(1)}>
                {/* Connecting line before */}
                {index > 0 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 rounded-full',
                      isCleared || (rounds[index - 1].result === 'cleared')
                        ? 'bg-emerald-400'
                        : 'bg-gray-200'
                    )}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 shrink-0',
                    isCleared
                      ? 'border-emerald-400 bg-emerald-50'
                      : isFailed
                        ? 'border-red-400 bg-red-50'
                        : isPartial
                          ? 'border-amber-400 bg-amber-50'
                          : 'border-gray-400 bg-gray-50'
                  )}
                >
                  <span
                    className={cn(
                      'text-xs sm:text-sm font-bold',
                      isCleared
                        ? 'text-emerald-600'
                        : isFailed
                          ? 'text-red-600'
                          : isPartial
                            ? 'text-orange-600'
                            : 'text-gray-500'
                    )}
                  >
                    {round.roundNumber}
                  </span>
                </div>
                {/* Connecting line after */}
                {index < rounds.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 rounded-full',
                      isCleared ? 'bg-emerald-400' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
              <span className="mt-1.5 text-[10px] sm:text-xs font-medium text-gray-500 capitalize truncate max-w-[60px] sm:max-w-none text-center">
                {round.roundType.replace('_', ' ')}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}