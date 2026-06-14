'use client';

import { useCallback } from 'react';
import { useToastContext } from '@/lib/ToastContext';
import type { ToastType } from '@/types/toastTypes';

export function useToast() {
  const { addToast, removeToast, clearToasts } = useToastContext();

  const showToast = useCallback(
    (type: ToastType, title: string, message?: string, duration?: number) => {
      return addToast({ type, title, message, duration });
    },
    [addToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'success', title, message, duration });
    },
    [addToast]
  );

  const showError = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'error', title, message, duration });
    },
    [addToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'warning', title, message, duration });
    },
    [addToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addToast({ type: 'info', title, message, duration });
    },
    [addToast]
  );

  const showLoading = useCallback(
    (title: string, message?: string) => {
      return addToast({ type: 'loading', title, message, duration: 0 });
    },
    [addToast]
  );

  return {
    toast: showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismissToast: removeToast,
    clearToasts,
  };
}