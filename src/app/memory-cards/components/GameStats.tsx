'use client';
import StatCard from '@/components/ui/StatCard';
interface Props { moves: number; matches: number; totalPairs: number; bestScore: number; onResetScores: () => void; }
const GameStats = ({ moves, matches, totalPairs, bestScore, onResetScores }: Props) => (
  <div>
    <div className="grid grid-cols-3 gap-3 mb-3">
      <StatCard label="Moves"    value={moves}                          sub="flips"    accent="#a855f7" />
      <StatCard label="Matched"  value={`${matches}/${totalPairs}`}     sub="pairs"    accent="#22c55e" />
      <StatCard label="Best"     value={bestScore || '—'}               sub="moves"    accent="#eab308" />
    </div>
    <div className="text-center">
      <button onClick={onResetScores} className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono underline underline-offset-2">
        Reset scores
      </button>
    </div>
  </div>
);
export default GameStats;
