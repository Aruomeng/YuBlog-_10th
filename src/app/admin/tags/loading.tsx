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

      {/* 标签列表骨架 */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-10 w-24 bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
