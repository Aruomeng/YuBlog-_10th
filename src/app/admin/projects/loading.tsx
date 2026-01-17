export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header 骨架 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-28 bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-36 bg-zinc-800/50 rounded" />
        </div>
        <div className="h-10 w-28 bg-zinc-800 rounded-lg" />
      </div>

      {/* 项目卡片骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
            <div className="h-40 bg-zinc-800/50 rounded-lg mb-4" />
            <div className="h-5 w-32 bg-zinc-800 rounded mb-2" />
            <div className="h-4 w-full bg-zinc-800/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
