export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header 骨架 */}
      <div>
        <div className="h-8 w-28 bg-zinc-800 rounded-lg mb-2" />
        <div className="h-4 w-36 bg-zinc-800/50 rounded" />
      </div>

      {/* 设置表单骨架 */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
            <div className="h-5 w-24 bg-zinc-800 rounded mb-4" />
            <div className="h-10 w-full bg-zinc-800/50 rounded-lg" />
          </div>
        ))}
      </div>

      {/* 保存按钮骨架 */}
      <div className="flex justify-end">
        <div className="h-10 w-24 bg-purple-500/20 rounded-lg" />
      </div>
    </div>
  );
}
