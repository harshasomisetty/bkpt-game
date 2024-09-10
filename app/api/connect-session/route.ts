import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  const cookieStore = cookies();

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  // Get the token from the cookie
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'User not authenticated' },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/v1/auth/wallet-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      },
    );

    const data = await response.json();

    console.log('Wallet login response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Failed to connect session' },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error connecting session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect session' },
      { status: 500 },
    );
  }
}
