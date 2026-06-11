import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

interface GamePageLayoutProps {
  children: React.ReactNode;
  accentColor?: string;
}

const GamePageLayout = ({ children, accentColor = '#f97316' }: GamePageLayoutProps) => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Global ambient bg */}
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-8 pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accentColor}22, transparent 70%)` }}
      />
    </div>

    <Header />

    {/* Back button */}
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-2">
      <Link
        href="/homepage"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Games
      </Link>
    </div>

    <main className="max-w-4xl mx-auto px-6 py-8 pb-20">
      {children}
    </main>

    <Footer />
  </div>
);

export default GamePageLayout;
