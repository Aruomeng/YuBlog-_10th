import { db } from "@/db";
import { siteConfig } from "@/db/schema";
import { DataCard } from "@/components/admin/stats-card";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

async function getAllConfig() {
  try {
    const configs = await db.select().from(siteConfig);
    const configMap: Record<string, string> = {};
    configs.forEach((c) => {
      configMap[c.key] = c.value;
    });
    return configMap;
  } catch (error) {
    console.error("Failed to get site config:", error);
    return {};
  }
}

export default async function SettingsPage() {
  const config = await getAllConfig();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">站点设置</h1>
        <p className="text-zinc-400">配置博客的基本信息</p>
      </div>

      <SettingsForm initialConfig={config} />
    </div>
  );
}
