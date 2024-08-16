import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const sessionId = params.id;

  if (global.sessions[sessionId]) {
    return NextResponse.json({
      activeWallet: global.sessions[sessionId].activeWallet,
      connectedWallets: global.sessions[sessionId].connectedWallets,
      timestamp: global.sessions[sessionId].timestamp,
    });
  } else {
    return NextResponse.json({
      activeWallet: null,
      connectedWallets: [],
      timestamp: null,
    });
  }
}
