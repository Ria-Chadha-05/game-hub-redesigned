'use client';

type Player = 'X' | 'O' | null;

interface Props {
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;
  onReset: () => void;
}

const GameControls = ({ currentPlayer, winner, isDraw, onReset }: Props) => (
  <div className="flex flex-col items-center gap-6">
    {/* Status */}
    <div className="h-14 flex items-center">
      {winner ? (
        <div className="text-center">
          <span className="font-display text-2xl font-bold" style={{ color: winner === 'X' ? '#3b82f6' : '#f97316' }}>
            Player {winner} Wins! 🎉
          </span>
        </div>
      ) : isDraw ? (
        <span className="font-display text-2xl font-bold text-white/60">It&apos;s a Draw!</span>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-sm">Current Turn</span>
          <span className="font-display text-xl font-bold px-4 py-1.5 rounded-xl"
            style={{
              color: currentPlayer === 'X' ? '#3b82f6' : '#f97316',
              background: currentPlayer === 'X' ? 'rgba(59,130,246,0.1)' : 'rgba(249,115,22,0.1)',
              border: `1px solid ${currentPlayer === 'X' ? 'rgba(59,130,246,0.25)' : 'rgba(249,115,22,0.25)'}`,
            }}>
            Player {currentPlayer}
          </span>
        </div>
      )}
    </div>

    <button
      onClick={onReset}
      className="group px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center gap-2"
    >
      <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      {winner || isDraw ? 'Play Again' : 'New Game'}
    </button>
  </div>
);

export default GameControls;
