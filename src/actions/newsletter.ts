"use server";

import { db, subscribers } from "@/db";
import { Resend } from "resend";
import { z } from "zod";
import { WelcomeEmail } from "@/emails/welcome";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

// 验证 Schema
const emailSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
});

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  // 验证邮箱
  const validation = emailSchema.safeParse({ email });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0].message,
    };
  }

  try {
    // 检查是否已订阅
    const existing = await db.query.subscribers.findFirst({
      where: eq(subscribers.email, validation.data.email),
    });

    if (existing) {
      return {
        success: false,
        error: "该邮箱已订阅",
      };
    }

    // 保存到数据库
    await db.insert(subscribers).values({
      email: validation.data.email,
    });

    // 发送欢迎邮件
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "YuBlog <hello@yourblog.com>",
        to: validation.data.email,
        subject: "🎉 欢迎订阅 YuBlog！",
        react: WelcomeEmail({ email: validation.data.email }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return {
      success: false,
      error: "订阅失败，请稍后重试",
    };
  }
}

// 取消订阅
export async function unsubscribe(email: string) {
  try {
    await db.delete(subscribers).where(eq(subscribers.email, email));
    return { success: true };
  } catch (error) {
    console.error("Failed to unsubscribe:", error);
    return { success: false, error: "取消订阅失败" };
  }
}
