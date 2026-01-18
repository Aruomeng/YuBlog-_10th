export default function BlogLoading() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题骨架 */}
      <div className="mb-12">
        <div className="h-12 w-32 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="h-5 w-64 bg-zinc-800/50 rounded animate-pulse" />
      </div>

      {/* 文章列表骨架 */}
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                {/* 标签 */}
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-12 bg-zinc-800/50 rounded-full" />
                  <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
                </div>
                {/* 标题 */}
                <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2" />
                {/* 描述 */}
                <div className="h-4 w-full bg-zinc-800/50 rounded" />
              </div>
              {/* 元信息 */}
              <div className="text-right shrink-0">
                <div className="h-4 w-20 bg-zinc-800/50 rounded mb-1 ml-auto" />
                <div className="h-3 w-12 bg-zinc-800/30 rounded ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
