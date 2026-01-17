"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  onEdit,
  onDelete,
  emptyMessage = "暂无数据",
  isLoading = false,
}: DataTableProps<T>) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (item: T) => {
    if (!onDelete) return;
    setDeletingId(String(item[keyField]));
    await onDelete(item);
    setDeletingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-sm font-medium text-zinc-400",
                  column.className
                )}
              >
                {column.title}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400 w-32">
                操作
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[keyField])}
              className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-4 py-4 text-sm text-zinc-300",
                    column.className
                  )}
                >
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
                      >
                        编辑
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === String(item[keyField])}
                        className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === String(item[keyField]) ? "删除中..." : "删除"}
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
