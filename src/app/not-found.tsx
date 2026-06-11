import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center px-6">
      <div>
        <div className="font-display text-8xl font-bold text-orange-500/20 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/40 mb-8">Looks like this level doesn&apos;t exist.</p>
        <Link href="/homepage" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold text-sm transition-all hover:scale-105">
          Back to Game Hub
        </Link>
      </div>
    </div>
  );
}
