'use client';

import { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameStats from './GameStats';

type Player = 'X' | 'O' | null;
type Board  = Player[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  winLine: number[] | null;
  isDraw: boolean;
  scores: { X: number; O: number; draws: number };
}

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const checkWinner = (board: Board): { winner: Player; line: number[] | null } => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return { winner: board[a], line };
  }
  return { winner: null, line: null };
};

const INITIAL_SCORES = { X: 0, O: 0, draws: 0 };

const TicTacToeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winLine: null,
    isDraw: false,
    scores: INITIAL_SCORES,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const s = localStorage.getItem('tictactoe-scores');
      if (s) setGameState(prev => ({ ...prev, scores: JSON.parse(s) }));
    } catch {}
  }, []);

  useEffect(() => {
    if (isHydrated)
      localStorage.setItem('tictactoe-scores', JSON.stringify(gameState.scores));
  }, [gameState.scores, isHydrated]);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) return;
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const { winner, line } = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(c => c !== null);
    const newScores = { ...gameState.scores };
    if (winner) newScores[winner]++;
    else if (isDraw) newScores.draws++;
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      winLine: line,
      isDraw,
      scores: newScores,
    });
  };

  const handleReset = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winLine: null,
      isDraw: false,
    }));
  };

  const handleResetScores = () => {
    setGameState(prev => ({ ...prev, scores: INITIAL_SCORES }));
    if (isHydrated) localStorage.setItem('tictactoe-scores', JSON.stringify(INITIAL_SCORES));
  };

  if (!isHydrated) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Page title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-400"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', boxShadow: '0 0 20px rgba(59,130,246,0.2)' }}>
            ✕
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Tic Tac Toe</h1>
        </div>
        <p className="text-white/40">Classic 3×3 strategy — two players, one winner</p>
      </div>

      <GameStats scores={gameState.scores} onResetScores={handleResetScores} />

      <div className="my-8">
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          winner={gameState.winner}
          winLine={gameState.winLine}
        />
      </div>

      <GameControls
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        isDraw={gameState.isDraw}
        onReset={handleReset}
      />
    </div>
  );
};

export default TicTacToeGame;
