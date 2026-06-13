'use client';

import { useEffect } from 'react';
import { useToast } from '@/lib/useToast';

export type ToastEventDetail = {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
};

declare global {
  interface WindowEventMap {
    'app-toast': CustomEvent<ToastEventDetail>;
  }
}

export function GlobalToastHandler() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  useEffect(() => {
    const handler = (event: CustomEvent<ToastEventDetail>) => {
      const { type, title, message, duration } = event.detail;
      switch (type) {
        case 'success':
          showSuccess(title, message, duration);
          break;
        case 'error':
          showError(title, message, duration);
          break;
        case 'warning':
          showWarning(title, message, duration);
          break;
        case 'info':
          showInfo(title, message, duration);
          break;
      }
    };

    window.addEventListener('app-toast', handler as EventListener);
    return () => window.removeEventListener('app-toast', handler as EventListener);
  }, [showSuccess, showError, showWarning, showInfo]);

  return null;
}

export function dispatchToast(detail: ToastEventDetail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app-toast', { detail }));
  }
}