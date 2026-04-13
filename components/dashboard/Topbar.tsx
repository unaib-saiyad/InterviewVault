'use client';

import { Bell, Menu, Search, Sun, User } from 'lucide-react';

type TopbarProps = {
  title: string;
  onMenuClick: () => void;
  onToggleCompact?: () => void;
};

export function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        {/* Top row with title and actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-slate-700 hover:bg-slate-100 transition-colors md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 truncate">{title}</h1>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
            >
              <Bell className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
            >
              <Sun className="h-4 w-4" />
            </button>

            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 text-white transition-all hover:shadow-md hover:scale-105">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search bar - below title on all screens */}
        <div className="mt-4">
          <div className="relative max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dashboards, interviews..."
              className="block w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}