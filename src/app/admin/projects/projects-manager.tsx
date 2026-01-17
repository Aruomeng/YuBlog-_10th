"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Modal, FormField, Input, Textarea, Select, Button } from "@/components/admin/modal";
import { createProject, updateProject, deleteProject } from "@/actions/admin";

interface Project {
  id: number;
  title: string;
  description: string | null;
  techStack: string | null;
  github: string | null;
  link: string | null;
  status: string | null;
  featured: boolean | null;
}

interface ProjectsManagerProps {
  projects: Project[];
}

const statusOptions = [
  { value: "in_progress", label: "进行中" },
  { value: "completed", label: "已完成" },
  { value: "maintaining", label: "维护中" },
];

export function ProjectsManager({ projects }: ProjectsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    link: "",
    status: "in_progress",
    featured: false,
  });

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description || "",
        techStack: project.techStack || "",
        github: project.github || "",
        link: project.link || "",
        status: project.status || "in_progress",
        featured: project.featured || false,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        techStack: "",
        github: "",
        link: "",
        status: "in_progress",
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) {
      alert("请填写项目名称");
      return;
    }

    startTransition(async () => {
      const result = editingProject
        ? await updateProject(editingProject.id, formData)
        : await createProject(formData);

      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`确定要删除项目 "${project.title}" 吗？`)) return;
    
    const result = await deleteProject(project.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "title",
      title: "项目名称",
      render: (p: Project) => (
        <div>
          <span className="font-medium text-white">{p.title}</span>
          {p.featured && <span className="ml-2 text-yellow-400">⭐</span>}
        </div>
      ),
    },
    {
      key: "status",
      title: "状态",
      render: (p: Project) => {
        const status = statusOptions.find((s) => s.value === p.status);
        return (
          <span className="text-zinc-400">{status?.label || p.status}</span>
        );
      },
    },
    {
      key: "techStack",
      title: "技术栈",
      render: (p: Project) => (
        <span className="text-zinc-500 text-xs">{p.techStack}</span>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => openModal()}>+ 新建项目</Button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        keyField="id"
        onEdit={openModal}
        onDelete={handleDelete}
        emptyMessage="暂无项目"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "编辑项目" : "新建项目"}
        size="lg"
      >
        <div className="space-y-4">
          <FormField label="项目名称" required>
            <Input
              placeholder="如：YuBlog v10"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </FormField>

          <FormField label="项目描述">
            <Textarea
              placeholder="简要描述项目功能..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </FormField>

          <FormField label="技术栈">
            <Input
              placeholder="Next.js, TypeScript, Tailwind CSS"
              value={formData.techStack}
              onChange={(e) => setFormData((prev) => ({ ...prev, techStack: e.target.value }))}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="GitHub 链接">
              <Input
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
              />
            </FormField>

            <FormField label="演示链接">
              <Input
                placeholder="https://..."
                value={formData.link}
                onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="状态">
              <Select
                options={statusOptions}
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              />
            </FormField>

            <FormField label="精选">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-zinc-300">在首页展示</span>
              </label>
            </FormField>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} isLoading={isPending}>
              {editingProject ? "保存" : "创建"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
