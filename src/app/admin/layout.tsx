import React from 'react';
import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dentpol Admin Paneli',
  description: 'Dentpol İçerik Yönetim Sistemi',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
