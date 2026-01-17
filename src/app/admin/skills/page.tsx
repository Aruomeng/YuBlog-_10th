import { db } from "@/db";
import { skills } from "@/db/schema";
import { asc } from "drizzle-orm";
import { DataCard } from "@/components/admin/stats-card";
import { SkillsManager } from "./skills-manager";

export const dynamic = "force-dynamic";

async function getAllSkills() {
  try {
    return await db.select().from(skills).orderBy(asc(skills.category), asc(skills.sortOrder));
  } catch (error) {
    console.error("Failed to get skills:", error);
    return [];
  }
}

export default async function SkillsPage() {
  const allSkills = await getAllSkills();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">技能管理</h1>
        <p className="text-zinc-400">管理您的技能栈</p>
      </div>

      <DataCard>
        <SkillsManager skills={allSkills} />
      </DataCard>
    </div>
  );
}
