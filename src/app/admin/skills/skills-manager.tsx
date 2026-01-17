"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Modal, FormField, Input, Button } from "@/components/admin/modal";
import { createSkill, updateSkill, deleteSkill } from "@/actions/admin";

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  level: number | null;
}

interface SkillsManagerProps {
  skills: Skill[];
}

export function SkillsManager({ skills }: SkillsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    level: 0,
  });

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        icon: skill.icon || "",
        level: skill.level || 0,
      });
    } else {
      setEditingSkill(null);
      setFormData({ name: "", category: "", icon: "", level: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category) {
      alert("请填写名称和分类");
      return;
    }

    startTransition(async () => {
      const result = editingSkill
        ? await updateSkill(editingSkill.id, formData)
        : await createSkill(formData);

      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = async (skill: Skill) => {
    if (!confirm(`确定要删除技能 "${skill.name}" 吗？`)) return;
    
    const result = await deleteSkill(skill.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "name",
      title: "技能名称",
      render: (s: Skill) => (
        <span className="font-medium text-white">{s.name}</span>
      ),
    },
    {
      key: "category",
      title: "分类",
      render: (s: Skill) => (
        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
          {s.category}
        </span>
      ),
    },
    {
      key: "icon",
      title: "图标",
      render: (s: Skill) => (
        <span className="text-zinc-500">{s.icon || "-"}</span>
      ),
    },
  ];

  // 按分类分组
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
            >
              {cat}: {skills.filter((s) => s.category === cat).length}
            </span>
          ))}
        </div>
        <Button onClick={() => openModal()}>+ 新建技能</Button>
      </div>

      <DataTable
        columns={columns}
        data={skills}
        keyField="id"
        onEdit={openModal}
        onDelete={handleDelete}
        emptyMessage="暂无技能"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? "编辑技能" : "新建技能"}
      >
        <div className="space-y-4">
          <FormField label="技能名称" required>
            <Input
              placeholder="如：React"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </FormField>

          <FormField label="分类" required>
            <Input
              placeholder="如：前端"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            />
            <p className="text-xs text-zinc-500 mt-1">
              现有分类: {categories.join(", ") || "暂无"}
            </p>
          </FormField>

          <FormField label="图标 (Emoji)">
            <Input
              placeholder="如：⚛️"
              value={formData.icon}
              onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} isLoading={isPending}>
              {editingSkill ? "保存" : "创建"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
