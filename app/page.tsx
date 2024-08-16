'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

export default function Home() {
  const [qrValue, setQrValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  const generateQR = () => {
    const newSessionId = Math.random().toString(36).substring(7);
    setSessionId(newSessionId);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/${newSessionId}`;
    setQrValue(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">GameShift Demo</h1>
      <button
        onClick={generateQR}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Generate QR Code
      </button>
      {qrValue && (
        <div className="mt-4 mb-4">
          <QRCode value={qrValue} size={256} />
        </div>
      )}
    </div>
  );
}
