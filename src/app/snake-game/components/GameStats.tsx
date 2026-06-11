'use client';
import StatCard from '@/components/ui/StatCard';
interface Props { score: number; highScore: number; }
const GameStats = ({ score, highScore }: Props) => (
  <div className="grid grid-cols-2 gap-3 mb-6">
    <StatCard label="Score"      value={score}     sub="current" accent="#22c55e" />
    <StatCard label="High Score" value={highScore} sub="best"    accent="#f97316" />
  </div>
);
export default GameStats;
