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
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';

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

  const handleLogout = () =>{
    try{
      api.post('/auth/logout');
      localStorage.removeItem("accessToken");
      window.location.href = '/auth/login?loggedOut=true';
    }
    catch(error){
      if(error instanceof Error){
        console.error('Logout failed:');
      }
      else{
        const err = error as ApiError;
        console.error('Logout failed:', err.message);
      }
    }
  }

  const sidebarVariants = {
    expanded: { width: 280 },
    compact: { width: 88 }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isCompact ? 'compact' : 'expanded'}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col bg-gray-50 border-r border-gray-200 shadow-lg backdrop-blur-xl'
        )}
      >
        <div className="flex h-full flex-col bg-gray-50">
          {/* Header with logo and toggle */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-between gap-3 border-b border-gray-200/40 px-5 py-6"
          >
            <div className={cn('flex items-center gap-4 flex-1 min-w-0', isCompact && 'justify-center')}>
              <motion.div
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.3)'
                }}
                className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Target className="h-6 w-6 text-white" />
              </motion.div>
              <AnimatePresence>
                {!isCompact && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-lg font-bold text-gray-900 truncate"
                  >
                    Interview Vault
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: 'rgba(248, 250, 252, 0.9)',
                boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
              }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={onToggleCompact}
              className={cn(
                'flex items-center justify-center rounded-2xl text-gray-500 transition-all duration-300 hover:text-gray-700 bg-white/60 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/60 shadow-sm',
                isCompact ? 'h-10 w-10' : 'h-10 w-10'
              )}
              title={isCompact ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <motion.div
                animate={{ rotate: isCompact ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-5 py-8">
            <div className="space-y-10">
              <div className={cn('space-y-2', isCompact && 'hidden')}>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3"
                >
                  Main
                </motion.p>
                <ul role="list" className="space-y-1">
                  {mainNavigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                            isActive
                              ? 'bg-gray-100 text-gray-900 border-l-2 border-brand-500'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          )}
                          title={isCompact ? item.name : undefined}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={cn(
                              'h-5 w-5 shrink-0 transition-colors duration-200',
                              isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </motion.div>
                          {!isCompact && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="truncate"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className={cn('space-y-2 pt-6 border-t border-slate-200/60', isCompact && 'pt-3 border-t-transparent')}>
                {!isCompact && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3"
                  >
                    Account
                  </motion.p>
                )}
                <ul role="list" className="space-y-1">
                  {accountNavigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.06 + 0.45, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                            isActive
                              ? 'bg-gray-100 text-gray-900 border-l-2 border-brand-500'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          )}
                          title={isCompact ? item.name : undefined}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={cn(
                              'h-5 w-5 shrink-0 transition-all duration-200',
                              isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </motion.div>
                          {!isCompact && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="truncate"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="border-t border-gray-200/40 space-y-3 px-4 py-6"
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(254, 226, 226, 0.8)',
                boxShadow: '0 4px 12px -2px rgba(239, 68, 68, 0.15)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className={cn(
                'group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all duration-300 hover:text-red-700 hover:shadow-sm border border-transparent hover:border-red-200/60',
                isCompact && 'justify-center'
              )}
              title={isCompact ? 'Logout' : undefined}
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
              </motion.div>
              {!isCompact && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="truncate"
                >
                  Logout
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200/80 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex h-full flex-col bg-white/95">
                {/* Header with close button */}
                <motion.div
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center justify-between gap-3 border-b border-gray-200/40 px-5 py-6"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.3)'
                      }}
                      className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shrink-0 shadow-lg"
                    >
                      <Target className="h-6 w-6 text-white" />
                    </motion.div>
                    <span className="text-lg font-bold text-gray-900">Interview Vault</span>
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: 'rgba(248, 250, 252, 0.9)',
                      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
                    }}
                    whileTap={{ scale: 0.92 }}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-500 hover:text-gray-700 transition-all duration-300 bg-white/60 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/60 shadow-sm"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-5 py-8">
                  <div className="space-y-10">
                    <div>
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3"
                      >
                        Main
                      </motion.p>
                      <ul role="list" className="space-y-1">
                        {mainNavigation.map((item, index) => {
                          const isActive = pathname === item.href;
                          return (
                            <motion.li
                              key={item.name}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                            >
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                                  isActive
                                    ? 'bg-gray-100 text-gray-900 border-l-2 border-brand-500'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                )}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className={cn(
                                    'h-5 w-5 shrink-0 transition-colors duration-200',
                                    isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                                  )}
                                >
                                  <item.icon className="h-5 w-5" />
                                </motion.div>
                                <span className="truncate">{item.name}</span>
                                {isActive && (
                                  <motion.div
                                    layoutId="mobileActiveIndicator"
                                    className="absolute inset-0 bg-brand-100/60 rounded-xl border border-brand-200/40"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                  />
                                )}
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>

                    <div>
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="px-3 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3"
                      >
                        Account
                      </motion.p>
                      <ul role="list" className="space-y-1">
                        {accountNavigation.map((item, index) => {
                          const isActive = pathname === item.href;
                          return (
                            <motion.li
                              key={item.name}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
                            >
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                                  isActive
                                    ? 'bg-gray-100 text-gray-900 border-l-2 border-brand-500'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                )}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className={cn(
                                    'h-5 w-5 shrink-0 transition-colors duration-200',
                                    isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                                  )}
                                >
                                  <item.icon className="h-5 w-5" />
                                </motion.div>
                                <span className="truncate">{item.name}</span>
                                {isActive && (
                                  <motion.div
                                    layoutId="mobileActiveIndicator"
                                    className="absolute inset-0 bg-brand-100/60 rounded-xl border border-brand-200/40"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                  />
                                )}
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </nav>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="border-t border-gray-200/40 space-y-3 px-4 py-6"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: 'rgba(254, 226, 226, 0.8)',
                      boxShadow: '0 4px 12px -2px rgba(239, 68, 68, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all duration-300 hover:text-red-700 hover:shadow-sm border border-transparent hover:border-red-200/60"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-all duration-300"
                    >
                      <LogOut className="h-5 w-5" />
                    </motion.div>
                    <span className="truncate">Logout</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}