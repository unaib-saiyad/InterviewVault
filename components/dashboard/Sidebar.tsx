'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Target,
  User,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  isOpen: boolean;
  isCompact: boolean;
  onClose: () => void;
  onToggleCompact: () => void;
};

const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Interviews', href: '/interviews', icon: MessageSquare },
  { name: 'Questions', href: '/questions', icon: FileText },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Revision Planner', href: '/revision-planner', icon: Calendar },
];

const accountNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar({ isOpen, isCompact, onClose, onToggleCompact }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <div className={cn(
        'hidden md:fixed md:inset-y-0 md:z-50 md:flex md:flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-out',
        isCompact ? 'md:w-20' : 'md:w-64'
      )}>
        <div className="flex h-full flex-col bg-white">
          {/* Header with logo and toggle */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-4">
            <div className={cn('flex items-center gap-3 flex-1 min-w-0', isCompact && 'justify-center')}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center shrink-0">
                <Target className="h-5 w-5 text-white" />
              </div>
              {!isCompact && (
                <span className="text-sm font-bold text-slate-900 truncate">Interview Vault</span>
              )}
            </div>
            <button
              type="button"
              onClick={onToggleCompact}
              className={cn(
                'flex items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900',
                isCompact ? 'h-8 w-8' : 'h-8 w-8'
              )}
              title={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCompact ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-2">
              <div className={cn('space-y-1', isCompact && 'hidden')}>
                <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Main</p>
                <ul role="list" className="space-y-1">
                  {mainNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-brand-50 text-brand-700 shadow-sm'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          )}
                          title={isCompact ? item.name : undefined}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors duration-200',
                              isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                            )}
                            aria-hidden="true"
                          />
                          {!isCompact && <span className="truncate">{item.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={cn('space-y-1 pt-4 border-t border-slate-200', isCompact && 'pt-2 border-t-transparent')}>
                {!isCompact && <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account</p>}
                <ul role="list" className="space-y-1">
                  {accountNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-brand-50 text-brand-700 shadow-sm'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          )}
                          title={isCompact ? item.name : undefined}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors duration-200',
                              isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                            )}
                            aria-hidden="true"
                          />
                          {!isCompact && <span className="truncate">{item.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 space-y-2 px-2 py-4">
            <button className={cn(
              'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-red-50 hover:text-red-700',
              isCompact && 'justify-center'
            )} title={isCompact ? 'Logout' : undefined}>
              <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-600" />
              {!isCompact && <span className="truncate">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-72 transform bg-white transition-transform duration-300 ease-in-out md:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col border-r border-slate-200">
          {/* Header with close button */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900">Interview Vault</span>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-4">
              <div>
                <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Main</p>
                <ul role="list" className="space-y-1 mt-2">
                  {mainNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-brand-50 text-brand-700'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-brand-600' : 'text-slate-400'
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account</p>
                <ul role="list" className="space-y-1 mt-2">
                  {accountNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-brand-50 text-brand-700'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-brand-600' : 'text-slate-400'
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 px-2 py-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-red-50 hover:text-red-700">
              <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-600" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}