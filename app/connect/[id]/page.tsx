'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function Connect({ params }: { params: { id: string } }) {
  const { id } = params;
  const { connected, publicKey } = useWallet();
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <h1 className="text-4xl font-bold mb-8">Connect Your Wallet</h1>
      <WalletMultiButton className="mb-8" />
      {connectedWallets.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Connected Wallets</h2>
          {connectedWallets.map((wallet) => (
            <div key={wallet} className="mb-2">
              <span>
                {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </span>
              {wallet === activeWallet && (
                <span className="ml-4 text-green-500">(Active)</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
