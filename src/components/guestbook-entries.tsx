"use client";

import { GuestbookEntry } from "@/db/schema";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface GuestbookEntriesProps {
  entries: GuestbookEntry[];
}

export function GuestbookEntries({ entries }: GuestbookEntriesProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500">还没有留言，成为第一个留言的人吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-6">
        全部留言 ({entries.length})
      </h2>
      
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-start gap-3">
            {entry.userImage ? (
              <img
                src={entry.userImage}
                alt={entry.userName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {entry.userName.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white text-sm">
                  {entry.userName}
                </span>
                <span className="text-xs text-zinc-600">
                  {entry.createdAt 
                    ? formatDistanceToNow(new Date(entry.createdAt), {
                        addSuffix: true,
                        locale: zhCN,
                      })
                    : "刚刚"
                  }
                </span>
              </div>
              <p className="text-zinc-300 text-sm break-words">
                {entry.message}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
