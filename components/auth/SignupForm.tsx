'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InputField } from '@/components/auth/InputField';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FormError } from '@/components/auth/FormError';
import { validatePassword } from '@/lib/validations';
import api from '@/lib/api';

export default function SignupForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    }
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, and a number');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simulate API call
        setLoading(true);
        try{
            await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            router.push('/auth/login?registered=true');
        }
        catch(error: unknown){
            if(typeof error === 'string'){
                setError(error);
            }
            else{
                setError('Registration failed. Please try again.');
            }
        }

        setLoading(false);

    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error ? <FormError message={error} /> : null}

            <InputField
                name="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="name"
            />

            <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="email"
            />

            <PasswordInput
                name="password"
                label="Password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="new-password"
            />

            <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
                autoComplete="new-password"
            />

            <div className="flex items-start gap-2.5">
                <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 bg-white transition duration-200 cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
                    disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-slate-700 flex-1">
                    I agree to the{' '}
                    <Link href="#" className="font-medium text-brand-600 hover:text-brand-700 transition">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="font-medium text-brand-600 hover:text-brand-700 transition">
                        Privacy Policy
                    </Link>
                </label>
            </div>

            <SubmitButton label="Create account" loading={loading} />

            <p className="text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
                    Sign in
                </Link>
            </p>
        </form>
    )
}
