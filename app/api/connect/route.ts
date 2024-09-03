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

  console.log('here 1');
  if (!sessionId || !wallet || !email) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  console.log('here 2');
  console.log('body', JSON.stringify({ sessionId, wallet, email }));

  console.log('here 3', `${process.env.BACKEND_URL}/v1/auth/registerOrLogin`);
  const response = await fetch(
    `${process.env.BACKEND_URL}/v1/auth/wallet-login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, wallet, email }),
    },
  );

  console.log('here 4');
  // if (!global.sessions[sessionId]) {
  //   global.sessions[sessionId] = {
  //     activeWallet: wallet,
  //     connectedWallets: [wallet],
  //     timestamp: Date.now(),
  //   };
  // } else {
  //   if (!global.sessions[sessionId].connectedWallets.includes(wallet)) {
  //     global.sessions[sessionId].connectedWallets.push(wallet);
  //   }
  //   global.sessions[sessionId].timestamp = Date.now();
  // }

  return NextResponse.json({ success: true });
}
