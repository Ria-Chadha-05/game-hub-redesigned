import type { Metadata } from 'next';
import GamePageLayout from '@/components/common/GamePageLayout';
import MemoryCardGame from './components/MemoryCardGame';

export const metadata: Metadata = { title: 'Memory Cards — Game Hub' };

export default function MemoryPage() {
  return (
    <GamePageLayout accentColor="#a855f7">
      <MemoryCardGame />
    </GamePageLayout>
  );
}
