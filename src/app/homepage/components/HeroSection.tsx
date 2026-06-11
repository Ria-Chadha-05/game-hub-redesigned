'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating orbs
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 60 + Math.random() * 120,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.04 + Math.random() * 0.06,
      hue: i % 2 === 0 ? 24 : 220,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue},90%,60%,${o.opacity})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Animated canvas bg */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#050505_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm mb-8 animate-slide-up opacity-0"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">4 Games Available — Free Forever</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-6 animate-slide-up opacity-0"
          style={{ animationDelay: '0.25s' }}
        >
          Play.
          <br />
          <span className="text-shimmer">Win.</span>
          <br />
          Repeat.
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 font-light leading-relaxed animate-slide-up opacity-0"
          style={{ animationDelay: '0.4s' }}
        >
          A premium gaming experience built for the browser.
          No installs. No accounts. Just pure play.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up opacity-0"
          style={{ animationDelay: '0.55s' }}
        >
          <Link
            href="#games"
            className="group relative px-8 py-4 bg-orange-500 text-white rounded-2xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Playing
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="#games"
            className="px-8 py-4 border border-white/10 text-white/70 hover:text-white hover:border-white/20 rounded-2xl font-medium text-sm transition-all duration-300 hover:bg-white/5"
          >
            Browse Games
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-slide-up opacity-0"
          style={{ animationDelay: '0.7s' }}
        >
          {[
            { value: '4',    label: 'Classic Games',   sub: 'hand-crafted' },
            { value: '100%', label: 'Free to Play',    sub: 'always' },
            { value: '0',    label: 'Downloads',       sub: 'needed' },
          ].map(({ value, label, sub }) => (
            <div key={label} className="text-center p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="font-display text-3xl font-bold text-orange-400 mb-1">{value}</div>
              <div className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</div>
              <div className="text-[10px] text-white/25 font-mono mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
