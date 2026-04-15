import type { ReactNode } from 'react';

type AuthCardProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-10 lg:p-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {description ? <p className="text-sm text-slate-600 sm:text-base">{description}</p> : null}
        </div>

        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </div>
  );
}
