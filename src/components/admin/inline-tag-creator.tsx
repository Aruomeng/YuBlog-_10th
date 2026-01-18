"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTag } from "@/actions/admin";
import { Input } from "@/components/admin/modal";
import { ColorPicker } from "@/components/admin/color-picker";

interface InlineTagCreatorProps {
  onTagCreated?: (tag: { id: number; name: string; slug: string; color: string | null }) => void;
}

export function InlineTagCreator({ onTagCreated }: InlineTagCreatorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", slug: "", color: "" });
  const [error, setError] = useState("");

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, ""),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setError("请输入标签名称");
      return;
    }

    setError("");
    startTransition(async () => {
      const result = await createTag({
        name: formData.name.trim(),
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        color: formData.color || undefined,
      });

      if (result.success) {
        // 重置表单
        setFormData({ name: "", slug: "", color: "" });
        setIsExpanded(false);
        
        // 通知父组件
        if (onTagCreated && "tag" in result && result.tag) {
          onTagCreated(result.tag);
        }
        
        // 刷新页面数据
        router.refresh();
      } else {
        setError(result.error || "创建失败");
      }
    });
  };

  const handleCancel = () => {
    setFormData({ name: "", slug: "", color: "" });
    setError("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="px-3 py-1.5 text-sm rounded-lg border border-dashed border-zinc-600 text-zinc-500 hover:border-zinc-500 hover:text-zinc-400 transition-colors flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        新建标签
      </button>
    );
  }

  return (
    <div className="w-full p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">新建标签</span>
        <button
          type="button"
          onClick={handleCancel}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 标签名称 */}
      <div>
        <label className="text-xs text-zinc-400 mb-1 block">标签名称 *</label>
        <Input
          placeholder="如：Next.js"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          error={!!error}
        />
      </div>

      {/* 别名 */}
      <div>
        <label className="text-xs text-zinc-400 mb-1 block">URL 别名</label>
        <Input
          placeholder="如：nextjs"
          value={formData.slug}
          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
        />
      </div>

      {/* 颜色 */}
      <div>
        <label className="text-xs text-zinc-400 mb-1 block">标签颜色</label>
        <ColorPicker
          value={formData.color}
          onChange={(color) => setFormData((prev) => ({ ...prev, color }))}
        />
      </div>

      {/* 错误信息 */}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {isPending ? "创建中..." : "创建标签"}
        </button>
      </div>
    </div>
  );
}
