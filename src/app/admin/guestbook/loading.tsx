export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header 骨架 */}
      <div>
        <div className="h-8 w-28 bg-zinc-800 rounded-lg mb-2" />
        <div className="h-4 w-36 bg-zinc-800/50 rounded" />
      </div>

      {/* 留言列表骨架 */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-zinc-800 last:border-0">
              <div className="h-10 w-10 bg-zinc-800 rounded-full" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
                <div className="h-4 w-full bg-zinc-800/30 rounded" />
              </div>
              <div className="h-8 w-16 bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
