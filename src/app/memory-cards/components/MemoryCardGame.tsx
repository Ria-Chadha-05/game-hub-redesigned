'use client';

import { useState, useEffect, useRef } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Card { id: number; icon: string; isFlipped: boolean; isMatched: boolean; }
interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  matches: number;
  isComplete: boolean;
  difficulty: Difficulty;
  bestScores: Record<Difficulty, number>;
  isLocked: boolean; // prevent clicks during flip-back animation
}

const CARD_ICONS = ['HeartIcon','StarIcon','BoltIcon','FireIcon','SparklesIcon','SunIcon','MoonIcon','CloudIcon','BeakerIcon','CubeIcon','GlobeAltIcon','RocketLaunchIcon'];
const DIFF_SETTINGS: Record<Difficulty, { pairs: number; gridCols: string }> = {
  easy:   { pairs: 6,  gridCols: 'grid-cols-3' },
  medium: { pairs: 8,  gridCols: 'grid-cols-4' },
  hard:   { pairs: 12, gridCols: 'grid-cols-4' },
};
const INITIAL_BEST: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
const LS_KEY = 'memory-cards-scores';

const buildCards = (diff: Difficulty): Card[] => {
  const icons = CARD_ICONS.slice(0, DIFF_SETTINGS[diff].pairs);
  return [...icons, ...icons]
    .map((icon, i) => ({ id: i, icon, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

const MemoryCardGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [], flippedCards: [], moves: 0, matches: 0,
    isComplete: false, difficulty: 'medium',
    bestScores: INITIAL_BEST, isLocked: false,
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const flipTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s) setGameState(prev => ({ ...prev, bestScores: JSON.parse(s) }));
    } catch {}
  }, []);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(LS_KEY, JSON.stringify(gameState.bestScores));
  }, [gameState.bestScores, isHydrated]);

  // Init/reset when difficulty changes
  useEffect(() => {
    setGameState(prev => ({
      ...prev, cards: buildCards(prev.difficulty),
      flippedCards: [], moves: 0, matches: 0, isComplete: false, isLocked: false,
    }));
  }, [gameState.difficulty]);

  const initGame = () => {
    if (flipTimeout.current) clearTimeout(flipTimeout.current);
    setGameState(prev => ({
      ...prev, cards: buildCards(prev.difficulty),
      flippedCards: [], moves: 0, matches: 0, isComplete: false, isLocked: false,
    }));
  };

  const handleCardClick = (cardId: number) => {
    setGameState(prev => {
      if (prev.isLocked) return prev;
      const card = prev.cards.find(c => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return prev;
      if (prev.flippedCards.length === 2) return prev;

      const newCards    = prev.cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);
      const newFlipped  = [...prev.flippedCards, cardId];

      if (newFlipped.length === 2) {
        const [aid, bid] = newFlipped;
        const a = newCards.find(c => c.id === aid)!;
        const b = newCards.find(c => c.id === bid)!;
        const newMoves = prev.moves + 1;

        if (a.icon === b.icon) {
          // Match
          const matched  = newCards.map(c => c.id === aid || c.id === bid ? { ...c, isMatched: true } : c);
          const matches  = prev.matches + 1;
          const total    = DIFF_SETTINGS[prev.difficulty].pairs;
          const done     = matches === total;
          const best     = { ...prev.bestScores };
          if (done && (best[prev.difficulty] === 0 || newMoves < best[prev.difficulty])) {
            best[prev.difficulty] = newMoves;
          }
          return { ...prev, cards: matched, flippedCards: [], moves: newMoves, matches, isComplete: done, bestScores: best, isLocked: false };
        } else {
          // No match — lock board and flip back after delay
          flipTimeout.current = setTimeout(() => {
            setGameState(s => ({
              ...s,
              cards: s.cards.map(c => c.id === aid || c.id === bid ? { ...c, isFlipped: false } : c),
              flippedCards: [],
              isLocked: false,
            }));
          }, 900);
          return { ...prev, cards: newCards, flippedCards: newFlipped, moves: newMoves, isLocked: true };
        }
      }

      return { ...prev, cards: newCards, flippedCards: newFlipped };
    });
  };

  const handleDifficultyChange = (d: Difficulty) =>
    setGameState(prev => ({ ...prev, difficulty: d }));

  const handleResetScores = () => {
    setGameState(prev => ({ ...prev, bestScores: INITIAL_BEST }));
    if (isHydrated) localStorage.setItem(LS_KEY, JSON.stringify(INITIAL_BEST));
  };

  if (!isHydrated) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold text-purple-400"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)', boxShadow: '0 0 20px rgba(168,85,247,0.2)' }}>
            ◈
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Memory Cards</h1>
        </div>
        <p className="text-white/40">Flip and match all pairs to win</p>
      </div>

      <GameStats
        moves={gameState.moves}
        matches={gameState.matches}
        totalPairs={DIFF_SETTINGS[gameState.difficulty].pairs}
        bestScore={gameState.bestScores[gameState.difficulty]}
        onResetScores={handleResetScores}
      />

      <div className="my-8">
        <GameBoard cards={gameState.cards} onCardClick={handleCardClick} gridCols={DIFF_SETTINGS[gameState.difficulty].gridCols} />
      </div>

      <GameControls
        difficulty={gameState.difficulty}
        isComplete={gameState.isComplete}
        moves={gameState.moves}
        onDifficultyChange={handleDifficultyChange}
        onReset={initGame}
      />
    </div>
  );
};

export default MemoryCardGame;
