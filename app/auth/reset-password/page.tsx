import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { ShieldCheck } from "lucide-react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";


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
                <span className="text-sm text-slate-700">Enter your new password</span>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-brand-600 font-semibold">→</span>
                <span className="text-sm text-slate-700">Confirm your new password</span>
            </div>
        </div>
    </div>
);

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { token, email } = await searchParams;
  return (
    <AuthLayout brandingContent={brandingContent}>
      <AuthCard title="Reset your password" description="Enter your new password and confirm it to reset your password">
        <ResetPasswordForm email={email} token={token} />
      </AuthCard>
    </AuthLayout>
  )
}
