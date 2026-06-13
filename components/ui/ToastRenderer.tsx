'use client';

import { useToastContext } from '@/lib/ToastContext';
import { ToastContainer } from '@/components/ui/Toast';

export function ToastRenderer() {
  const { toasts, removeToast } = useToastContext();

  return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
}