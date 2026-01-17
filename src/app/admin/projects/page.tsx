import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { DataCard } from "@/components/admin/stats-card";
import { ProjectsManager } from "./projects-manager";

export const dynamic = "force-dynamic";

async function getAllProjects() {
  try {
    return await db.select().from(projects).orderBy(desc(projects.sortOrder));
  } catch (error) {
    console.error("Failed to get projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">项目管理</h1>
        <p className="text-zinc-400">管理您的开源项目和作品集</p>
      </div>

      <DataCard>
        <ProjectsManager projects={allProjects} />
      </DataCard>
    </div>
  );
}
