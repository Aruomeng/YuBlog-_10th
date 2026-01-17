"use server";

import { db } from "@/db";
import { posts, tags, postTags, projects, skills, timelineEvents, siteConfig, guestbookEntries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ==================== 文章管理 ====================

export async function createPost(data: {
  title: string;
  slug: string;
  description?: string;
  content: string;
  coverImage?: string;
  published: boolean;
  readTime?: string;
  tagIds?: number[];
}) {
  try {
    const [post] = await db
      .insert(posts)
      .values({
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        readTime: data.readTime,
      })
      .returning();

    // 关联标签
    if (data.tagIds && data.tagIds.length > 0) {
      await db.insert(postTags).values(
        data.tagIds.map((tagId) => ({
          postId: post.id,
          tagId,
        }))
      );
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "创建文章失败" };
  }
}

export async function updatePost(
  id: number,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    content?: string;
    coverImage?: string;
    published?: boolean;
    readTime?: string;
    tagIds?: number[];
  }
) {
  try {
    const updateData: Record<string, any> = { ...data, updatedAt: new Date() };
    delete updateData.tagIds;

    // 如果从未发布改为发布，设置发布时间
    if (data.published) {
      const [existingPost] = await db.select().from(posts).where(eq(posts.id, id));
      if (existingPost && !existingPost.published) {
        updateData.publishedAt = new Date();
      }
    }

    await db.update(posts).set(updateData).where(eq(posts.id, id));

    // 更新标签关联
    if (data.tagIds !== undefined) {
      await db.delete(postTags).where(eq(postTags.postId, id));
      if (data.tagIds.length > 0) {
        await db.insert(postTags).values(
          data.tagIds.map((tagId) => ({
            postId: id,
            tagId,
          }))
        );
      }
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { success: false, error: "更新文章失败" };
  }
}

export async function deletePost(id: number) {
  try {
    await db.delete(postTags).where(eq(postTags.postId, id));
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "删除文章失败" };
  }
}

export async function getPostById(id: number) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to get post:", error);
    return null;
  }
}

// ==================== 项目管理 ====================

export async function createProject(data: {
  title: string;
  description?: string;
  techStack?: string;
  github?: string;
  link?: string;
  status?: string;
  featured?: boolean;
}) {
  try {
    const [maxOrder] = await db
      .select({ max: projects.sortOrder })
      .from(projects);
    
    await db.insert(projects).values({
      ...data,
      sortOrder: (maxOrder?.max || 0) + 1,
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "创建项目失败" };
  }
}

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
  try {
    await db.update(projects).set(data).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "更新项目失败" };
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "删除项目失败" };
  }
}

// ==================== 标签管理 ====================

export async function createTag(data: { name: string; slug: string; color?: string }) {
  try {
    await db.insert(tags).values(data);
    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    console.error("Failed to create tag:", error);
    return { success: false, error: "创建标签失败" };
  }
}

export async function updateTag(id: number, data: { name?: string; slug?: string; color?: string }) {
  try {
    await db.update(tags).set(data).where(eq(tags.id, id));
    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    console.error("Failed to update tag:", error);
    return { success: false, error: "更新标签失败" };
  }
}

export async function deleteTag(id: number) {
  try {
    await db.delete(postTags).where(eq(postTags.tagId, id));
    await db.delete(tags).where(eq(tags.id, id));
    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete tag:", error);
    return { success: false, error: "删除标签失败" };
  }
}

// ==================== 技能管理 ====================

export async function createSkill(data: { name: string; category: string; icon?: string; level?: number }) {
  try {
    const [maxOrder] = await db
      .select({ max: skills.sortOrder })
      .from(skills);
    
    await db.insert(skills).values({
      ...data,
      sortOrder: (maxOrder?.max || 0) + 1,
    });
    revalidatePath("/admin/skills");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to create skill:", error);
    return { success: false, error: "创建技能失败" };
  }
}

export async function updateSkill(id: number, data: Partial<typeof skills.$inferInsert>) {
  try {
    await db.update(skills).set(data).where(eq(skills.id, id));
    revalidatePath("/admin/skills");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to update skill:", error);
    return { success: false, error: "更新技能失败" };
  }
}

export async function deleteSkill(id: number) {
  try {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath("/admin/skills");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return { success: false, error: "删除技能失败" };
  }
}

// ==================== 时间线管理 ====================

export async function createTimelineEvent(data: { year: string; title: string; description?: string; icon?: string }) {
  try {
    const [maxOrder] = await db
      .select({ max: timelineEvents.sortOrder })
      .from(timelineEvents);
    
    await db.insert(timelineEvents).values({
      ...data,
      sortOrder: (maxOrder?.max || 0) + 1,
    });
    revalidatePath("/admin/timeline");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to create timeline event:", error);
    return { success: false, error: "创建时间线事件失败" };
  }
}

export async function updateTimelineEvent(id: number, data: Partial<typeof timelineEvents.$inferInsert>) {
  try {
    await db.update(timelineEvents).set(data).where(eq(timelineEvents.id, id));
    revalidatePath("/admin/timeline");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to update timeline event:", error);
    return { success: false, error: "更新时间线事件失败" };
  }
}

export async function deleteTimelineEvent(id: number) {
  try {
    await db.delete(timelineEvents).where(eq(timelineEvents.id, id));
    revalidatePath("/admin/timeline");
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete timeline event:", error);
    return { success: false, error: "删除时间线事件失败" };
  }
}

// ==================== 站点配置 ====================

export async function updateSiteConfig(key: string, value: string) {
  try {
    const existing = await db.select().from(siteConfig).where(eq(siteConfig.key, key));
    
    if (existing.length > 0) {
      await db.update(siteConfig).set({ value }).where(eq(siteConfig.key, key));
    } else {
      await db.insert(siteConfig).values({ key, value });
    }
    
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update site config:", error);
    return { success: false, error: "更新配置失败" };
  }
}

// ==================== 留言管理 ====================

export async function deleteGuestbookEntry(id: number) {
  try {
    await db.delete(guestbookEntries).where(eq(guestbookEntries.id, id));
    revalidatePath("/admin/guestbook");
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete guestbook entry:", error);
    return { success: false, error: "删除留言失败" };
  }
}
