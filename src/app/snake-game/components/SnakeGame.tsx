'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import GameCanvas from './GameCanvas';
import GameControls from './GameControls';
import GameStats from './GameStats';

interface Position { x: number; y: number; }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameState {
  snake: Position[];
  food: Position;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];

const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
};

const opposite: Record<Direction, Direction> = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };

const SnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 15, y: 15 },
    isGameOver: false,
    isPaused: false,
    score: 0,
    highScore: 0,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Use refs to avoid stale closure issues in game loop
  const dirRef       = useRef<Direction>('RIGHT');
  const nextDirRef   = useRef<Direction>('RIGHT');
  const gameLoopRef  = useRef<NodeJS.Timeout | null>(null);
  const stateRef     = useRef(gameState);
  stateRef.current   = gameState;

  useEffect(() => {
    setIsHydrated(true);
    try {
      const hs = localStorage.getItem('snake-highscore');
      if (hs) setGameState(prev => ({ ...prev, highScore: parseInt(hs, 10) }));
    } catch {}
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver || prev.isPaused) return prev;

      const dir  = nextDirRef.current;
      dirRef.current = dir;

      const head = { ...prev.snake[0] };
      if (dir === 'UP')    head.y -= 1;
      if (dir === 'DOWN')  head.y += 1;
      if (dir === 'LEFT')  head.x -= 1;
      if (dir === 'RIGHT') head.x += 1;

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE)
        return { ...prev, isGameOver: true };

      // Self collision (skip tail tip since it will move)
      if (prev.snake.slice(0, -1).some(s => s.x === head.x && s.y === head.y))
        return { ...prev, isGameOver: true };

      const newSnake = [head, ...prev.snake];
      const ateFood  = head.x === prev.food.x && head.y === prev.food.y;
      if (!ateFood) newSnake.pop();

      const newScore = ateFood ? prev.score + 10 : prev.score;
      const newHigh  = Math.max(newScore, prev.highScore);
      if (ateFood && newScore > prev.highScore) {
        try { localStorage.setItem('snake-highscore', newScore.toString()); } catch {}
      }

      return {
        ...prev,
        snake: newSnake,
        food: ateFood ? generateFood(newSnake) : prev.food,
        score: newScore,
        highScore: newHigh,
      };
    });
  }, []);

  // Key handler
  useEffect(() => {
    if (!isHydrated) return;
    const onKey = (e: KeyboardEvent) => {
      const curr = dirRef.current;
      let next: Direction | null = null;
      if ((e.key === 'ArrowUp'    || e.key === 'w') && curr !== 'DOWN')  next = 'UP';
      if ((e.key === 'ArrowDown'  || e.key === 's') && curr !== 'UP')    next = 'DOWN';
      if ((e.key === 'ArrowLeft'  || e.key === 'a') && curr !== 'RIGHT') next = 'LEFT';
      if ((e.key === 'ArrowRight' || e.key === 'd') && curr !== 'LEFT')  next = 'RIGHT';
      if (next && next !== opposite[curr]) nextDirRef.current = next;
      if (e.key === ' ') {
        e.preventDefault();
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHydrated]);

  // Game loop — only restarts when gameOver/isPaused changes, not every key press
  useEffect(() => {
    if (!isHydrated || gameState.isGameOver || gameState.isPaused) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }
    const speed = Math.max(60, INITIAL_SPEED - Math.floor(gameState.score / 50) * 10);
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [isHydrated, gameState.isGameOver, gameState.isPaused, gameState.score, moveSnake]);

  const handleReset = () => {
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    setGameState(prev => ({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      isGameOver: false,
      isPaused: false,
      score: 0,
      highScore: prev.highScore,
    }));
  };

  const handleTogglePause = () => setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));

  if (!isHydrated) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold text-green-400"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', boxShadow: '0 0 20px rgba(34,197,94,0.2)' }}>
            ◎
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Snake</h1>
        </div>
        <p className="text-white/40">Use arrow keys or WASD — Space to pause</p>
      </div>

      <GameStats score={gameState.score} highScore={gameState.highScore} />

      <div className="my-8">
        <GameCanvas
          snake={gameState.snake}
          food={gameState.food}
          gridSize={GRID_SIZE}
          cellSize={CELL_SIZE}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
        />
      </div>

      <GameControls
        isGameOver={gameState.isGameOver}
        isPaused={gameState.isPaused}
        onReset={handleReset}
        onTogglePause={handleTogglePause}
      />
    </div>
  );
};

export default SnakeGame;
