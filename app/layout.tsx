'use client';
import ClientWalletProvider from './components/ClientWalletProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[url('/background.png')] bg-cover bg-center bg-no-repeat min-h-screen">
        <ClientWalletProvider>{children}</ClientWalletProvider>
      </body>
    </html>
  );
}
