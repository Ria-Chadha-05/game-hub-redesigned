'use client';

interface Mole { id: number; isActive: boolean; isHit: boolean; }
interface Props { moles: Mole[]; onMoleClick: (id: number) => void; isPlaying: boolean; }

const GameBoard = ({ moles, onMoleClick, isPlaying }: Props) => (
  <div className="p-6 bg-[#0c0c0c] border border-white/[0.06] rounded-3xl shadow-[0_0_40px_rgba(249,115,22,0.05)]">
    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
      {moles.map(mole => (
        <button
          key={`mole_${mole.id}`}
          onClick={() => onMoleClick(mole.id)}
          disabled={!mole.isActive || mole.isHit || !isPlaying}
          className="relative aspect-square rounded-2xl overflow-hidden transition-all duration-150 disabled:cursor-default"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Hole */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/3 rounded-t-full"
            style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.03)' }} />

          {/* Mole */}
          {mole.isActive && !mole.isHit && (
            <div className="absolute inset-0 flex items-end justify-center pb-2 animate-mole-in">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform active:scale-95"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #92400e, #78350f)',
                  border: '2px solid rgba(251,191,36,0.3)',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
                }}
              >
                🦔
              </div>
            </div>
          )}

          {/* Hit */}
          {mole.isHit && (
            <div className="absolute inset-0 flex items-center justify-center animate-hit">
              <span className="text-3xl">💥</span>
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default GameBoard;
