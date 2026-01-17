import { db } from "@/db";
import { posts, tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditPostForm } from "./edit-post-form";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

async function getPost(id: number) {
  try {
    return await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to get post:", error);
    return null;
  }
}

async function getAllTags() {
  try {
    return await db.select().from(tags);
  } catch (error) {
    console.error("Failed to get tags:", error);
    return [];
  }
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  
  if (isNaN(postId)) {
    notFound();
  }

  const [post, allTags] = await Promise.all([
    getPost(postId),
    getAllTags(),
  ]);

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} tags={allTags} />;
}
