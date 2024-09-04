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
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col mb-6 border">
          <Image
            src="/red-runner.svg"
            className="border border-black"
            alt="Red Runner"
            width={200}
            height={80}
          />
          <Image
            src="/gameshift-edition.svg"
            alt="Gameshift Edition"
            width={150}
            height={30}
            className="mt-2"
          />
        </div>

        <h1 className="text-2xl text-[#7C3AED] font-bold mb-6 text-center">
          PLEASE CONNECT
          <br />
          YOUR WALLET
        </h1>

        <div className="mb-4">
          <WalletMultiButton className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300" />
        </div>

        {connected && (
          <form onSubmit={handleLogin} className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 disabled:bg-gray-100 disabled:text-gray-400"
              disabled={isLoading || !email}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Powered by <span className="font-semibold">Gameshift</span>
          </p>
        </div>
      </div>
    </div>
  );
}
