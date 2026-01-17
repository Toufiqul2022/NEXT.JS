'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/toast/ToastProvider';
import { useAuth } from '@/components/auth/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const { toast } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password });
      if (!result.ok) {
        toast(result.error || 'Login failed', { variant: 'error' });
        return;
      }

      toast('Logged in successfully');
      // Navbar updates instantly (AuthProvider state), no refresh needed
      router.push(next ? next : '/items');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        This demo uses credentials stored in HTTP-only cookies.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <div className="rounded-xl border border-dashed border-zinc-200 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          <div><span className="font-semibold">Mock credentials:</span> admin@example.com / 123456</div>
          {next ? <div className="mt-1">After login you will be redirected to: <span className="font-mono">{next}</span></div> : null}
          <div className="mt-2">
            New here? <a className="underline" href="/register">Create an account</a>
          </div>
        </div>
      </form>
    </div>
  );
}
