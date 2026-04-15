'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { InputField } from '@/components/auth/InputField';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormSuccess } from '@/components/auth/FormSuccess';
import { FormError } from '@/components/auth/FormError';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email) {
            setError('Please enter your email address');
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
            setSuccess(true);

            // Redirect to check email page after showing success
            setTimeout(() => {
                router.push('/check-email');
            }, 2000);
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
                    <span className="text-sm text-slate-700">Secure password recovery</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Check your email inbox</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Reset link expires in 24 hours</span>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout brandingContent={brandingContent}>
            <AuthCard
                title={success ? "Check your email" : "Reset your password"}
                description={success ? "Password reset link has been sent to your email" : "Enter your email address and we'll send you a reset link"}
            >
                {success ? (
                    <div className="flex flex-col gap-8">
                        <FormSuccess message="Password reset link has been sent to your email" />

                        <div className="space-y-4">
                            <p className="text-center text-sm text-slate-600">
                                Didn't receive the email?{' '}
                                <button
                                    type="button"
                                    className="font-semibold text-brand-600 transition hover:text-brand-700"
                                    onClick={() => {
                                        setSuccess(false);
                                        setEmail('');
                                    }}
                                >
                                    Try again
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
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

                        <SubmitButton label="Send reset link" loading={loading} />

                        <p className="text-center text-sm text-slate-600">
                            Remember your password?{' '}
                            <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                                Sign in
                            </Link>
                        </p>
                    </form>
                )}
            </AuthCard>
        </AuthLayout>
    );
}