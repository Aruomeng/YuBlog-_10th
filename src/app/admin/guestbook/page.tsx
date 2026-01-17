import { db } from "@/db";
import { guestbookEntries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { DataCard } from "@/components/admin/stats-card";
import { GuestbookManager } from "./guestbook-manager";

export const dynamic = "force-dynamic";

async function getAllEntries() {
  try {
    return await db.select().from(guestbookEntries).orderBy(desc(guestbookEntries.createdAt));
  } catch (error) {
    console.error("Failed to get guestbook entries:", error);
    return [];
  }
}

export default async function GuestbookAdminPage() {
  const entries = await getAllEntries();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">留言管理</h1>
        <p className="text-zinc-400">管理访客留言</p>
      </div>

      <DataCard>
        <GuestbookManager entries={entries} />
      </DataCard>
    </div>
  );
}
