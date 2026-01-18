export default function AboutLoading() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题骨架 */}
      <div className="mb-12">
        <div className="h-12 w-40 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="h-6 w-48 bg-zinc-800/50 rounded animate-pulse" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 简介骨架 - 占满两列 */}
        <div className="md:col-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
          <div className="h-6 w-16 bg-zinc-800 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-800/50 rounded" />
            <div className="h-4 w-full bg-zinc-800/50 rounded" />
            <div className="h-4 w-3/4 bg-zinc-800/50 rounded" />
          </div>
        </div>

        {/* 技能骨架 */}
        <div className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
          <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-4 w-12 bg-zinc-800/50 rounded mb-2" />
              <div className="flex flex-wrap gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-zinc-800/30 rounded" />
                ))}
              </div>
            </div>
            <div>
              <div className="h-4 w-12 bg-zinc-800/50 rounded mb-2" />
              <div className="flex flex-wrap gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-14 bg-zinc-800/30 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 时间线骨架 */}
        <div className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
          <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  {i < 2 && <div className="w-px h-8 bg-zinc-700" />}
                </div>
                <div>
                  <div className="h-4 w-12 bg-zinc-800/50 rounded mb-1" />
                  <div className="h-4 w-32 bg-zinc-800/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 联系方式骨架 - 占满两列 */}
        <div className="md:col-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
          <div className="h-6 w-24 bg-zinc-800 rounded mb-2" />
          <div className="h-4 w-64 bg-zinc-800/50 rounded mb-6" />
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-zinc-800/30 rounded-lg" />
            <div className="h-10 w-20 bg-zinc-800 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
