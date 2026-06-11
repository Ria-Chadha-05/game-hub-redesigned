import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from './components/HeroSection';
import GameGrid from './components/GameGrid';

export const metadata: Metadata = {
  title: 'Game Hub — Premium Browser Gaming',
  description: 'Play Tic Tac Toe, Snake, Whack-A-Mole, and Memory Cards instantly in your browser. No downloads required.',
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>
      <Header />
      <main>
        <HeroSection />
        <GameGrid />
      </main>
      <Footer />
    </div>
  );
}
