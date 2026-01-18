"use client";

import { BentoCard } from "@/components/bento/bento-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Post, Tag } from "@/db/schema";

interface PostsWidgetProps {
  posts: (Post & { tags: Tag[] })[];
}

export function PostsWidget({ posts }: PostsWidgetProps) {
  return (
    <BentoCard colSpan={2} rowSpan={1} glowColor="rgba(59, 130, 246, 0.15)">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">📝</span>
          最新文章
        </h3>
        <Link href="/blog">
          <motion.span
            className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
            whileHover={{ x: 5 }}
          >
            查看全部 →
          </motion.span>
        </Link>
      </div>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-zinc-500">暂无文章</p>
        ) : (
          posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white truncate transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 truncate">
                      {post.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-zinc-600">
                      {post.publishedAt?.toLocaleDateString("zh-CN")}
                    </p>
                    <p className="text-xs text-zinc-700">{post.readTime}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </BentoCard>
  );
}
