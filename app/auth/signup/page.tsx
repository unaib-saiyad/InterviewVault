
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import SignupForm from '@/components/auth/SignupForm';

import { ShieldCheck } from 'lucide-react';

const brandingContent = (
  <div className="max-w-sm text-center">
    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-card">
      <ShieldCheck className="h-7 w-7" />
    </div>
    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">InterviewVault</h2>
    <p className="mt-3 text-base leading-7 text-slate-600">
      Your personal interview memory + preparation system
    </p>
    <div className="mt-8 space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-brand-600 font-semibold">→</span>
        <span className="text-sm text-slate-700">Track interview experiences company-wise</span>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-brand-600 font-semibold">→</span>
        <span className="text-sm text-slate-700">Save important questions and answers</span>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-brand-600 font-semibold">→</span>
        <span className="text-sm text-slate-700">Improve with structured preparation</span>
      </div>
    </div>
  </div>
);

export default function SignupPage() {
  return (
    <AuthLayout brandingContent={brandingContent}>
      <AuthCard title="Create your account" description="Join InterviewVault and start preparing smarter">
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}
