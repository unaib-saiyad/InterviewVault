import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  brandingContent?: ReactNode;
};

export function AuthLayout({ children, brandingContent }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2 lg:gap-0">
      {/* Branding Section - Hidden on Mobile */}
      {brandingContent ? (
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-12 xl:py-16">
          {brandingContent}
        </div>
      ) : null}

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-0 min-h-screen lg:min-h-auto">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
