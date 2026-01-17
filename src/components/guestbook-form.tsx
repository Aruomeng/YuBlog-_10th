"use client";

import { saveGuestbookEntry } from "@/actions/guestbook";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState, useTransition } from "react";
import { Send } from "lucide-react";

export function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await saveGuestbookEntry(formData);
      
      if (result.success) {
        formRef.current?.reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "提交失败");
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="relative">
      <div className="flex gap-3">
        <input
          name="message"
          type="text"
          placeholder="留下你的想法..."
          maxLength={100}
          required
          disabled={isPending}
          className={cn(
            "flex-1 px-4 py-3 rounded-xl",
            "bg-zinc-900 border border-zinc-700",
            "text-white placeholder:text-zinc-500",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all"
          )}
        />
        <motion.button
          type="submit"
          disabled={isPending}
          className={cn(
            "px-6 py-3 rounded-xl",
            "bg-gradient-to-r from-purple-500 to-pink-500",
            "text-white font-medium",
            "hover:opacity-90 disabled:opacity-50",
            "transition-all",
            "flex items-center gap-2"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPending ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              发送
            </>
          )}
        </motion.button>
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      {/* Success message */}
      {success && (
        <motion.p
          className="mt-2 text-sm text-green-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ 留言成功！
        </motion.p>
      )}

      <p className="mt-2 text-xs text-zinc-600">
        最多 100 个字符
      </p>
    </form>
  );
}
