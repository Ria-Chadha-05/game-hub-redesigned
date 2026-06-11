'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  description: string;
  href: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  emoji: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  tag: string;
}

const games: Game[] = [
  {
    id: 'game_ttt',
    title: 'Tic Tac Toe',
    description: 'Classic 3×3 strategy showdown. Outwit your opponent in this timeless duel of Xs and Os.',
    href: '/tic-tac-toe',
    difficulty: 'Easy',
    emoji: '✕',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.3)',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    tag: '2 Players',
  },
  {
    id: 'game_snake',
    title: 'Snake',
    description: 'Guide the snake, eat the food, grow longer. Avoid walls and yourself in this arcade classic.',
    href: '/snake-game',
    difficulty: 'Medium',
    emoji: '◎',
    accentColor: '#22c55e',
    glowColor: 'rgba(34,197,94,0.3)',
    bgGradient: 'from-green-500/10 to-green-600/5',
    tag: 'High Score',
  },
  {
    id: 'game_whack',
    title: 'Whack-A-Mole',
    description: 'Test your reflexes. Click the moles before they vanish — every millisecond counts.',
    href: '/whack-a-mole',
    difficulty: 'Medium',
    emoji: '⚡',
    accentColor: '#f97316',
    glowColor: 'rgba(249,115,22,0.3)',
    bgGradient: 'from-orange-500/10 to-orange-600/5',
    tag: 'Timed',
  },
  {
    id: 'game_memory',
    title: 'Memory Cards',
    description: 'Flip, match, remember. Challenge your mind in this brain-training card matching game.',
    href: '/memory-cards',
    difficulty: 'Hard',
    emoji: '◈',
    accentColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.3)',
    bgGradient: 'from-purple-500/10 to-purple-600/5',
    tag: 'Brain Game',
  },
];

const difficultyBadge: Record<string, string> = {
  Easy:   'text-green-400 bg-green-400/10 border-green-400/20',
  Medium: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  Hard:   'text-red-400 bg-red-400/10 border-red-400/20',
};

const GameGrid = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cardsRef.current.forEach(card => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="games" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
            <span className="text-[10px] font-mono text-orange-400 tracking-widest uppercase">Select Your Game</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Choose Your
            <span className="text-shimmer"> Battle</span>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Four legendary games, reborn for the modern browser.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {games.map((game, i) => (
            <Link key={game.id} href={game.href}>
              <div
                ref={el => { cardsRef.current[i] = el; }}
                className="spotlight-card group relative p-8 bg-[#0c0c0c] rounded-3xl border border-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${game.accentColor}, transparent)` }}
                />

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${game.accentColor}18`, border: `1px solid ${game.accentColor}30`, color: game.accentColor, boxShadow: `0 0 20px ${game.glowColor}` }}
                    >
                      {game.emoji}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${difficultyBadge[game.difficulty]}`}>
                        {game.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider">{game.tag}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {game.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: game.accentColor }}>
                      <span>Play Now</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-xl border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2"
                      style={{ background: `${game.accentColor}15` }}>
                      <svg className="w-4 h-4" fill="none" stroke={game.accentColor} strokeWidth="2" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" fill={game.accentColor} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom feature strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '⚡', label: 'Instant Play',    desc: 'No load time' },
            { icon: '🏆', label: 'High Scores',     desc: 'Local tracking' },
            { icon: '📱', label: 'Mobile Ready',    desc: 'Touch optimized' },
            { icon: '🎨', label: 'Premium Design',  desc: 'Crafted with care' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="text-sm font-medium text-white">{label}</div>
                <div className="text-xs text-white/30">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;
