"use client";

import { useState, useRef, useEffect } from "react";
import { BentoCard } from "@/components/bento/bento-card";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "你好！我是 AI 助手，有什么可以帮你的吗？" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `抱歉，${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "网络错误，请稍后再试。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <BentoCard colSpan={1} rowSpan={2} glowColor="rgba(168, 85, 247, 0.2)">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                "0 0 0 10px rgba(168, 85, 247, 0)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm">🤖</span>
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI 助手</h3>
            <p className="text-xs text-zinc-500">
              {isLoading ? "思考中..." : "由 Gemini 驱动"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-3 min-h-0">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-xs p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-purple-500/20 border border-purple-500/30 text-zinc-200 ml-4"
                    : "bg-zinc-800/50 text-zinc-300 mr-4"
                }`}
              >
                {msg.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 p-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="shrink-0">
          <div className="flex items-center gap-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 focus-within:border-purple-500/50 transition-colors">
            <input
              ref={inputRef}
              type="text"
              placeholder="输入消息..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 px-3 py-2 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 text-zinc-400 hover:text-purple-400 disabled:opacity-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1 text-center">
            按 ⌘K 聚焦输入框
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
