"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataCard } from "@/components/admin/stats-card";
import { FormField, Input, Textarea, Button } from "@/components/admin/modal";
import { updateSiteConfig } from "@/actions/admin";

interface SettingsFormProps {
  initialConfig: Record<string, string>;
}

const configFields = [
  { key: "siteName", label: "站点名称", placeholder: "YuBlog", type: "input" },
  { key: "siteDescription", label: "站点描述", placeholder: "一个技术博客", type: "textarea" },
  { key: "authorName", label: "作者名称", placeholder: "Yu", type: "input" },
  { key: "authorTitle", label: "作者头衔", placeholder: "全栈开发者", type: "input" },
  { key: "authorBio", label: "作者简介", placeholder: "热爱技术...", type: "textarea" },
  { key: "githubUrl", label: "GitHub 链接", placeholder: "https://github.com/...", type: "input" },
];

export function SettingsForm({ initialConfig }: SettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [config, setConfig] = useState(initialConfig);
  const [savedKeys, setSavedKeys] = useState<string[]>([]);

  const handleSave = (key: string) => {
    startTransition(async () => {
      const result = await updateSiteConfig(key, config[key] || "");
      if (result.success) {
        setSavedKeys((prev) => [...prev, key]);
        setTimeout(() => {
          setSavedKeys((prev) => prev.filter((k) => k !== key));
        }, 2000);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleSaveAll = () => {
    startTransition(async () => {
      for (const field of configFields) {
        if (config[field.key] !== initialConfig[field.key]) {
          await updateSiteConfig(field.key, config[field.key] || "");
        }
      }
      router.refresh();
      alert("所有设置已保存");
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 站点信息 */}
        <DataCard title="站点信息">
          <div className="space-y-4">
            {configFields.slice(0, 2).map((field) => (
              <div key={field.key} className="space-y-2">
                <FormField label={field.label}>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      rows={3}
                      value={config[field.key] || ""}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  ) : (
                    <Input
                      placeholder={field.placeholder}
                      value={config[field.key] || ""}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  )}
                </FormField>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSave(field.key)}
                    disabled={isPending}
                  >
                    {savedKeys.includes(field.key) ? "✓ 已保存" : "保存"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DataCard>

        {/* 作者信息 */}
        <DataCard title="作者信息">
          <div className="space-y-4">
            {configFields.slice(2, 5).map((field) => (
              <div key={field.key} className="space-y-2">
                <FormField label={field.label}>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      rows={3}
                      value={config[field.key] || ""}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  ) : (
                    <Input
                      placeholder={field.placeholder}
                      value={config[field.key] || ""}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  )}
                </FormField>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSave(field.key)}
                    disabled={isPending}
                  >
                    {savedKeys.includes(field.key) ? "✓ 已保存" : "保存"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DataCard>

        {/* 社交链接 */}
        <DataCard title="社交链接" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configFields.slice(5).map((field) => (
              <div key={field.key} className="space-y-2">
                <FormField label={field.label}>
                  <Input
                    placeholder={field.placeholder}
                    value={config[field.key] || ""}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                  />
                </FormField>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSave(field.key)}
                    disabled={isPending}
                  >
                    {savedKeys.includes(field.key) ? "✓ 已保存" : "保存"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DataCard>
      </div>

      {/* 全部保存 */}
      <div className="flex justify-end">
        <Button onClick={handleSaveAll} isLoading={isPending}>
          保存所有更改
        </Button>
      </div>
    </div>
  );
}
