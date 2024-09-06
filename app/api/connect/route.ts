import { NextResponse } from 'next/server';

declare global {
  var sessions: {
    [key: string]: {
      activeWallet: string;
      connectedWallets: string[];
      timestamp: number;
    };
  };
}

if (!global.sessions) {
  global.sessions = {};
}

export async function POST(request: Request) {
  const { sessionId, wallet, email } = await request.json();

  if (!sessionId || !wallet || !email) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  console.log('body', JSON.stringify({ sessionId, wallet, email }));

  const response = await fetch(
    `${process.env.BACKEND_URL}/v1/auth/wallet-login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, wallet, email }),
    },
  );

  return NextResponse.json({ success: true });
}
