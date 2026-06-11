'use client';

type Player = 'X' | 'O' | null;

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winner: Player;
  winLine: number[] | null;
}

const XIcon = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round">
    <line x1="8" y1="8" x2="32" y2="32"/>
    <line x1="32" y1="8" x2="8" y2="32"/>
  </svg>
);

const OIcon = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#f97316" strokeWidth="4">
    <circle cx="20" cy="20" r="12"/>
  </svg>
);

const GameBoard = ({ board, onCellClick, winner, winLine }: GameBoardProps) => (
  <div className="flex flex-col items-center">
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {board.map((cell, i) => {
        const isWinCell = winLine?.includes(i);
        return (
          <button
            key={`cell_${i}`}
            onClick={() => onCellClick(i)}
            disabled={!!cell || !!winner}
            className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 border ${
              isWinCell
                ? 'border-orange-500/60 animate-win-pulse'
                : cell
                ? 'bg-[#0f0f0f] border-white/[0.06]'
                : 'bg-[#0c0c0c] border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/5 cursor-pointer active:scale-95'
            } disabled:cursor-not-allowed`}
          >
            {cell === 'X' && <XIcon />}
            {cell === 'O' && <OIcon />}
            {!cell && (
              <div className="w-4 h-4 rounded-full border border-white/5 opacity-0 group-hover:opacity-100" />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default GameBoard;
