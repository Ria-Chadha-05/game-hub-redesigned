import type { Metadata } from 'next';
import GamePageLayout from '@/components/common/GamePageLayout';
import SnakeGame from './components/SnakeGame';

export const metadata: Metadata = { title: 'Snake — Game Hub' };

export default function SnakePage() {
  return (
    <GamePageLayout accentColor="#22c55e">
      <SnakeGame />
    </GamePageLayout>
  );
}
