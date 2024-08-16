'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';

export default function Connect({ params }: { params: { id: string } }) {
  const { id } = params;
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      // Here you would typically:
      // 1. Send the publicKey and id to your backend
      // 2. Register the user
      // 3. Redirect to a "Connection Successful" page
      console.log('Connected with wallet:', publicKey.toBase58());
      console.log('Session ID:', id);
    }
  }, [connected, publicKey, id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-4">Connect Your Wallet</h1>
        <WalletMultiButton />
      </main>
    </div>
  );
}
