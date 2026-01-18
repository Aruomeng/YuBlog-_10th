"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { DataCard } from "@/components/admin/stats-card";
import { FormField, Input, Textarea, Button } from "@/components/admin/modal";
import { updatePost } from "@/actions/admin";
import { useSidebar } from "@/components/admin/sidebar-context";
import { cn } from "@/lib/utils";

interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string | null;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  readTime: string | null;
  published: boolean | null;
  postTags: { tag: Tag }[];
}

interface EditPostFormProps {
  post: Post;
  tags: Tag[];
}

export function EditPostForm({ post, tags }: EditPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isImmersive, toggleImmersive, setImmersive } = useSidebar();
  
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    description: post.description || "",
    content: post.content,
    readTime: post.readTime || "",
    published: post.published ?? false,
    tagIds: post.postTags.map((pt) => pt.tag.id),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 快捷键支持：Escape 退出沉浸模式，Cmd/Ctrl + Shift + F 切换
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isImmersive) {
        setImmersive(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleImmersive();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImmersive, toggleImmersive, setImmersive]);

  // 退出页面时恢复非沉浸模式
  useEffect(() => {
    const cleanup = () => setImmersive(false);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTagToggle = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "请输入标题";
    if (!formData.slug) newErrors.slug = "请输入 URL 别名";
    if (!formData.content) newErrors.content = "请输入文章内容";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (publish: boolean) => {
    if (!validate()) return;

    startTransition(async () => {
      const result = await updatePost(post.id, {
        ...formData,
        published: publish,
      });

      if (result.success) {
        router.push("/admin/posts");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header - 沉浸模式下只显示工具栏 */}
      <div
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-in-out",
          isImmersive ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">编辑文章</h1>
          <p className="text-zinc-400">修改文章内容</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => router.back()}
          >
            取消
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSubmit(false)}
            isLoading={isPending}
          >
            保存草稿
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            isLoading={isPending}
          >
            {formData.published ? "更新文章" : "发布文章"}
          </Button>
        </div>
      </div>

      {/* 沉浸模式工具栏 */}
      <div
        className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-2 transition-all duration-500 ease-in-out",
          isImmersive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <Button
          variant="secondary"
          onClick={() => handleSubmit(false)}
          isLoading={isPending}
        >
          保存草稿
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          isLoading={isPending}
        >
          {formData.published ? "更新" : "发布"}
        </Button>
        <button
          onClick={() => setImmersive(false)}
          className="p-2 rounded-lg bg-zinc-800/80 backdrop-blur text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          title="退出沉浸模式 (Esc)"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 沉浸模式切换按钮 */}
      <button
        onClick={toggleImmersive}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300",
          isImmersive ? "opacity-0 pointer-events-none scale-75" : "opacity-100 hover:scale-105"
        )}
        title="进入沉浸模式 (⌘+Shift+F)"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>

      <div className={cn(
        "grid gap-8 transition-all duration-500 ease-in-out",
        isImmersive ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
      )}>
        {/* Main Content */}
        <div className={cn(
          "space-y-6 transition-all duration-500 ease-in-out",
          isImmersive ? "col-span-1" : "lg:col-span-2"
        )}>
          {/* Title */}
          <div className={cn(
            "transition-all duration-500 ease-in-out",
            isImmersive ? "bg-transparent border-none p-0" : ""
          )}>
            <DataCard className={isImmersive ? "bg-transparent border-none shadow-none" : ""}>
              <FormField label={isImmersive ? "" : "文章标题"} required={!isImmersive} error={errors.title}>
                <Input
                  placeholder="输入一个吸引人的标题..."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  error={!!errors.title}
                  className={cn(
                    "transition-all duration-500",
                    isImmersive ? "text-2xl font-bold bg-transparent border-none px-0 focus:ring-0" : ""
                  )}
                />
              </FormField>
            </DataCard>
          </div>

          {/* Content */}
          <DataCard 
            title={isImmersive ? "" : "文章内容"}
            className={isImmersive ? "bg-transparent border-none shadow-none" : ""}
          >
            {errors.content && (
              <p className="text-xs text-red-400 mb-2">{errors.content}</p>
            )}
            <MarkdownEditor
              value={formData.content}
              onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              height={isImmersive ? 700 : 600}
            />
          </DataCard>
        </div>

        {/* Sidebar - 沉浸模式下隐藏 */}
        <div className={cn(
          "space-y-6 transition-all duration-500 ease-in-out",
          isImmersive ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          {/* Status */}
          <DataCard title="发布状态">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  formData.published ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              <span className="text-zinc-300">
                {formData.published ? "已发布" : "草稿"}
              </span>
            </div>
          </DataCard>

          {/* Slug */}
          <DataCard title="URL 设置">
            <FormField label="URL 别名" required error={errors.slug}>
              <Input
                placeholder="my-awesome-post"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                error={!!errors.slug}
              />
              <p className="text-xs text-zinc-500 mt-1">
                文章地址: /blog/{formData.slug || "xxx"}
              </p>
            </FormField>
          </DataCard>

          {/* Description */}
          <DataCard title="SEO 设置">
            <FormField label="文章描述">
              <Textarea
                placeholder="简短描述这篇文章的内容..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </FormField>
            <div className="mt-4">
              <FormField label="阅读时间">
                <Input
                  placeholder="5 分钟"
                  value={formData.readTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                />
              </FormField>
            </div>
          </DataCard>

          {/* Tags */}
          <DataCard title="标签">
            {tags.length === 0 ? (
              <p className="text-zinc-500 text-sm">暂无标签</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const color = tag.color || "#8B5CF6";
                  const isSelected = formData.tagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className="px-3 py-1.5 text-sm rounded-lg border transition-colors"
                      style={{
                        backgroundColor: isSelected ? `${color}20` : "transparent",
                        borderColor: isSelected ? `${color}50` : "#3f3f46",
                        color: isSelected ? color : "#a1a1aa",
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            )}
          </DataCard>
        </div>
      </div>
    </div>
  );
}

