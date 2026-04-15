'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import { FormSuccess } from '@/components/auth/FormSuccess';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { SubmitButton } from '@/components/auth/SubmitButton';

type VerificationState = 'verifying' | 'success' | 'error';

export default function VerifyEmailPage() {
    const [state, setState] = useState<VerificationState>('verifying');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate email verification process
        const timer = setTimeout(() => {
            // Simulate success (you can change this to 'error' to test error state)
            setState('success');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleResendEmail = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, you would resend the verification email
            console.log('Verification email resent');
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
                    <span className="text-sm text-slate-700">Secure email verification</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Activate your account</span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="text-brand-600 font-semibold">→</span>
                    <span className="text-sm text-slate-700">Start preparing smarter</span>
                </div>
            </div>
        </div>
    );

    const getContent = () => {
        switch (state) {
            case 'verifying':
                return (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                                <LoadingSpinner size="lg" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-slate-900">Verifying your email...</h3>
                                <p className="mt-2 text-sm text-slate-600">Please wait while we verify your email address</p>
                            </div>
                        </div>
                    </div>
                );

            case 'success':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-slate-900">Email verified successfully</h3>
                                <p className="text-sm text-slate-600">Your email has been successfully verified. You can now access your account.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SubmitButton
                                label="Continue to login"
                                onClick={() => window.location.href = '/login'}
                            />

                            <p className="text-center text-sm text-slate-600">
                                <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                                    Back to sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                );

            case 'error':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-slate-900">Verification failed</h3>
                                <p className="text-sm text-slate-600">The verification link has expired or is invalid. Please request a new verification email.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SubmitButton label="Resend verification email" loading={loading} onClick={handleResendEmail} />

                            <p className="text-center text-sm text-slate-600">
                                <Link href="/auth/signup" className="font-semibold text-brand-600 transition hover:text-brand-700">
                                    Back to sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AuthLayout brandingContent={brandingContent}>
            <AuthCard title="Verify your email" description="Confirm your email address to complete your account setup">
                {getContent()}
            </AuthCard>
        </AuthLayout>
    );
}