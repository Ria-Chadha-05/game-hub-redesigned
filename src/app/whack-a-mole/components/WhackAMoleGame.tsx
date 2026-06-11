'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

interface Mole { id: number; isActive: boolean; isHit: boolean; }

interface GameState {
  moles: Mole[];
  score: number;
  highScore: number;
  timeLeft: number;
  isPlaying: boolean;
  isGameOver: boolean;
}

const GAME_DURATION   = 30;
const MOLE_COUNT      = 9;
const MOLE_INTERVAL   = 800;
const MOLE_VISIBLE    = 1000;
const LS_KEY          = 'whack-highscore';

const createMoles = (): Mole[] =>
  Array.from({ length: MOLE_COUNT }, (_, i) => ({ id: i, isActive: false, isHit: false }));

const WhackAMoleGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    moles: createMoles(), score: 0, highScore: 0,
    timeLeft: GAME_DURATION, isPlaying: false, isGameOver: false,
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const moleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Track active mole deactivation timeouts so we can clear them on game end
  const moleDeactivateRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    if (moleTimerRef.current)  clearInterval(moleTimerRef.current);
    if (gameTimerRef.current)  clearInterval(gameTimerRef.current);
    moleDeactivateRefs.current.forEach(clearTimeout);
    moleDeactivateRefs.current = [];
  };

  useEffect(() => {
    setIsHydrated(true);
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s) setGameState(prev => ({ ...prev, highScore: parseInt(s, 10) }));
    } catch {}
    return clearAllTimers;
  }, []);

  const activateRandomMole = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying) return prev;
      const inactive = prev.moles.filter(m => !m.isActive && !m.isHit);
      if (inactive.length === 0) return prev;
      const pick = inactive[Math.floor(Math.random() * inactive.length)];
      const id = setTimeout(() => {
        setGameState(s => ({
          ...s,
          moles: s.moles.map(m => m.id === pick.id ? { ...m, isActive: false } : m),
        }));
      }, MOLE_VISIBLE);
      moleDeactivateRefs.current.push(id);
      return { ...prev, moles: prev.moles.map(m => m.id === pick.id ? { ...m, isActive: true, isHit: false } : m) };
    });
  }, []);

  useEffect(() => {
    if (!isHydrated || !gameState.isPlaying) return;
    moleTimerRef.current = setInterval(activateRandomMole, MOLE_INTERVAL);
    gameTimerRef.current = setInterval(() => {
      setGameState(prev => {
        const t = prev.timeLeft - 1;
        if (t <= 0) {
          clearAllTimers();
          const newHigh = Math.max(prev.score, prev.highScore);
          try { if (prev.score > prev.highScore) localStorage.setItem(LS_KEY, prev.score.toString()); } catch {}
          return { ...prev, timeLeft: 0, isPlaying: false, isGameOver: true, highScore: newHigh };
        }
        return { ...prev, timeLeft: t };
      });
    }, 1000);
    return clearAllTimers;
  }, [isHydrated, gameState.isPlaying, activateRandomMole]);

  const handleMoleClick = (moleId: number) => {
    setGameState(prev => {
      const mole = prev.moles.find(m => m.id === moleId);
      if (!mole || !mole.isActive || mole.isHit) return prev;
      return {
        ...prev,
        moles: prev.moles.map(m => m.id === moleId ? { ...m, isHit: true, isActive: false } : m),
        score: prev.score + 10,
      };
    });
  };

  const handleStart = () => {
    clearAllTimers();
    setGameState(prev => ({
      moles: createMoles(), score: 0, highScore: prev.highScore,
      timeLeft: GAME_DURATION, isPlaying: true, isGameOver: false,
    }));
  };

  const handleReset = () => {
    clearAllTimers();
    setGameState(prev => ({
      moles: createMoles(), score: 0, highScore: prev.highScore,
      timeLeft: GAME_DURATION, isPlaying: false, isGameOver: false,
    }));
  };

  if (!isHydrated) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold text-orange-400"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', boxShadow: '0 0 20px rgba(249,115,22,0.2)' }}>
            ⚡
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Whack-A-Mole</h1>
        </div>
        <p className="text-white/40">Hit the moles before they disappear — {GAME_DURATION}s challenge</p>
      </div>

      <GameStats score={gameState.score} highScore={gameState.highScore} timeLeft={gameState.timeLeft} />

      <div className="my-8">
        <GameBoard moles={gameState.moles} onMoleClick={handleMoleClick} isPlaying={gameState.isPlaying} />
      </div>

      <GameControls
        isPlaying={gameState.isPlaying}
        isGameOver={gameState.isGameOver}
        onStart={handleStart}
        onReset={handleReset}
      />
    </div>
  );
};

export default WhackAMoleGame;
