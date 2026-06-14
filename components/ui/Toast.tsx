'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';
import type { Toast as ToastType } from '@/types/toastTypes';

type ToastProps = {
  toast: ToastType;
  onDismiss: (id: string) => void;
};

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const colorMap = {
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'text-emerald-500',
    title: 'text-emerald-800',
    message: 'text-emerald-600',
    progress: 'bg-emerald-400',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    message: 'text-red-600',
    progress: 'bg-red-400',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-500',
    title: 'text-amber-800',
    message: 'text-amber-600',
    progress: 'bg-amber-400',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    message: 'text-blue-600',
    progress: 'bg-blue-400',
  },
  loading: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    icon: 'text-slate-500',
    title: 'text-slate-800',
    message: 'text-slate-600',
    progress: 'bg-slate-400',
  },
};

const toastVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95, x: 20 },
  animate: { opacity: 1, y: 0, scale: 1, x: 0 },
  exit: { opacity: 0, y: -10, scale: 0.95, x: 20, transition: { duration: 0.2 } },
};

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const colors = colorMap[toast.type];
  const Icon = iconMap[toast.type];
  const isSpinning = toast.type === 'loading';

  useEffect(() => {
    if (toast.type === 'loading' || !toast.duration || toast.duration === 0) return;

    const duration = toast.duration ?? 4000;
    const interval = 50;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - step;
        return next <= 0 ? 0 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.type, toast.duration]);

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
      className={`relative w-full max-w-sm rounded-xl border ${colors.bg} ${colors.border} shadow-lg overflow-hidden pointer-events-auto`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
          <Icon className={`h-5 w-5 ${isSpinning ? 'animate-spin' : ''}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${colors.title}`}>{toast.title}</p>
          {toast.message && (
            <p className={`text-sm mt-0.5 ${colors.message}`}>{toast.message}</p>
          )}
        </div>
        {toast.type !== 'loading' && (
          <button
            onClick={() => onDismiss(toast.id)}
            className={`flex-shrink-0 p-1 rounded-md transition-colors duration-150 hover:bg-black/5 ${colors.title}`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {toast.type !== 'loading' && toast.duration !== 0 && (
        <div className="h-1 w-full bg-black/5">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
            className={`h-full ${colors.progress} rounded-r-full`}
          />
        </div>
      )}
    </motion.div>
  );
}

type ToastContainerProps = {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
};

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}