'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type FollowupThreadProps = {
  depth: number;
  children: React.ReactNode;
};

export function FollowupThread({ depth, children }: FollowupThreadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative mt-2 space-y-2',
        depth > 0 && 'ml-6 sm:ml-8'
      )}
    >
      {/* Vertical connecting line */}
      {depth > 0 && (
        <div className="absolute -left-6 sm:-left-8 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />
      )}
      {children}
    </motion.div>
  );
}