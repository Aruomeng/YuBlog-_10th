import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LikeButton } from "@/components/like-button";
import { ViewCounter } from "@/components/view-counter";
import { NewsletterForm } from "@/components/newsletter-form";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getPostBySlug, getPostStats, incrementPostViewCount } from "@/lib/posts";
import { getSessionLikes } from "@/actions/stats";

// 强制动态渲染
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// 动态生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到 | YuBlog",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const ogImageUrl = `${baseUrl}/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description || "")}&date=${encodeURIComponent(post.publishedAt?.toLocaleDateString("zh-CN") || "")}`;

  return {
    title: `${post.title} | YuBlog`,
    description: post.description || "",
    keywords: post.tags.map((t) => t.name),
    openGraph: {
      title: post.title,
      description: post.description || "",
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || "",
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 增加阅读量（非阻塞）
  incrementPostViewCount(slug);

  // 获取统计数据
  const stats = await getPostStats(slug);
  const sessionLikes = await getSessionLikes(slug);

  return (
    <main className="pt-32 pb-20">
      <article className="max-w-3xl mx-auto px-4">
        {/* 文章头部 */}
        <header className="mb-12">
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => {
              const color = tag.color || "#8B5CF6";
              return (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-xs rounded-full border"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* 元信息 */}
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <time>{post.publishedAt?.toLocaleDateString("zh-CN")}</time>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <ViewCounter views={post.viewCount || 0} />
          </div>
        </header>

        {/* 文章内容 - 使用 Markdown 渲染 */}
        <div className="prose prose-invert prose-zinc max-w-none mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* 互动区域 */}
        <div className="border-t border-zinc-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* 点赞按钮 */}
            <LikeButton
              slug={slug}
              initialLikes={post.likeCount || 0}
              initialSessionLikes={sessionLikes}
            />

            {/* 订阅表单 */}
            <div className="w-full md:w-auto md:min-w-[300px]">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
