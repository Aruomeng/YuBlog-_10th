export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 标题骨架 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-48 bg-zinc-800/50 rounded" />
        </div>
        <div className="h-10 w-24 bg-zinc-800 rounded-lg" />
      </div>

      {/* 内容骨架 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-24 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
          <div className="h-96 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
        </div>
        <div className="space-y-6">
          <div className="h-24 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
          <div className="h-32 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
          <div className="h-40 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
        </div>
      </div>
    </div>
  );
}
