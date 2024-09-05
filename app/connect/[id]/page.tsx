'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { useState } from 'react';

export default function Connect({ params }: { params: { id: string } }) {
  const { id } = params;
  const { connected, publicKey } = useWallet();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !email) {
      console.error('Wallet not connected or email not provided');
      return;
    }

    setIsLoading(true);
    const newWallet = publicKey.toBase58();

    try {
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: id, wallet: newWallet, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect wallet');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login (e.g., redirect or update UI)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10">
      <div className="flex flex-col items-center mb-6">
        <Image src="/red-runner.svg" alt="Red Runner" width={200} height={80} />
        <Image
          src="/gameshift-edition.svg"
          alt="Gameshift Edition"
          width={150}
          height={30}
          className="mt-2"
        />
      </div>
      <h1 className="text-2xl text-[#7C3AED] font-integral font-bold mb-6 text-center uppercase">
        Please Connect Your Wallet
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center space-y-4 w-full max-w-sm p-4"
      >
        <WalletMultiButton className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          placeholder="Enter your email"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed"
          disabled={isLoading || !email || !connected}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
