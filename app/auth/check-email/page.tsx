'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, RefreshCw } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { SubmitButton } from '@/components/auth/SubmitButton';

export default function CheckEmailPage() {
    const [loading, setLoading] = useState(false);

    const handleResendEmail = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, you would resend the email
            console.log('Email resent');
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
                    <span className="text-sm text-slate-700">Check your inbox</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Don't forget spam folder</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Link expires in 24 hours</span>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout brandingContent={brandingContent}>
            <AuthCard title="Check your email" description="We've sent you a password reset link">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                            <Mail className="h-8 w-8 text-brand-600" />
                        </div>
                        <div className="text-center space-y-4 max-w-sm">
                            <div className="space-y-3">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    We've sent a password reset link to your email address. Click the link in the email to reset your password.
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    If you don't see the email in your inbox, please check your spam or junk folder.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <SubmitButton label="Resend email" loading={loading} onClick={handleResendEmail} />

                        <div className="text-center">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                                onClick={() => window.location.href = '/forgot-password'}
                            >
                                <RefreshCw className="h-4 w-4" />
                                Change email address
                            </button>
                        </div>
                    </div>

                    <div className="text-center space-y-2 pt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                            Didn't receive the email? Check your spam folder or try resending.
                        </p>
                        <p className="text-xs text-slate-500">
                            The reset link will expire in 24 hours for security reasons.
                        </p>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                        Remember your password?{' '}
                        <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}