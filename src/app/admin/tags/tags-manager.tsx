"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Modal, FormField, Input, Button } from "@/components/admin/modal";
import { ColorPicker } from "@/components/admin/color-picker";
import { createTag, updateTag, deleteTag } from "@/actions/admin";

interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string | null;
}

interface TagsManagerProps {
  tags: Tag[];
}

export function TagsManager({ tags }: TagsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", color: "" });

  const openModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      setFormData({ name: tag.name, slug: tag.slug, color: tag.color || "" });
    } else {
      setEditingTag(null);
      setFormData({ name: "", slug: "", color: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.slug) {
      alert("请填写名称和别名");
      return;
    }

    startTransition(async () => {
      const result = editingTag
        ? await updateTag(editingTag.id, formData)
        : await createTag(formData);

      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`确定要删除标签 "${tag.name}" 吗？`)) return;
    
    const result = await deleteTag(tag.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "name",
      title: "标签名称",
      render: (tag: Tag) => (
        <span className="font-medium text-white">{tag.name}</span>
      ),
    },
    {
      key: "slug",
      title: "别名",
      render: (tag: Tag) => (
        <span className="text-zinc-500">/{tag.slug}</span>
      ),
    },
    {
      key: "color",
      title: "颜色",
      render: (tag: Tag) => (
        <div className="flex items-center gap-2">
          {tag.color ? (
            <>
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              <span className="text-zinc-500">{tag.color}</span>
            </>
          ) : (
            <span className="text-zinc-600">默认</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => openModal()}>+ 新建标签</Button>
      </div>

      <DataTable
        columns={columns}
        data={tags}
        keyField="id"
        onEdit={openModal}
        onDelete={handleDelete}
        emptyMessage="暂无标签"
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTag ? "编辑标签" : "新建标签"}
      >
        <div className="space-y-4">
          <FormField label="标签名称" required>
            <Input
              placeholder="如：Next.js"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  name,
                  slug: prev.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                }));
              }}
            />
          </FormField>

          <FormField label="别名 (URL)" required>
            <Input
              placeholder="如：nextjs"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            />
          </FormField>

          <FormField label="标签颜色">
            <ColorPicker
              value={formData.color}
              onChange={(color) => setFormData((prev) => ({ ...prev, color }))}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} isLoading={isPending}>
              {editingTag ? "保存" : "创建"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
