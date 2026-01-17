"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Modal, FormField, Input, Textarea, Button } from "@/components/admin/modal";
import { createTimelineEvent, updateTimelineEvent, deleteTimelineEvent } from "@/actions/admin";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string | null;
  icon: string | null;
}

interface TimelineManagerProps {
  events: TimelineEvent[];
}

export function TimelineManager({ events }: TimelineManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    icon: "",
  });

  const openModal = (event?: TimelineEvent) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        year: event.year,
        title: event.title,
        description: event.description || "",
        icon: event.icon || "",
      });
    } else {
      setEditingEvent(null);
      setFormData({ year: "", title: "", description: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.year || !formData.title) {
      alert("请填写年份和标题");
      return;
    }

    startTransition(async () => {
      const result = editingEvent
        ? await updateTimelineEvent(editingEvent.id, formData)
        : await createTimelineEvent(formData);

      if (result.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = async (event: TimelineEvent) => {
    if (!confirm(`确定要删除事件 "${event.title}" 吗？`)) return;
    
    const result = await deleteTimelineEvent(event.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "year",
      title: "年份",
      render: (e: TimelineEvent) => (
        <span className="font-medium text-purple-400">{e.year}</span>
      ),
    },
    {
      key: "title",
      title: "标题",
      render: (e: TimelineEvent) => (
        <span className="text-white">{e.title}</span>
      ),
    },
    {
      key: "description",
      title: "描述",
      render: (e: TimelineEvent) => (
        <span className="text-zinc-500 text-sm truncate max-w-[200px] block">
          {e.description || "-"}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => openModal()}>+ 新建事件</Button>
      </div>

      <DataTable
        columns={columns}
        data={events}
        keyField="id"
        onEdit={openModal}
        onDelete={handleDelete}
        emptyMessage="暂无时间线事件"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "编辑事件" : "新建事件"}
      >
        <div className="space-y-4">
          <FormField label="年份" required>
            <Input
              placeholder="如：2024"
              value={formData.year}
              onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
            />
          </FormField>

          <FormField label="标题" required>
            <Input
              placeholder="如：开始全栈开发之旅"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </FormField>

          <FormField label="描述">
            <Textarea
              placeholder="详细描述这个事件..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </FormField>

          <FormField label="图标 (Emoji)">
            <Input
              placeholder="如：🚀"
              value={formData.icon}
              onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} isLoading={isPending}>
              {editingEvent ? "保存" : "创建"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
