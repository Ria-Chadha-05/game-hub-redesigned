'use client';
import StatCard from '@/components/ui/StatCard';

interface Props {
  scores: { X: number; O: number; draws: number };
  onResetScores: () => void;
}

const GameStats = ({ scores, onResetScores }: Props) => (
  <div className="mb-6">
    <div className="grid grid-cols-3 gap-3 mb-3">
      <StatCard label="Player X" value={scores.X} sub="wins" accent="#3b82f6" />
      <StatCard label="Draws"    value={scores.draws} sub="ties" accent="#ffffff" />
      <StatCard label="Player O" value={scores.O} sub="wins" accent="#f97316" />
    </div>
    <div className="text-center">
      <button onClick={onResetScores} className="text-xs text-white/25 hover:text-white/50 transition-colors font-mono underline underline-offset-2">
        Reset scores
      </button>
    </div>
  </div>
);

export default GameStats;
