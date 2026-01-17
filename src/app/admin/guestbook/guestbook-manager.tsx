"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { deleteGuestbookEntry } from "@/actions/admin";

interface GuestbookEntry {
  id: number;
  userName: string;
  createdByEmail: string | null;
  userImage: string | null;
  message: string;
  createdAt: Date | null;
}

interface GuestbookManagerProps {
  entries: GuestbookEntry[];
}

export function GuestbookManager({ entries }: GuestbookManagerProps) {
  const router = useRouter();

  const handleDelete = async (entry: GuestbookEntry) => {
    if (!confirm(`确定要删除这条留言吗？`)) return;
    
    const result = await deleteGuestbookEntry(entry.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const columns = [
    {
      key: "user",
      title: "用户",
      render: (e: GuestbookEntry) => (
        <div className="flex items-center gap-3">
          {e.userImage && (
            <img
              src={e.userImage}
              alt={e.userName}
              className="w-8 h-8 rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-white">{e.userName}</p>
            <p className="text-xs text-zinc-500">{e.createdByEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "message",
      title: "留言内容",
      render: (e: GuestbookEntry) => (
        <p className="text-zinc-300 max-w-[400px] truncate">{e.message}</p>
      ),
    },
    {
      key: "createdAt",
      title: "时间",
      render: (e: GuestbookEntry) => (
        <span className="text-zinc-500 text-sm">
          {e.createdAt?.toLocaleDateString("zh-CN")}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={entries}
      keyField="id"
      onDelete={handleDelete}
      emptyMessage="暂无留言"
    />
  );
}
