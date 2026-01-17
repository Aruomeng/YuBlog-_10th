"use client";

import { subscribeToNewsletter } from "@/actions/newsletter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail, Check, Loader2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        formRef.current?.reset();
        setSuccess(true);
      } else {
        setError(result.error || "订阅失败");
      }
    });
  }

  if (success) {
    return (
      <motion.div
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30",
          className
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">订阅成功！</p>
          <p className="text-xs text-zinc-400">欢迎邮件已发送，请查收</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-zinc-400">
        <Mail className="w-4 h-4" />
        <span className="text-sm">订阅更新</span>
      </div>

      <form ref={formRef} action={handleSubmit}>
        <div className="flex gap-2">
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            disabled={isPending}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-lg",
              "bg-zinc-900 border border-zinc-700",
              "text-white text-sm placeholder:text-zinc-500",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              "disabled:opacity-50",
              "transition-all"
            )}
          />
          <motion.button
            type="submit"
            disabled={isPending}
            className={cn(
              "px-4 py-2.5 rounded-lg",
              "bg-gradient-to-r from-purple-500 to-pink-500",
              "text-white text-sm font-medium",
              "hover:opacity-90 disabled:opacity-50",
              "transition-all",
              "flex items-center gap-2"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "订阅"
            )}
          </motion.button>
        </div>
      </form>

      {error && (
        <motion.p
          className="text-xs text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      <p className="text-xs text-zinc-600">
        我们尊重你的隐私，不会发送垃圾邮件
      </p>
    </div>
  );
}
