import { NextResponse } from 'next/server';

export async function GET() {
  // In a real-world scenario, you might want to add authentication here
  return NextResponse.json({ sessions: global.sessions || {} });
}
