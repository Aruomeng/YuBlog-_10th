import { db } from "@/db";
import { tags } from "@/db/schema";
import { NewPostForm } from "./new-post-form";

export const dynamic = "force-dynamic";

async function getAllTags() {
  try {
    return await db.select().from(tags);
  } catch (error) {
    console.error("Failed to get tags:", error);
    return [];
  }
}

export default async function NewPostPage() {
  const allTags = await getAllTags();
  
  return <NewPostForm tags={allTags} />;
}
