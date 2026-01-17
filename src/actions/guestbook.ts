"use server";

import { db, guestbookEntries } from "@/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { desc } from "drizzle-orm";

// 验证 Schema
const guestbookSchema = z.object({
  message: z
    .string()
    .min(1, "留言不能为空")
    .max(100, "留言最多 100 个字符")
    .refine(
      (msg) => !containsProfanity(msg),
      "留言包含不当内容"
    ),
});

// 简单的敏感词过滤
function containsProfanity(text: string): boolean {
  const profanityList = ["spam", "abuse", "hate"];
  const lowerText = text.toLowerCase();
  return profanityList.some((word) => lowerText.includes(word));
}

// 保存留言
export async function saveGuestbookEntry(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, error: "请先登录" };
  }

  const message = formData.get("message") as string;

  // 验证输入
  const validation = guestbookSchema.safeParse({ message });
  if (!validation.success) {
    return { 
      success: false, 
      error: validation.error.issues[0].message 
    };
  }

  try {
    await db.insert(guestbookEntries).values({
      userName: session.user.name || "匿名用户",
      message: validation.data.message,
      createdByEmail: session.user.email || undefined,
      userImage: session.user.image || undefined,
    });

    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Failed to save guestbook entry:", error);
    return { success: false, error: "保存失败，请稍后重试" };
  }
}

// 获取所有留言
export async function getGuestbookEntries() {
  try {
    const entries = await db.query.guestbookEntries.findMany({
      orderBy: [desc(guestbookEntries.createdAt)],
      limit: 100,
    });
    return entries;
  } catch (error) {
    console.error("Failed to get guestbook entries:", error);
    return [];
  }
}
