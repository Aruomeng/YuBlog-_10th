import { db } from "@/db";
import { skills, timelineEvents, Skill, TimelineEvent } from "@/db/schema";
import { asc } from "drizzle-orm";

// 获取所有技能（按分类分组）
export async function getAllSkills(): Promise<Record<string, Skill[]>> {
  try {
    const allSkills = await db.query.skills.findMany({
      orderBy: [skills.category, skills.sortOrder],
    });

    // 按分类分组
    const grouped: Record<string, Skill[]> = {};
    for (const skill of allSkills) {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    }

    return grouped;
  } catch (error) {
    console.error("Failed to get skills:", error);
    return {};
  }
}

// 获取时间线事件
export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  try {
    const events = await db.query.timelineEvents.findMany({
      orderBy: [asc(timelineEvents.sortOrder)],
    });
    return events;
  } catch (error) {
    console.error("Failed to get timeline events:", error);
    return [];
  }
}
