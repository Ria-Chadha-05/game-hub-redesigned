'use client';
type Difficulty = 'easy' | 'medium' | 'hard';
interface Props { difficulty: Difficulty; isComplete: boolean; moves: number; onDifficultyChange: (d: Difficulty) => void; onReset: () => void; }

const difficulties: { value: Difficulty; label: string; pairs: number }[] = [
  { value: 'easy',   label: 'Easy',   pairs: 6  },
  { value: 'medium', label: 'Medium', pairs: 8  },
  { value: 'hard',   label: 'Hard',   pairs: 12 },
];

const GameControls = ({ difficulty, isComplete, moves, onDifficultyChange, onReset }: Props) => (
  <div className="space-y-6">
    {isComplete && (
      <div className="text-center p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
        <div className="font-display text-2xl font-bold text-purple-300 mb-1">🎉 Completed!</div>
        <p className="text-white/50 text-sm">Solved in <span className="text-purple-300 font-semibold">{moves}</span> moves</p>
      </div>
    )}
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 p-1 bg-[#0c0c0c] border border-white/[0.06] rounded-2xl">
        {difficulties.map(d => (
          <button
            key={d.value}
            onClick={() => onDifficultyChange(d.value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              difficulty === d.value
                ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <button onClick={onReset}
        className="group px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center gap-2">
        <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        {isComplete ? 'Play Again' : 'Shuffle'}
      </button>
    </div>
  </div>
);
export default GameControls;
