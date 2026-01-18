export default function ProjectsLoading() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题骨架 */}
      <div className="mb-12">
        <div className="h-12 w-28 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="h-5 w-72 bg-zinc-800/50 rounded animate-pulse" />
      </div>

      {/* 项目列表骨架 */}
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse"
          >
            {/* 状态标签 */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 w-14 bg-zinc-800/50 rounded-full" />
              <div className="h-4 w-10 bg-zinc-800/30 rounded" />
            </div>
            
            {/* 标题 */}
            <div className="h-6 w-3/4 bg-zinc-800 rounded mb-3" />
            
            {/* 描述 */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-zinc-800/50 rounded" />
              <div className="h-4 w-2/3 bg-zinc-800/50 rounded" />
            </div>
            
            {/* 技术栈 */}
            <div className="flex gap-2">
              <div className="h-5 w-14 bg-zinc-800/30 rounded" />
              <div className="h-5 w-16 bg-zinc-800/30 rounded" />
              <div className="h-5 w-12 bg-zinc-800/30 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
