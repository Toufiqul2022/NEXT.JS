'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useAuth } from './auth/AuthProvider';

export default function Navbar() {
  const { authed, email, status } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-900 dark:bg-white" />
          <span>Mini Store</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
            Home
          </Link>
          <Link href="/items" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
            Items
          </Link>

          {status === 'loading' ? null : authed ? (
            <>
              <Link href="/dashboard" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/items/new" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
                Add Item
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white">
                Register
              </Link>
            </>
          )}

          {authed ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-zinc-500 md:inline">{email}</span>
              <LogoutButton />
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
