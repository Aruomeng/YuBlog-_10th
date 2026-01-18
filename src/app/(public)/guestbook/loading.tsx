export default function GuestbookLoading() {
  return (
    <main className="pt-32 pb-20 max-w-3xl mx-auto px-4">
      {/* 标题骨架 */}
      <div className="text-center mb-12">
        <div className="h-12 w-40 mx-auto bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="h-5 w-64 mx-auto bg-zinc-800/50 rounded animate-pulse" />
      </div>

      {/* 表单区域骨架 */}
      <div className="mb-12">
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-pulse">
          <div className="h-5 w-32 mx-auto bg-zinc-800/50 rounded mb-4" />
          <div className="flex justify-center gap-3">
            <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
            <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
          </div>
        </div>
      </div>

      {/* 留言列表骨架 */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-20 bg-zinc-800/50 rounded" />
                  <div className="h-3 w-16 bg-zinc-800/30 rounded" />
                </div>
                <div className="h-4 w-full bg-zinc-800/30 rounded mb-1" />
                <div className="h-4 w-2/3 bg-zinc-800/30 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
