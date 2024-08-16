'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [qrValue, setQrValue] = useState('');
  const { publicKey } = useWallet();

  const generateQR = () => {
    const uniqueId = uuidv4();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/${uniqueId}`;
    setQrValue(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">GameShift Demo</h1>
        <WalletMultiButton />
        {publicKey && (
          <button
            onClick={generateQR}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Generate QR Code
          </button>
        )}
        {qrValue && (
          <div className="mt-4">
            <QRCode value={qrValue} />
          </div>
        )}
      </main>
    </div>
  );
}
