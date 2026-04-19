'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormSuccess } from '@/components/auth/FormSuccess';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '@/lib/api';
import axios from 'axios';

type VerificationState = 'verifying' | 'success' | 'error' | 'resended' | 'resendError';

export default function VerifyEmail({ token, email }: { token: string; email: string }) {
    const [state, setState] = useState<VerificationState>('verifying');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await api.get(`/auth/verify-email?token=${token}`);
                if (response.status === 200) {
                    setState('success');
                } else {
                    setState('error');
                }
            } catch (error) {
                setState('error');
            }
            setLoading(false);
        };

        verifyEmail();
    }, [token]);

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/resend-verification-email', { email: email });
            if (response.status === 200) {
                setState('resended');
            }
            else {
                setState('resendError');
            }
        }
        catch (error) {
            if(axios.isAxiosError(error)){
                setErrorMessage(error.message|| 'Login failed. Please check your credentials and try again.');
            }
            else{
                setErrorMessage('');
            }
            setState('resendError');
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

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
                                onClick={() => window.location.href = '/auth/login'}
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

            case 'resended':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-slate-900">Email sent successfully</h3>
                                <p className="text-sm text-slate-600">We've sent a new verification email to your inbox.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SubmitButton
                                label="Continue to login"
                                onClick={() => window.location.href = '/auth/login'}
                            />

                            <p className="text-center text-sm text-slate-600">
                                <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                                    Back to sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                );
            case 'resendError':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-semibold text-slate-900">Verification failed</h3>
                                <p className="text-sm text-slate-600">{errorMessage || "There was an error sending the verification email. Please try again later or contact support."}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SubmitButton label="Resend verification email" loading={loading} onClick={handleResendEmail} />

                            <p className="text-center text-sm text-slate-600">
                                <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                                    Back to login
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
        <>
            {getContent()}
        </>
    )
}
