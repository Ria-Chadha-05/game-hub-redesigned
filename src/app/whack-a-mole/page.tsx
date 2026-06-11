import type { Metadata } from 'next';
import GamePageLayout from '@/components/common/GamePageLayout';
import WhackAMoleGame from './components/WhackAMoleGame';

export const metadata: Metadata = { title: 'Whack-A-Mole — Game Hub' };

export default function WhackPage() {
  return (
    <GamePageLayout accentColor="#f97316">
      <WhackAMoleGame />
    </GamePageLayout>
  );
}
