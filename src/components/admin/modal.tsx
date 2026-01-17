"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  // 关闭时禁用 body 滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={cn(
                "w-full pointer-events-auto",
                "bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl",
                "max-h-[90vh] overflow-hidden flex flex-col",
                sizeClasses[size]
              )}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}

export function FormField({ label, children, error, required }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2.5 rounded-lg",
        "bg-zinc-800/50 border border-zinc-700",
        "text-white placeholder-zinc-500",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500",
        "transition-all",
        error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-2.5 rounded-lg resize-none",
        "bg-zinc-800/50 border border-zinc-700",
        "text-white placeholder-zinc-500",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500",
        "transition-all",
        error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

export function Select({ className, error, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full px-4 py-2.5 rounded-lg",
        "bg-zinc-800/50 border border-zinc-700",
        "text-white",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500",
        "transition-all",
        error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          处理中...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
