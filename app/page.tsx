'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

export default function GameshiftDemo() {
  const [qrValue, setQrValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  const generateQR = () => {
    const newSessionId = Math.random().toString(36).substring(7);
    setSessionId(newSessionId);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/${newSessionId}`;
    setQrValue(url);
  };

  useEffect(() => {
    generateQR();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-purple-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96">
        <div className="mb-8">
          {/* <img
            src="/api/placeholder/300/80"
            alt="Gameshift Logo"
            className="w-full"
          /> */}
          <p className="text-sm text-gray-600 mt-2">BY SOLANA LABS</p>
        </div>

        {qrValue && (
          <div className="mb-6 bg-purple-100 p-4 rounded-xl">
            <QRCode value={qrValue} size={200} />
          </div>
        )}

        <button
          onClick={generateQR}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center w-full"
        >
          Generate New QR Code
        </button>

        <div className="mt-6 text-sm text-gray-600">
          Scan the QR code to connect your wallet
        </div>
      </div>
    </div>
  );
}
