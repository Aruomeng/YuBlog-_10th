"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

// 简单的会话存储（生产环境应使用 Redis 或数据库）
const sessionLikesStore = new Map<string, Map<string, number>>();

// 生成会话哈希 (基于 IP + User Agent)
async function getSessionHash(): Promise<string> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const rawString = `${ip}-${userAgent}`;
  return crypto.createHash("sha256").update(rawString).digest("hex").slice(0, 16);
}

// 增加阅读量 (非阻塞) - 使用 posts 表
export async function incrementViewCount(slug: string) {
  try {
    await db
      .update(posts)
      .set({ viewCount: sql`${posts.viewCount} + 1` })
      .where(eq(posts.slug, slug));

    return { success: true };
  } catch (error) {
    console.error("Failed to increment view count:", error);
    return { success: false, error: "Failed to increment view count" };
  }
}

// 获取文章统计数据 - 使用 posts 表
export async function getPostStats(slug: string) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: { viewCount: true, likeCount: true },
    });
    return { 
      viewCount: post?.viewCount || 0, 
      likeCount: post?.likeCount || 0 
    };
  } catch (error) {
    console.error("Failed to get post stats:", error);
    return { viewCount: 0, likeCount: 0 };
  }
}

// 增加点赞 (带会话限制) - 使用 posts 表
export async function incrementLikeCount(slug: string) {
  const MAX_LIKES_PER_SESSION = 50;

  try {
    const sessionHash = await getSessionHash();
    
    // 获取会话点赞记录
    if (!sessionLikesStore.has(sessionHash)) {
      sessionLikesStore.set(sessionHash, new Map());
    }
    const sessionLikes = sessionLikesStore.get(sessionHash)!;
    const currentLikes = sessionLikes.get(slug) || 0;

    if (currentLikes >= MAX_LIKES_PER_SESSION) {
      return { 
        success: false, 
        error: "已达到点赞上限",
        currentLikes 
      };
    }

    // 更新会话记录
    sessionLikes.set(slug, currentLikes + 1);

    // 更新文章总点赞数
    await db
      .update(posts)
      .set({ likeCount: sql`${posts.likeCount} + 1` })
      .where(eq(posts.slug, slug));

    // 获取更新后的数据
    const updatedPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: { likeCount: true },
    });

    revalidatePath(`/blog/${slug}`);

    return { 
      success: true, 
      likeCount: updatedPost?.likeCount || 0,
      sessionLikes: currentLikes + 1
    };
  } catch (error) {
    console.error("Failed to increment like count:", error);
    return { success: false, error: "Failed to increment like count" };
  }
}

// 获取用户会话的点赞次数
export async function getSessionLikes(slug: string) {
  try {
    const sessionHash = await getSessionHash();
    const sessionLikes = sessionLikesStore.get(sessionHash);
    return sessionLikes?.get(slug) || 0;
  } catch (error) {
    console.error("Failed to get session likes:", error);
    return 0;
  }
}
