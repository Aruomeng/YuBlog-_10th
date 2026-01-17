import { db } from "@/db";
import { projects, Project } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// 获取所有项目
export async function getAllProjects(): Promise<Project[]> {
  try {
    const allProjects = await db.query.projects.findMany({
      orderBy: [desc(projects.featured), projects.sortOrder],
    });
    return allProjects;
  } catch (error) {
    console.error("Failed to get projects:", error);
    return [];
  }
}

// 获取精选项目
export async function getFeaturedProjects(limit: number = 4): Promise<Project[]> {
  try {
    const featuredProjects = await db.query.projects.findMany({
      where: eq(projects.featured, true),
      orderBy: [projects.sortOrder],
      limit,
    });
    return featuredProjects;
  } catch (error) {
    console.error("Failed to get featured projects:", error);
    return [];
  }
}

// 解析技术栈 JSON
export function parseTechStack(techStack: string | null): string[] {
  if (!techStack) return [];
  try {
    return JSON.parse(techStack);
  } catch {
    return [];
  }
}
