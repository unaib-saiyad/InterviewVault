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

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, you would make an API call here
            console.log('Login attempt:', { email, password });
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
            <AuthCard title="Welcome back" description="Sign in to your interview preparation system">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error ? <FormError message={error} /> : null}

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
                        placeholder="Enter your password"
                        value={password}
                        onChange={setPassword}
                        disabled={loading}
                        autoComplete="current-password"
                    />

                    <div className="flex items-center justify-between text-sm space-x-3">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-brand-600 bg-white transition duration-200 cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
                            />
                            <span className="text-slate-700 font-medium">Remember me</span>
                        </label>
                        <Link href="/auth/forgot-password" className="text-brand-600 font-medium transition hover:text-brand-700">
                            Forgot password?
                        </Link>
                    </div>

                    <SubmitButton label="Sign in" loading={loading} />

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="font-semibold text-brand-600 transition hover:text-brand-700">
                            Sign up
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </AuthLayout>
    );
}
