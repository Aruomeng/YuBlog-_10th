import Link from "next/link";
import { BentoCard } from "@/components/bento/bento-card";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "博客 | YuBlog",
  description: "探索技术、设计和 AI 的文章",
};

// 增量静态再生成，每60秒重新验证
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      {/* 标题 */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          博客 📝
        </h1>
        <p className="text-zinc-400">
          分享我的技术探索、设计思考和 AI 实践
        </p>
      </div>

      {/* 文章列表 */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            暂无文章
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BentoCard className="cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => {
                        const color = tag.color || "#8B5CF6";
                        return (
                          <span
                            key={tag.id}
                            className="px-2 py-0.5 text-xs rounded-full border"
                            style={{
                              backgroundColor: `${color}15`,
                              color: color,
                              borderColor: `${color}30`,
                            }}
                          >
                            {tag.name}
                          </span>
                        );
                      })}
                    </div>

                    {/* 标题 */}
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* 描述 */}
                    <p className="text-zinc-400 text-sm">
                      {post.description}
                    </p>
                  </div>

                  {/* 元信息 */}
                  <div className="text-right shrink-0">
                    <p className="text-sm text-zinc-500">
                      {post.publishedAt?.toLocaleDateString("zh-CN")}
                    </p>
                    <p className="text-xs text-zinc-600">{post.readTime}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      👁 {post.viewCount} · ❤️ {post.likeCount}
                    </p>
                  </div>
                </div>
              </BentoCard>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
