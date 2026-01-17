'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/toast/ToastProvider';
import { useAuth } from './auth/AuthProvider';

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();
  const { logout } = useAuth();

  async function onLogout() {
    const result = await logout();
    if (!result.ok) {
      toast(result.error || 'Logout failed', { variant: 'error' });
      return;
    }
    toast('Logged out');
    // Navbar updates instantly because AuthProvider state changes (no refresh needed)
    router.push('/');
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      Logout
    </button>
  );
}
