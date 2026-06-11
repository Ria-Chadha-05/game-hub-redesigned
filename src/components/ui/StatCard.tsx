interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}

const StatCard = ({ label, value, sub, accent = '#f97316' }: StatCardProps) => (
  <div className="p-5 bg-[#0c0c0c] border border-white/[0.06] rounded-2xl text-center">
    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">{label}</div>
    <div className="font-display text-3xl font-bold" style={{ color: accent }}>{value}</div>
    {sub && <div className="text-[10px] text-white/20 mt-1 font-mono">{sub}</div>}
  </div>
);

export default StatCard;
