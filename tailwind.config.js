/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: { DEFAULT: 'var(--color-card)', foreground: 'var(--color-card-foreground)' },
        popover: { DEFAULT: 'var(--color-popover)', foreground: 'var(--color-popover-foreground)' },
        primary: { DEFAULT: 'var(--color-primary)', foreground: 'var(--color-primary-foreground)' },
        secondary: { DEFAULT: 'var(--color-secondary)', foreground: 'var(--color-secondary-foreground)' },
        muted: { DEFAULT: 'var(--color-muted)', foreground: 'var(--color-muted-foreground)' },
        accent: { DEFAULT: 'var(--color-accent)', foreground: 'var(--color-accent-foreground)' },
        destructive: { DEFAULT: 'var(--color-destructive)', foreground: 'var(--color-destructive-foreground)' },
        success: { DEFAULT: 'var(--color-success)', foreground: 'var(--color-success-foreground)' },
        warning: { DEFAULT: 'var(--color-warning)', foreground: 'var(--color-warning-foreground)' },
        error: { DEFAULT: 'var(--color-error)', foreground: 'var(--color-error-foreground)' },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        game: {
          tictactoe: 'var(--color-game-tictactoe)',
          snake: 'var(--color-game-snake)',
          whack: 'var(--color-game-whack)',
          memory: 'var(--color-game-memory)',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-in-blur': 'slideUp 0.8s ease-out forwards',
        'scale-in-blur': 'scaleIn 1.2s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-glow': 'glowPulse 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 1.4s ease-in-out infinite',
        'bounce-subtle': 'bounceSoft 1s ease-in-out infinite',
        'mole-in': 'moleIn 0.35s cubic-bezier(.34,1.56,.64,1) forwards',
        'win-pulse': 'winPulse 1.2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(249,115,22,0.3),0 0 40px rgba(249,115,22,0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(249,115,22,0.5),0 0 60px rgba(249,115,22,0.2)' },
        },
        bounceSoft: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        moleIn: {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(-8%) scale(1.05)' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        winPulse: {
          '0%,100%': { background: 'rgba(249,115,22,0.15)', boxShadow: '0 0 0 2px rgba(249,115,22,0.4)' },
          '50%': { background: 'rgba(249,115,22,0.3)', boxShadow: '0 0 0 3px rgba(249,115,22,0.7)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(2deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
