'use client';

import { Plus, Search } from 'lucide-react';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { useEffect, useState } from 'react';

const mockQuestions = [
  {
    id: '1',
    title: 'Explain JavaScript closures and provide an example',
    topic: 'JavaScript',
    difficulty: 'Medium',
    dateAdded: 'Mar 5, 2024',
  },
  {
    id: '2',
    title: 'How does React handle state updates?',
    topic: 'React',
    difficulty: 'Hard',
    dateAdded: 'Mar 3, 2024',
  },
  {
    id: '3',
    title: 'Design a URL shortening service',
    topic: 'System Design',
    difficulty: 'Hard',
    dateAdded: 'Feb 28, 2024',
  },
  {
    id: '4',
    title: 'Implement a binary search algorithm',
    topic: 'Algorithms',
    difficulty: 'Medium',
    dateAdded: 'Feb 25, 2024',
  },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

export default function QuestionsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  }, [])

  return (
      <div className="space-y-8">
        {/* Header with action */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Question Bank</h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage and organize your interview questions
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700">
            <Plus className="h-4 w-4" />
            Add Question
          </button>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-3" />
            <input
              type="text"
              placeholder="Search questions..."
              className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Questions List */}
        <SectionCard title="All Questions">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="skeleton h-5 w-3/4 mb-2" />
                  <div className="skeleton h-4 w-1/4 mb-2" />
                  <div className="flex items-center justify-between">
                    <div className="skeleton h-4 w-20" />
                    <div className="skeleton h-6 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {mockQuestions.map((question) => (
                <div key={question.id} className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <h3 className="font-medium text-slate-900 mb-1">{question.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{question.topic}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{question.dateAdded}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      difficultyColors[question.difficulty as keyof typeof difficultyColors]
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
  );
}