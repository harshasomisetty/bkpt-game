'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function Connect({ params }: { params: { id: string } }) {
  const { id } = params;
  const { connected, publicKey } = useWallet();
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (connected && publicKey) {
      const newWallet = publicKey.toBase58();
      fetch('/api/connect-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: id, wallet: newWallet }),
      })
        .then((response) => response.json())
        .then(() => fetchSessionData())
        .catch((error) => console.error('Error:', error));
    }
  }, [connected, publicKey, id]);

  const fetchSessionData = () => {
    fetch(`/api/check-session/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setConnectedWallets(data.connectedWallets || []);
        setActiveWallet(data.activeWallet);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-purple-800">
          Connect Your Wallet
        </h1>

        <form onSubmit={handleEmailSubmit} className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mb-4"
          >
            Submit Email
          </button>
        </form>

        <WalletMultiButton className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mb-6" />

        {connectedWallets.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4 text-purple-800">
              Connected Wallets
            </h2>
            {connectedWallets.map((wallet) => (
              <div key={wallet} className="mb-2 p-2 bg-purple-100 rounded-md">
                <span className="font-medium">
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </span>
                {wallet === activeWallet && (
                  <span className="ml-4 text-green-500 font-bold">
                    (Active)
                  </span>
                )}
              </div>
            ))}
          </div>
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
