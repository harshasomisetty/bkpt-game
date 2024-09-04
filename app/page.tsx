'use client';

export default function GameshiftDemo() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/80 to-purple-900/80 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background.png")' }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96">
        <div className="mb-8">
          <p className="text-sm text-gray-600 mt-2">BY SOLANA LABS</p>
        </div>
      </div>
    </div>
  );
}
