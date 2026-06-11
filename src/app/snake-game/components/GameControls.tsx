'use client';
interface Props { isGameOver: boolean; isPaused: boolean; onReset: () => void; onTogglePause: () => void; }
const GameControls = ({ isGameOver, isPaused, onReset, onTogglePause }: Props) => (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-3">
      {!isGameOver && (
        <button onClick={onTogglePause}
          className="px-6 py-3 border border-white/10 text-white/70 hover:text-white hover:border-white/20 rounded-2xl font-semibold text-sm transition-all hover:bg-white/5 flex items-center gap-2">
          {isPaused ? (
            <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>Resume</>
          ) : (
            <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Pause</>
          )}
        </button>
      )}
      <button onClick={onReset}
        className="group px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center gap-2">
        <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        {isGameOver ? 'Play Again' : 'Restart'}
      </button>
    </div>
    <div className="p-5 bg-[#0c0c0c] border border-white/[0.06] rounded-2xl">
      <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Controls</h3>
      <div className="grid grid-cols-2 gap-3 text-sm text-white/40">
        {[['↑','W','Up'],['↓','S','Down'],['←','A','Left'],['→','D','Right']].map(([a,b,l]) => (
          <div key={l} className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">{a}</kbd>
            <span className="text-white/20">/</span>
            <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">{b}</kbd>
            <span>{l}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 col-span-2">
          <kbd className="px-3 py-0.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">Space</kbd>
          <span>Pause / Resume</span>
        </div>
      </div>
    </div>
  </div>
);
export default GameControls;
