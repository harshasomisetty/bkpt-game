'use client';

import { useUser } from '@/app/hooks/useUser';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = '' }: LogoutButtonProps) {
  const { logout } = useUser();
  const { disconnect } = useWallet();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await disconnect();
      //   await fetch('/api/logout', { method: 'POST' });
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ${className}`}
    >
      Logout
    </button>
  );
}
