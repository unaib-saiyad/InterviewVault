'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
};

export function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-slate-900">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            error
              ? 'border-red-300 bg-red-50/40 text-slate-900 placeholder:text-red-300/60 focus-visible:border-red-400 focus-visible:ring-red-300 focus-visible:ring-offset-red-50'
              : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-brand-300 focus-visible:ring-brand-300 focus-visible:ring-offset-white'
          } disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-200`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 transition duration-200 hover:text-slate-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="text-xs font-medium text-red-600 mt-1">{error}</p> : null}
    </div>
  );
}
