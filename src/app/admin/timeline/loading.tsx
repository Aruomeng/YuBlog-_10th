export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header 骨架 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-24 bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-36 bg-zinc-800/50 rounded" />
        </div>
        <div className="h-10 w-28 bg-zinc-800 rounded-lg" />
      </div>

      {/* 时间线骨架 */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 w-4 bg-purple-500/30 rounded-full mt-1" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-zinc-800 rounded mb-2" />
                <div className="h-4 w-48 bg-zinc-800/50 rounded" />
              </div>
              <div className="h-4 w-24 bg-zinc-800/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
