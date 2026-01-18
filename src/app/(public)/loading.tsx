export default function HomeLoading() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-zinc-700 animate-pulse" />
            <div className="h-4 w-24 bg-zinc-700 rounded animate-pulse" />
          </div>

          <div className="space-y-4 mb-6">
            <div className="h-12 md:h-16 w-64 mx-auto bg-zinc-800 rounded animate-pulse" />
            <div className="h-12 md:h-16 w-32 mx-auto bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="h-6 w-96 max-w-full mx-auto bg-zinc-800/50 rounded animate-pulse mb-2" />
          <div className="h-6 w-48 mx-auto bg-zinc-800/50 rounded animate-pulse mb-8" />

          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-32 bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-12 w-24 bg-zinc-800 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Bento Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* About Widget Skeleton - 1x2 */}
          <div className="lg:col-span-1 row-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-zinc-800 mb-6" />
            <div className="h-6 w-40 bg-zinc-800 rounded mb-2" />
            <div className="h-4 w-48 bg-zinc-800/50 rounded mb-6" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-zinc-800/50 rounded" />
              <div className="h-3 w-3/4 bg-zinc-800/50 rounded" />
            </div>
          </div>

          {/* AI Chat Widget Skeleton - 1x1 */}
          <div className="lg:col-span-1 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800" />
              <div className="h-4 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="h-16 bg-zinc-800/50 rounded-lg mb-4" />
            <div className="h-10 bg-zinc-800/30 rounded-lg" />
          </div>

          {/* Tech Stack Widget Skeleton - 2x1 */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="h-5 w-20 bg-zinc-800 rounded mb-4" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-14 bg-zinc-800/50 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Posts Widget Skeleton - 3x1 */}
          <div className="lg:col-span-3 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-5 w-20 bg-zinc-800 rounded" />
              <div className="h-4 w-16 bg-zinc-800/50 rounded" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="flex-1">
                    <div className="h-4 w-48 bg-zinc-800/50 rounded mb-2" />
                    <div className="h-3 w-64 bg-zinc-800/30 rounded" />
                  </div>
                  <div className="h-4 w-20 bg-zinc-800/30 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Widget Skeleton - 2x1 */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-5 w-28 bg-zinc-800 rounded" />
              <div className="h-4 w-20 bg-zinc-800/50 rounded" />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-6 w-12 mx-auto bg-zinc-800/50 rounded mb-1" />
                  <div className="h-3 w-8 mx-auto bg-zinc-800/30 rounded" />
                </div>
              ))}
            </div>
            <div className="h-16 bg-zinc-800/30 rounded" />
          </div>

          {/* Spotify Widget Skeleton - 2x1 */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-zinc-800" />
              <div className="h-4 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-zinc-800" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-zinc-800/50 rounded mb-2" />
                <div className="h-3 w-16 bg-zinc-800/30 rounded mb-2" />
                <div className="h-1 bg-zinc-800/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
