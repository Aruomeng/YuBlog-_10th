import { db } from "@/db";
import { timelineEvents } from "@/db/schema";
import { asc } from "drizzle-orm";
import { DataCard } from "@/components/admin/stats-card";
import { TimelineManager } from "./timeline-manager";

export const dynamic = "force-dynamic";

async function getAllTimelineEvents() {
  try {
    return await db.select().from(timelineEvents).orderBy(asc(timelineEvents.sortOrder));
  } catch (error) {
    console.error("Failed to get timeline events:", error);
    return [];
  }
}

export default async function TimelinePage() {
  const events = await getAllTimelineEvents();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">时间线管理</h1>
        <p className="text-zinc-400">管理您的个人经历时间线</p>
      </div>

      <DataCard>
        <TimelineManager events={events} />
      </DataCard>
    </div>
  );
}
