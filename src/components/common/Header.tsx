'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { id: 'nav_home',    label: 'Home',         href: '/homepage' },
  { id: 'nav_ttt',    label: 'Tic Tac Toe',  href: '/tic-tac-toe' },
  { id: 'nav_snake',  label: 'Snake',         href: '/snake-game' },
  { id: 'nav_whack',  label: 'Whack-A-Mole', href: '/whack-a-mole' },
  { id: 'nav_memory', label: 'Memory',        href: '/memory-cards' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_1px_0_rgba(249,115,22,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-orange-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="font-display text-lg font-700 text-white tracking-tight leading-none block">Game Hub</span>
              <span className="text-[10px] font-mono text-orange-500 tracking-widest uppercase">Premium</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#games"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-105"
            >
              Play Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="px-6 pb-6 border-t border-white/5 bg-black/90 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
