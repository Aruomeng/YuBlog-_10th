import { db } from "@/db";
import { posts, tags, postTags, Post, Tag } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

// 获取所有已发布的文章
export async function getAllPosts(): Promise<(Post & { tags: Tag[] })[]> {
  try {
    const allPosts = await db.query.posts.findMany({
      where: eq(posts.published, true),
      orderBy: [desc(posts.publishedAt)],
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return allPosts.map((post) => ({
      ...post,
      tags: post.postTags.map((pt) => pt.tag),
    }));
  } catch (error) {
    console.error("Failed to get posts:", error);
    return [];
  }
}

// 获取单篇文章
export async function getPostBySlug(slug: string): Promise<(Post & { tags: Tag[] }) | null> {
  try {
    const post = await db.query.posts.findFirst({
      where: and(eq(posts.slug, slug), eq(posts.published, true)),
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!post) return null;

    return {
      ...post,
      tags: post.postTags.map((pt) => pt.tag),
    };
  } catch (error) {
    console.error("Failed to get post:", error);
    return null;
  }
}

// 获取最新文章 (用于首页 Widget)
export async function getLatestPosts(limit: number = 3): Promise<(Post & { tags: Tag[] })[]> {
  try {
    const latestPosts = await db.query.posts.findMany({
      where: eq(posts.published, true),
      orderBy: [desc(posts.publishedAt)],
      limit,
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return latestPosts.map((post) => ({
      ...post,
      tags: post.postTags.map((pt) => pt.tag),
    }));
  } catch (error) {
    console.error("Failed to get latest posts:", error);
    return [];
  }
}

// 获取所有文章 slugs (用于 sitemap)
export async function getAllPostSlugs(): Promise<{ slug: string; updatedAt: Date | null }[]> {
  try {
    const allPosts = await db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.published, true));
    return allPosts;
  } catch (error) {
    console.error("Failed to get post slugs:", error);
    return [];
  }
}

// 增加阅读量
export async function incrementPostViewCount(slug: string): Promise<void> {
  try {
    await db
      .update(posts)
      .set({ viewCount: sql`${posts.viewCount} + 1` })
      .where(eq(posts.slug, slug));
  } catch (error) {
    console.error("Failed to increment view count:", error);
  }
}

// 增加点赞数
export async function incrementPostLikeCount(slug: string): Promise<number> {
  try {
    await db
      .update(posts)
      .set({ likeCount: sql`${posts.likeCount} + 1` })
      .where(eq(posts.slug, slug));
    
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: { likeCount: true },
    });
    
    return post?.likeCount || 0;
  } catch (error) {
    console.error("Failed to increment like count:", error);
    return 0;
  }
}

// 获取文章统计
export async function getPostStats(slug: string): Promise<{ viewCount: number; likeCount: number }> {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: { viewCount: true, likeCount: true },
    });
    
    return {
      viewCount: post?.viewCount || 0,
      likeCount: post?.likeCount || 0,
    };
  } catch (error) {
    console.error("Failed to get post stats:", error);
    return { viewCount: 0, likeCount: 0 };
  }
}
