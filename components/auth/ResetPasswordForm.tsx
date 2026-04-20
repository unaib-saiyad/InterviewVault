'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import { PasswordInput } from "./PasswordInput";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { ApiError } from "@/types/apiTypes";
import api from "@/lib/api";

export default function ResetPasswordForm({ email, token }: { email: string | string[] | undefined, token: string | string[] | undefined }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setError("Invalid password reset link. Please request a new password reset email.");
    }
  }, [email, token]);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/reset-password', {
        email,
        token,
        password: formData.password,
      });
      setSuccess("Your password has been reset successfully. You can now log in with your new password.");
    }
    catch (error) {
      if (error instanceof Error) {
        setError("An error occurred while resetting password. Please try again.");
      }
      else {
        const err = error as ApiError;
        if (err.code === 'VALIDATION_FAILED') {
          setError("Password must be 8 letters long, must contain one small, one capital, a number and try again.");
          return;
        }
        setError(err.message);
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>{success ? (
      <div className="flex flex-col gap-8">
        <FormSuccess message={success} />

        <div className="space-y-4">
          <p className="text-center text-sm text-slate-600">
            Do you want to login?{' '}
            <Link
              href="/auth/login"
              className="font-semibold text-brand-600 transition hover:text-brand-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    ) :
      (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error ? <FormError message={error} /> : null}

          <PasswordInput
            name='password'
            label="New Password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
          />

          <PasswordInput
            name='confirmPassword'
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            disabled={loading}
          />

          <SubmitButton label="Reset Password" loading={loading} />
          {error ?
            <p className="text-center text-sm text-slate-600">
              Try again?{' '}
              <Link href="/auth/forgot-password" className="font-semibold text-brand-600 transition hover:text-brand-700">
                Forgot Password
              </Link>
            </p>
            : null}
          {!error ?
            <p className="text-center text-sm text-slate-600">
              Back to login?{' '}
              <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                Login
              </Link>
            </p>
            : null}
        </form>
      )
    }</>
  )
}
