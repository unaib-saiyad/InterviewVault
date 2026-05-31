'use client';

import { cn } from '@/lib/utils';

const difficultyConfig = {
  easy: {
    label: 'Easy',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  hard: {
    label: 'Hard',
    className: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
};

type DifficultyBadgeProps = {
  difficulty: string;
  size?: 'sm' | 'md';
};

export function DifficultyBadge({ difficulty, size = 'sm' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig] || {
    label: difficulty,
    className: 'bg-gray-50 text-gray-700 border-gray-200',
    dot: 'bg-gray-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border font-medium transition-all duration-200',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        config.className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

const questionTypeConfig: Record<string, { label: string; className: string }> = {
  technical: { label: 'Technical', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  behavioral: { label: 'Behavioral', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  system_design: { label: 'System Design', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  coding: { label: 'Coding', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  hr: { label: 'HR', className: 'bg-pink-50 text-pink-700 border-pink-200' },
  dsa: { label: 'DSA', className: 'bg-orange-50 text-orange-700 border-orange-200' },
};

export function QuestionTypeBadge({ type }: { type: string }) {
  const config = questionTypeConfig[type] || { label: type, className: 'bg-gray-50 text-gray-700 border-gray-200' };

  return (
    <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize transition-all duration-200', config.className)}>
      {config.label}
    </span>
  );
}

const roundTypeConfig: Record<string, { label: string }> = {
  technical: { label: 'Technical' },
  behavioral: { label: 'Behavioral' },
  system_design: { label: 'System Design' },
  coding: { label: 'Coding' },
  hr: { label: 'HR' },
  dsa: { label: 'DSA' },
  managerial: { label: 'Managerial' },
};

export function RoundTypeBadge({ type }: { type: string }) {
  const config = roundTypeConfig[type] || { label: type };

  return (
    <span className="inline-flex items-center rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
      {config.label}
    </span>
  );
}