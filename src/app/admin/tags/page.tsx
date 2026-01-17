import { db } from "@/db";
import { tags } from "@/db/schema";
import { DataCard } from "@/components/admin/stats-card";
import { TagsManager } from "./tags-manager";

export const dynamic = "force-dynamic";

async function getAllTags() {
  try {
    return await db.select().from(tags);
  } catch (error) {
    console.error("Failed to get tags:", error);
    return [];
  }
}

export default async function TagsPage() {
  const allTags = await getAllTags();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">标签管理</h1>
        <p className="text-zinc-400">管理博客文章的分类标签</p>
      </div>

      {/* Tags Manager */}
      <DataCard>
        <TagsManager tags={allTags} />
      </DataCard>
    </div>
  );
}
