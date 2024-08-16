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
  const { sessionId, wallet } = await request.json();

  if (!sessionId || !wallet) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  if (!global.sessions[sessionId]) {
    global.sessions[sessionId] = {
      activeWallet: wallet,
      connectedWallets: [wallet],
      timestamp: Date.now(),
    };
  } else {
    if (!global.sessions[sessionId].connectedWallets.includes(wallet)) {
      global.sessions[sessionId].connectedWallets.push(wallet);
    }
    global.sessions[sessionId].timestamp = Date.now();
  }

  return NextResponse.json({ success: true });
}
