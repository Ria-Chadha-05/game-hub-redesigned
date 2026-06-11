'use client';
interface Props { isPlaying: boolean; isGameOver: boolean; onStart: () => void; onReset: () => void; }
const GameControls = ({ isPlaying, isGameOver, onStart, onReset }: Props) => (
  <div className="flex items-center justify-center gap-3">
    {!isPlaying && !isGameOver && (
      <button onClick={onStart}
        className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Start Game
      </button>
    )}
    {isGameOver && (
      <button onClick={onStart}
        className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Play Again
      </button>
    )}
    {(isPlaying || isGameOver) && (
      <button onClick={onReset}
        className="px-6 py-3.5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 rounded-2xl font-semibold text-sm transition-all hover:bg-white/5">
        Reset
      </button>
    )}
  </div>
);
export default GameControls;
