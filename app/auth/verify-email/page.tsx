
import { ShieldCheck } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import VerifyEmail from '@/components/auth/VerifyEmail';


export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const { token, email } = await searchParams;

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

    return (
        <AuthLayout brandingContent={brandingContent}>
            <AuthCard title="Verify your email" description="Confirm your email address to complete your account setup">
                <VerifyEmail token={typeof token === 'string' ? token : ''} email={typeof email === 'string' ? email : ''} />
            </AuthCard>
        </AuthLayout>
    );
}