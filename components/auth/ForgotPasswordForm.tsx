'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { InputField } from '@/components/auth/InputField';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormSuccess } from '@/components/auth/FormSuccess';
import { FormError } from '@/components/auth/FormError';
import { ApiError } from '@/types/apiTypes';
import api from '@/lib/api';

export default function ForgotPasswordForm() {
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
        try{
            await api.post('/auth/forgot-password', { email });
            setSuccess(true);
        }
        catch(error){
            if(error instanceof Error){
                setError("An error occurred while sending reset link. Please try again.");
            }
            else{
                const err = error as ApiError;
                setError(err.message);
            }
        }
        finally{
            setLoading(false);
        }
    };
    return (
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
                        name='email'
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
    )
}
