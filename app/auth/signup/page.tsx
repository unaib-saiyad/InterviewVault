'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { InputField } from '@/components/auth/InputField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormError } from '@/components/auth/FormError';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would make an API call here
      console.log('Signup attempt:', { fullName, email, password });
    }, 1500);
  };

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

  return (
    <AuthLayout brandingContent={brandingContent}>
      <AuthCard title="Create your account" description="Join InterviewVault and start preparing smarter">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error ? <FormError message={error} /> : null}

          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={setFullName}
            disabled={loading}
            autoComplete="name"
          />

          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            disabled={loading}
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChange={setPassword}
            disabled={loading}
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            disabled={loading}
            autoComplete="new-password"
          />

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 bg-white transition duration-200 cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
              disabled={loading}
            />
            <label htmlFor="terms" className="text-sm text-slate-700 flex-1">
              I agree to the{' '}
              <Link href="#" className="font-medium text-brand-600 hover:text-brand-700 transition">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="font-medium text-brand-600 hover:text-brand-700 transition">
                Privacy Policy
              </Link>
            </label>
          </div>

          <SubmitButton label="Create account" loading={loading} />

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
