'use client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { InterviewList } from '@/components/dashboard/InterviewList';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Target,
  TrendingUp
} from 'lucide-react';
import {
  StatCardSkeleton,
  SectionCardSkeleton,
  ChartCardSkeleton,
  TaskListSkeleton,
  InterviewListSkeleton
} from '@/components/dashboard/skeletons';

// Mock data
const stats = [
  { title: 'Interviews Attempted', value: 12, icon: <MessageSquare className="h-6 w-6" /> },
  { title: 'Questions Saved', value: 143, icon: <FileText className="h-6 w-6" /> },
  { title: 'Weak Topics', value: 3, icon: <Target className="h-6 w-6" /> },
  { title: 'Pending Revisions', value: 8, icon: <Calendar className="h-6 w-6" /> },
];

const focusTasks = [
  { id: '1', title: 'Revise JavaScript closures and scope', completed: false },
  { id: '2', title: 'Review React hooks patterns', completed: true },
  { id: '3', title: 'Practice system design questions', completed: false },
  { id: '4', title: 'Review data structures algorithms', completed: false },
];

const weakTopics = [
  { name: 'JavaScript Closures', level: 'Weak' },
  { name: 'React Hooks', level: 'Medium' },
  { name: 'System Design', level: 'Weak' },
];

const revisionTasks = [
  { id: '1', title: 'Review async/await patterns', dueDate: 'Today', status: 'pending' },
  { id: '2', title: 'Practice SQL queries', dueDate: 'Tomorrow', status: 'pending' },
  { id: '3', title: 'Study design patterns', dueDate: 'Mar 15', status: 'completed' },
];

const recentInterviews = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    date: 'Mar 10, 2024',
    status: 'selected' as const,
  },
  {
    id: '2',
    company: 'Meta',
    role: 'Full Stack Developer',
    date: 'Feb 28, 2024',
    status: 'pending' as const,
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Software Engineer',
    date: 'Feb 15, 2024',
    status: 'rejected' as const,
  },
];

const chartData = [
  { topic: 'JavaScript', questions: 45 },
  { topic: 'React', questions: 32 },
  { topic: 'System Design', questions: 28 },
  { topic: 'Algorithms', questions: 22 },
  { topic: 'CSS', questions: 16 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setLoading(false);
    setHasMounted(true);
  }, []);
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-2">Welcome back!</h1>
            <p className="text-base text-slate-600">Here's your current progress on interview preparation.</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
              <Plus className="h-4 w-4" />
              <span>Add Interview</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Add Question</span>
              <span className="sm:hidden">Question</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Plan Revision</span>
              <span className="sm:hidden">Revision</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-7 lg:grid-cols-[minmax(0,2fr)_1fr]">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Focus Today */}
            <SectionCard title="Focus Today">
              {loading ? (
                <TaskListSkeleton />
              ) : (
                <TaskList tasks={focusTasks} />
              )}
            </SectionCard>

            {/* Weak Topics */}
            <SectionCard title="Weak Areas">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="skeleton h-4 w-40" />
                      <div className="skeleton h-6 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {weakTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200">
                      <span className="text-sm font-medium text-slate-900">{topic.name}</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${topic.level === 'Weak'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>
                        {topic.level}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Chart */}
            <ChartCard title="Topic Progress">
              {loading ? (
                <div className="skeleton h-full w-full"><ChartCardSkeleton /></div>
              ) : chartData.length > 0 ? (
                hasMounted ? (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                      <XAxis
                        dataKey="topic"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                        interval={0}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      />
                      <Bar
                        dataKey="questions"
                        fill="#3b82f6"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    Loading chart...
                  </div>
                )
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-3 text-sm font-medium text-slate-600">No data available yet</p>
                    <p className="text-xs text-slate-500 mt-1">Start adding questions to see progress</p>
                  </div>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Revision Tasks */}
            <SectionCard title="Upcoming Revisions">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                      <div className="flex-1">
                        <div className="skeleton h-4 w-full mb-1.5" />
                        <div className="skeleton h-3 w-16" />
                      </div>
                      <div className="skeleton h-6 w-16 rounded-full ml-3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {revisionTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors duration-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{task.title}</p>
                        <p className="text-xs text-slate-500 mt-1">Due: {task.dueDate}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 ${task.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Recent Interviews */}
            <SectionCard title="Recent Interviews">
              {loading ? (
                <InterviewListSkeleton />
              ) : (
                <InterviewList interviews={recentInterviews} />
              )}
            </SectionCard>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}