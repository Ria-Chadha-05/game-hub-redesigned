import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  title: 'Game Hub — Play Classic Browser Games',
  description: 'Premium browser gaming experience. Play Tic Tac Toe, Snake, Whack A Mole, and Memory Cards instantly.',
  icons: { icon: [{ url: '/favicon.ico', type: 'image/x-icon' }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
