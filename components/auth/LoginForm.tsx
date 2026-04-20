'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { InputField } from '@/components/auth/InputField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormError } from '@/components/auth/FormError';
import { FormSuccess } from './FormSuccess';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';
import { useRouter} from 'next/navigation';

type Props = {
    searchParams?: {
        registered?: boolean;
        sessionExpired?: boolean;
        loggedOut?: boolean;
    };
};
export default function LoginForm({searchParams}: Props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams?.registered) {
            setSuccess('A verification email has been sent to your inbox. Please verify your email before logging in.');
        }
        else if(searchParams?.sessionExpired){
            setError('Your session has expired. Please log in again.');
        }
        else if(searchParams?.loggedOut){
            setSuccess('You have been logged out successfully.');
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // Simulate API call
        setLoading(true);
        try{
            const res = await api.post('/auth/login', {email: formData.email, password: formData.password, rememberMe: formData.rememberMe});
            if(!res.data?.accessToken){
                throw new Error('Invalid response from server');
            }
            localStorage.setItem('accessToken', res.data.accessToken);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }
        catch(error){
            if(error instanceof Error){
                setError('Login failed. Please check your credentials and try again.');
            }
            else{
                const err = error as ApiError
                if(err.code==="EMAIL_NOT_VARIFIED"){
                    await handleResendEmail();
                    setError('Your email is not verified. Please check your inbox for the verification email.');
                }
                else{
                    setError(err.message|| 'Login failed. Please check your credentials and try again.');
                }
            }
        }
        finally{
            setLoading(false);
        }

    };

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            await api.post('/auth/resend-verification-email', { email: formData.email });
        }
        catch (error) {
            if(error instanceof Error){
                setError('Something went wrong while resending verification email. Please try again later.');
            }
            else{
                const err = error as ApiError;
                setError(err.message || 'Something went wrong while resending verification email. Please try again later.');
            }
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error ? <FormError message={error} /> : null}
            {success ? <FormSuccess message={success} /> : null}
            {}
            <InputField
                name='email'
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="email"
            />

            <PasswordInput
                name='password'
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-sm space-x-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-300 text-brand-600 bg-white transition duration-200 cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
                    />
                    <span className="text-slate-700 font-medium">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-brand-600 font-medium transition hover:text-brand-700">
                    Forgot password?
                </Link>
            </div>

            <SubmitButton label="Sign in" loading={loading} />

            <p className="text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-brand-600 transition hover:text-brand-700">
                    Sign up
                </Link>
            </p>
        </form>
    )
}
