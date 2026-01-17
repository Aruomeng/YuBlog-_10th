import { db } from "@/db";
import { siteConfig, SiteConfig } from "@/db/schema";
import { eq } from "drizzle-orm";

// 获取站点配置值
export async function getConfigValue(key: string): Promise<string | null> {
  try {
    const config = await db.query.siteConfig.findFirst({
      where: eq(siteConfig.key, key),
    });
    return config?.value || null;
  } catch (error) {
    console.error(`Failed to get config ${key}:`, error);
    return null;
  }
}

// 获取多个配置值
export async function getConfigValues(keys: string[]): Promise<Record<string, string>> {
  try {
    const configs = await db.query.siteConfig.findMany();
    const result: Record<string, string> = {};
    
    for (const config of configs) {
      if (keys.includes(config.key)) {
        result[config.key] = config.value;
      }
    }
    
    return result;
  } catch (error) {
    console.error("Failed to get configs:", error);
    return {};
  }
}

// 获取所有配置
export async function getAllConfig(): Promise<SiteConfig[]> {
  try {
    const configs = await db.query.siteConfig.findMany();
    return configs;
  } catch (error) {
    console.error("Failed to get all configs:", error);
    return [];
  }
}

// 默认配置值
export const defaultConfig = {
  siteName: "YuBlog",
  siteDescription: "第十代个人博客",
  authorName: "Yu",
  authorTitle: "全栈开发者 | AI 爱好者",
  authorBio: "热衷于技术创新的开发者",
  authorImage: "/avatar.png",
  githubUrl: "https://github.com/Aruomeng",
  twitterUrl: "",
  linkedinUrl: "",
};
