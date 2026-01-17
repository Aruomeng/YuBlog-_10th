import { BentoGrid } from "@/components/bento/bento-grid";
import { MovingBorderButton } from "@/components/effects/moving-border";
import { FlowingGradientText } from "@/components/effects/flowing-gradient-text";
import { AboutWidget } from "@/components/widgets/about-widget";
import { AIChatWidget } from "@/components/widgets/ai-chat-widget";
import { GithubWidget } from "@/components/widgets/github-widget";
import { PostsWidget } from "@/components/widgets/posts-widget";
import { SpotifyWidget } from "@/components/widgets/spotify-widget";
import { TechStackWidget } from "@/components/widgets/tech-stack-widget";
import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";

// 强制动态渲染
export const dynamic = "force-dynamic";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-sm text-zinc-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            第十代个人博客
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              探索.创造.
            </span>
            <br />
            <FlowingGradientText className="text-5xl md:text-7xl font-bold">
              分享
            </FlowingGradientText>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            一个融合了 AI、现代设计和前沿技术的个人空间。
            <br />
            在这里，思想与代码交汇。
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/blog">
              <MovingBorderButton>
                开始探索 ✨
              </MovingBorderButton>
            </Link>
            <Link href="/blog">
              <span className="px-6 py-3 rounded-full border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-800/50 transition-colors inline-block">
                阅读博客
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <BentoGrid className="gap-4">
          {/* 第一行: About(1x2) + AI Chat(1x1) + Tech Stack(2x1) */}
          <AboutWidget />
          <AIChatWidget />
          <TechStackWidget />
          
          {/* 第二行: (About继续) + Posts(2x1) + 空格由Posts填充 */}
          <PostsWidget posts={latestPosts} />
          
          {/* 第三行: GitHub(2x1) + Spotify(2x1) */}
          <GithubWidget />
          <SpotifyWidget />
        </BentoGrid>
      </section>

      {/* Footer hint */}
      <div className="text-center mt-20">
        <p className="text-sm text-zinc-600">
          用 ❤️ 和 ☕ 构建 · 2024
        </p>
      </div>
    </main>
  );
}
