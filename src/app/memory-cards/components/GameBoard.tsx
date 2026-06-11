'use client';
import Icon from '@/components/ui/AppIcon';

interface Card { id: number; icon: string; isFlipped: boolean; isMatched: boolean; }
interface Props { cards: Card[]; onCardClick: (id: number) => void; gridCols: string; }

const GameBoard = ({ cards, onCardClick, gridCols }: Props) => (
  <div className={`grid ${gridCols} gap-3 max-w-xl mx-auto`}>
    {cards.map(card => (
      <button
        key={card.id}
        onClick={() => onCardClick(card.id)}
        disabled={card.isMatched}
        className="group relative aspect-square perspective-1000 outline-none"
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
          {/* Back face */}
          <div className="absolute inset-0 backface-hidden rounded-2xl flex items-center justify-center border transition-colors duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(139,92,246,0.1))',
              border: '1px solid rgba(168,85,247,0.2)',
            }}>
            <span className="text-xl text-purple-300/60">?</span>
          </div>
          {/* Front face */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex items-center justify-center border ${
            card.isMatched
              ? 'border-purple-500/40'
              : 'border-white/10'
          }`}
            style={{
              background: card.isMatched
                ? 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(139,92,246,0.15))'
                : 'rgba(18,18,18,0.9)',
              boxShadow: card.isMatched ? '0 0 20px rgba(168,85,247,0.3)' : 'none',
            }}>
            <Icon name={card.icon as never} size={32} className={card.isMatched ? 'text-purple-300' : 'text-white/70'} />
          </div>
        </div>
      </button>
    ))}
  </div>
);

export default GameBoard;
