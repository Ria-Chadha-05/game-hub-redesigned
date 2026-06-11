import type { Metadata } from 'next';
import GamePageLayout from '@/components/common/GamePageLayout';
import TicTacToeGame from './components/TicTacToeGame';

export const metadata: Metadata = { title: 'Tic Tac Toe — Game Hub', description: 'Classic 3x3 strategy game.' };

export default function TicTacToePage() {
  return (
    <GamePageLayout accentColor="#3b82f6">
      <TicTacToeGame />
    </GamePageLayout>
  );
}
