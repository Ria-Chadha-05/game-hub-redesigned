'use client';
import StatCard from '@/components/ui/StatCard';
interface Props { score: number; highScore: number; timeLeft: number; }
const GameStats = ({ score, highScore, timeLeft }: Props) => (
  <div className="grid grid-cols-3 gap-3 mb-6">
    <StatCard label="Score"      value={score}     sub="points"  accent="#f97316" />
    <StatCard label="Time Left"  value={`${timeLeft}s`} sub="remaining" accent={timeLeft <= 10 ? '#ef4444' : '#ffffff'} />
    <StatCard label="Best Score" value={highScore} sub="record"  accent="#eab308" />
  </div>
);
export default GameStats;
