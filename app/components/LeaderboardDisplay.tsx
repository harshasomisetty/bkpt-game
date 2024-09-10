'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

interface LeaderboardEntry {
  name: string;
  userId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export default function LeaderboardDisplay() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/get-leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data.data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  const userRank =
    leaderboard.findIndex((entry) => entry.userId === user?.userId) + 1;

  return (
    <div className="text-black">
      {userRank > 0 && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p className="font-bold">Congratulations!</p>
          <p>You&apos;re ranked #{userRank} on the leaderboard!</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-100">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">UserId</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr
              key={entry.userId}
              className={`${
                entry.userId === user?.userId
                  ? 'bg-yellow-200'
                  : index % 2 === 0
                  ? 'bg-white'
                  : 'bg-gray-50'
              }`}
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{entry.userId}</td>
              <td className="p-2 border">{entry.name}</td>
              <td className="p-2 border">{entry.score}</td>
              <td className="p-2 border">
                {new Date(entry.createdAt).toLocaleString()}
              </td>
              <td className="p-2 border">
                {new Date(entry.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
