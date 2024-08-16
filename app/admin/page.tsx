'use client';

import { useEffect, useState } from 'react';

type SessionData = {
  activeWallet: string;
  connectedWallets: string[];
  timestamp: number;
};

export default function AdminPage() {
  const [sessions, setSessions] = useState<Record<string, SessionData>>({});

  const fetchAllSessions = async () => {
    try {
      const response = await fetch('/api/admin/get-all-sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
      } else {
        console.error('Failed to fetch sessions');
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
    const intervalId = setInterval(fetchAllSessions, 5000); // Refresh every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <button
        onClick={fetchAllSessions}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Refresh Data
      </button>
      {Object.entries(sessions).map(([sessionId, data]) => (
        <div key={sessionId} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-bold">Session ID: {sessionId}</h2>
          <p className="font-semibold">Active Wallet: {data.activeWallet}</p>
          <p>Last Updated: {new Date(data.timestamp).toLocaleString()}</p>
          <h3 className="font-semibold mt-2">Connected Wallets:</h3>
          <ul className="list-disc pl-5">
            {data.connectedWallets.map((wallet) => (
              <li key={wallet}>
                {wallet} {wallet === data.activeWallet && '(Active)'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
