'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });

      if (error) {
        setError(error.message || 'Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 bg-[#111115] border border-neutral-800 rounded-3xl shadow-2xl space-y-6">
        
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Welcome Back</h1>
          <p className="text-xs text-neutral-400">Sign in to your HireLoop account to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300">Email Address</label>
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

          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300">Password</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus-within:border-indigo-500 transition">
              <Lock className="w-4 h-4 text-neutral-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-neutral-400">
          {`Don't`} have an account?{' '}
          <Link href="/register" className="text-indigo-400 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}