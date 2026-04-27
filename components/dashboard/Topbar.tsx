'use client';

import { Bell, Menu, Search, Sun, User } from 'lucide-react';
import { motion } from 'framer-motion';

type TopbarProps = {
  title: string;
  onMenuClick: () => void;
  onToggleCompact?: () => void;
};

export function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm"
    >
      <div className="px-6 py-4 sm:px-8 lg:px-12">
        {/* Single row layout */}
        <div className="flex items-center justify-between gap-6">
          {/* Left: Page title/logo (subtle) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 min-w-0 flex-shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="-m-2 inline-flex items-center justify-center rounded-xl p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
            <div className="hidden sm:block min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-lg font-semibold text-gray-700 truncate"
              >
                {title}
              </motion.h1>
            </div>
          </motion.div>

          {/* Center/Left: Search bar (prominent) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 min-w-0 max-w-full mx-2 sm:mx-4 sm:max-w-sm md:max-w-md"
          >
            <div className="relative">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interviews, questions..."
                  className="w-full rounded-full border-0 bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-600 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all duration-200 hover:bg-gray-200/60"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Action icons */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(248, 250, 252, 0.9)'
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:text-gray-700 hover:bg-gray-100"
            >
              <Bell className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(248, 250, 252, 0.9)'
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:text-gray-700 hover:bg-gray-100"
            >
              <Sun className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 12px -2px rgba(59, 130, 246, 0.25)'
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white transition-all duration-200 hover:from-brand-600 hover:to-brand-700 shadow-md"
            >
              <User className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}