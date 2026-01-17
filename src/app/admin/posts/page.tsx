import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { DataCard } from "@/components/admin/stats-card";
import { Button } from "@/components/admin/modal";
import { PostsActions } from "./posts-actions";

export const dynamic = "force-dynamic";

async function getAllPosts() {
  try {
    return await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to get posts:", error);
    return [];
  }
}

export default async function PostsPage() {
  const allPosts = await getAllPosts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">文章管理</h1>
          <p className="text-zinc-400">管理您的博客文章</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>✏️ 写文章</Button>
        </Link>
      </div>

      {/* Posts Table */}
      <DataCard>
        <PostsActions posts={allPosts} />
      </DataCard>
    </div>
  );
}

