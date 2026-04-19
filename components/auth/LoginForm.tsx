'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { InputField } from '@/components/auth/InputField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormError } from '@/components/auth/FormError';
import { FormSuccess } from './FormSuccess';
import api from '@/lib/api';
type Props = {
    searchParams?: {
        registered?: boolean;
        sessionExpired?: boolean;
    };
};
export default function LoginForm({searchParams}: Props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams?.registered) {
            setSuccess('Registration successful! Please log in.');

            setTimeout(() => {
                setSuccess('');
            }, 5000);
        }
        else if(searchParams?.sessionExpired){
            setError('Your session has expired. Please log in again.');
            setTimeout(() => {
                setError('');
            }, 5000);
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
            const res = await api.post('/auth/login', {email: formData.email, password: formData.password});
            if(!res.data?.accessToken){
                throw new Error('Invalid response from server');
            }
            localStorage.setItem('accessToken', res.data.accessToken);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        }
        catch(error:unknown){
            if(typeof error === 'string'){
                setError(error);
            }
            else{
                setError('Login failed. Please check your credentials and try again.');
            }
        }
        finally{
            setLoading(false);
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
