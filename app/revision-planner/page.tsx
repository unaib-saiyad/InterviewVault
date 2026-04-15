'use client';
import { useEffect, useState } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SectionCard } from '@/components/dashboard/SectionCard';

const mockRevisions = [
  {
    id: '1',
    title: 'Review JavaScript async/await patterns',
    topic: 'JavaScript',
    dueDate: 'Today',
    status: 'pending',
    estimatedTime: '30 min',
  },
  {
    id: '2',
    title: 'Practice SQL query optimization',
    topic: 'Databases',
    dueDate: 'Tomorrow',
    status: 'pending',
    estimatedTime: '45 min',
  },
  {
    id: '3',
    title: 'Study React performance optimization',
    topic: 'React',
    dueDate: 'Mar 15',
    status: 'completed',
    estimatedTime: '60 min',
  },
  {
    id: '4',
    title: 'Review system design principles',
    topic: 'System Design',
    dueDate: 'Mar 18',
    status: 'pending',
    estimatedTime: '90 min',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

export default function RevisionPlannerPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <DashboardLayout title="Revision Planner">
      <div className="space-y-8">
        {/* Header with action */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Revision Planner</h2>
            <p className="mt-1 text-sm text-slate-600">
              Plan and track your revision schedule
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700">
            <Plus className="h-4 w-4" />
            Add Revision Task
          </button>
        </div>

        {/* Revision Tasks */}
        <SectionCard title="Scheduled Revisions">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="skeleton h-5 w-3/4 mb-1" />
                      <div className="skeleton h-4 w-1/4" />
                    </div>
                    <div className="skeleton h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="skeleton h-4 w-16" />
                    <div className="skeleton h-4 w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {mockRevisions.map((revision) => (
                <div key={revision.id} className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 mb-1">{revision.title}</h3>
                      <p className="text-sm text-slate-600">{revision.topic}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[revision.status as keyof typeof statusColors]
                    }`}>
                      {revision.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {revision.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {revision.estimatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900">8</div>
            <div className="text-sm text-slate-600">Pending Tasks</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-sm text-slate-600">Completed This Week</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-2xl font-bold text-slate-900">85%</div>
            <div className="text-sm text-slate-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}