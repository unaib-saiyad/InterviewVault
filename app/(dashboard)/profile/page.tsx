'use client';

import { User, Mail, Settings } from 'lucide-react';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    })
  return (
      <div className="space-y-8">
        {/* Profile Overview */}
        <SectionCard title="Profile Information">
          {loading ? (
            <div className="flex items-center gap-6">
              <div className="skeleton h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-6 w-48" />
                <div className="skeleton h-4 w-64" />
                <div className="skeleton h-4 w-32" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
                <User className="h-10 w-10 text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-900">John Doe</h3>
                <p className="text-sm text-slate-600">Software Engineer</p>
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-500">john.doe@example.com</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <Settings className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          )}
        </SectionCard>

        {/* Account Settings */}
        <SectionCard title="Account Settings">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white">
                  <div>
                    <div className="skeleton h-5 w-32 mb-1" />
                    <div className="skeleton h-4 w-48" />
                  </div>
                  <div className="skeleton h-8 w-16 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white">
                <div>
                  <h4 className="font-medium text-slate-900">Email Notifications</h4>
                  <p className="text-sm text-slate-600">Receive updates about your progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white">
                <div>
                  <h4 className="font-medium text-slate-900">Study Reminders</h4>
                  <p className="text-sm text-slate-600">Daily reminders to practice</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white">
                <div>
                  <h4 className="font-medium text-slate-900">Data Export</h4>
                  <p className="text-sm text-slate-600">Download your interview data</p>
                </div>
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  Export
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700">Permanently delete your account and data</p>
                </div>
                <button className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
  );
}