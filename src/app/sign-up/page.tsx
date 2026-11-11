'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  BriefcaseBusiness,
  Building2,
  Check,
} from 'lucide-react';

import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'jobSeeker' | 'employer'>('jobSeeker');

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: '/dashboard',
      });

      if (error) {
        setError(error.message || 'Registration failed');
        return;
      }

      router.push('/dashboard');
      router.refresh();

    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-4 py-12">

      <div className="max-w-md w-full p-8 bg-[#111115] border border-neutral-800 rounded-3xl shadow-2xl space-y-6">

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight font-serif">
            Create an Account
          </h1>

          <p className="text-xs text-neutral-400">
            Join HireLoop to discover top career opportunities
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300">
              Full Name
            </label>

            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus-within:border-indigo-500 transition">
              <User className="w-4 h-4 text-neutral-500" />

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus-within:border-indigo-500 transition">
              <Mail className="w-4 h-4 text-neutral-500" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300">
              Password
            </label>

            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus-within:border-indigo-500 transition">
              <Lock className="w-4 h-4 text-neutral-500" />

              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
              />
            </div>
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300">
              Choose Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Job Seeker */}
              <button
                type="button"
                onClick={() => setRole('jobSeeker')}
                className={`relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition ${
                  role === 'jobSeeker'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
              >
                <BriefcaseBusiness
                  className={`w-6 h-6 ${
                    role === 'jobSeeker'
                      ? 'text-indigo-400'
                      : 'text-neutral-500'
                  }`}
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Job Seeker
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Find and apply for jobs
                  </p>
                </div>

                {role === 'jobSeeker' && (
                  <Check className="absolute right-3 top-3 w-4 h-4 text-indigo-400" />
                )}
              </button>

              {/* Employer */}
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition ${
                  role === 'employer'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}
              >
                <Building2
                  className={`w-6 h-6 ${
                    role === 'employer'
                      ? 'text-indigo-400'
                      : 'text-neutral-500'
                  }`}
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Employer
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Hire and manage talent
                  </p>
                </div>

                {role === 'employer' && (
                  <Check className="absolute right-3 top-3 w-4 h-4 text-indigo-400" />
                )}
              </button>

            </div>

            <p className="text-xs text-neutral-500">
              {role === 'jobSeeker'
                ? 'You will get a Job Seeker dashboard.'
                : 'You will get an Employer dashboard. Company verification may be required.'}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-indigo-400 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
