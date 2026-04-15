'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { StatCardSkeleton, ChartCardSkeleton } from '@/components/dashboard/skeletons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data
const progressStats = [
  { title: 'Questions Mastered', value: 89, icon: <Award className="h-6 w-6" /> },
  { title: 'Topics Completed', value: 12, icon: <Target className="h-6 w-6" /> },
  { title: 'Improvement Rate', value: '+23%', icon: <TrendingUp className="h-6 w-6" /> },
  { title: 'Study Streak', value: '7 days', icon: <Target className="h-6 w-6" /> },
];

const topicProgressData = [
  { topic: 'JavaScript', mastered: 35, total: 45 },
  { topic: 'React', mastered: 28, total: 32 },
  { topic: 'System Design', mastered: 15, total: 28 },
  { topic: 'Algorithms', mastered: 18, total: 22 },
  { topic: 'CSS', mastered: 12, total: 16 },
];

const weeklyProgressData = [
  { week: 'Week 1', questions: 12 },
  { week: 'Week 2', questions: 18 },
  { week: 'Week 3', questions: 15 },
  { week: 'Week 4', questions: 22 },
  { week: 'Week 5', questions: 25 },
  { week: 'Week 6', questions: 20 },
];

const achievements = [
  { title: 'First Interview', description: 'Completed your first mock interview', date: 'Feb 15, 2024' },
  { title: 'Question Master', description: 'Answered 50 questions correctly', date: 'Feb 20, 2024' },
  { title: 'Consistent Learner', description: '7-day study streak', date: 'Mar 10, 2024' },
];

export default function ProgressPage() {
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setLoading(false);
  }, []);

  return (
    <DashboardLayout title="Progress">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Progress</h2>
          <p className="mt-1 text-sm text-slate-600">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            progressStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))
          )}
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Topic Progress */}
          <ChartCard title="Topic Mastery">
            {loading ? (
              <div className="skeleton h-full w-full" />
            ) : hasMounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={topicProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="topic"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="mastered" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Loading chart...
              </div>
            )}
          </ChartCard>

          {/* Weekly Progress */}
          <ChartCard title="Weekly Activity">
            {loading ? (
              <div className="skeleton h-full w-full" />
            ) : hasMounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="questions"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Loading chart...
              </div>
            )}
          </ChartCard>
        </div>

        {/* Achievements */}
        <SectionCard title="Recent Achievements">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="skeleton h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <div className="skeleton h-5 w-32 mb-1" />
                    <div className="skeleton h-4 w-48 mb-2" />
                    <div className="skeleton h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{achievement.title}</h4>
                    <p className="text-sm text-slate-600 mb-1">{achievement.description}</p>
                    <p className="text-xs text-slate-500">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}