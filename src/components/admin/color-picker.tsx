"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

// 标准色卡 - 多种常用颜色
const colorPalette = [
  // 紫色系
  "#8B5CF6", "#A855F7", "#C084FC", "#7C3AED", "#6D28D9",
  // 粉色系
  "#EC4899", "#F472B6", "#DB2777", "#BE185D", "#9D174D",
  // 蓝色系
  "#3B82F6", "#60A5FA", "#2563EB", "#1D4ED8", "#1E40AF",
  // 青色系
  "#06B6D4", "#22D3EE", "#0891B2", "#0E7490", "#155E75",
  // 绿色系
  "#10B981", "#34D399", "#059669", "#047857", "#065F46",
  // 黄色系
  "#F59E0B", "#FBBF24", "#D97706", "#B45309", "#92400E",
  // 橙色系
  "#F97316", "#FB923C", "#EA580C", "#C2410C", "#9A3412",
  // 红色系
  "#EF4444", "#F87171", "#DC2626", "#B91C1C", "#991B1B",
  // 灰色系
  "#6B7280", "#9CA3AF", "#4B5563", "#374151", "#1F2937",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value || "");
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    // 验证是否是有效的颜色格式
    if (/^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color)) {
      onChange(color);
    }
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value.toUpperCase();
    onChange(color);
    setCustomColor(color);
  };

  return (
    <div className="space-y-3">
      {/* 当前颜色显示和输入 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="#8B5CF6"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value.toUpperCase())}
            className={cn(
              "w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              "placeholder:text-zinc-500"
            )}
          />
        </div>
        
        {/* 颜色预览 */}
        <div
          className={cn(
            "w-10 h-10 rounded-lg border-2 transition-all cursor-pointer",
            value ? "border-zinc-600" : "border-dashed border-zinc-700"
          )}
          style={{ backgroundColor: value || "transparent" }}
          onClick={() => setIsOpen(!isOpen)}
          title="点击展开色卡"
        >
          {!value && (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
              ?
            </div>
          )}
        </div>

        {/* 原生颜色选择器（吸色器） */}
        <button
          type="button"
          onClick={() => nativeInputRef.current?.click()}
          className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center justify-center"
          title="使用吸色器"
        >
          <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>
        <input
          ref={nativeInputRef}
          type="color"
          value={value || "#8B5CF6"}
          onChange={handleNativePickerChange}
          className="sr-only"
        />
      </div>

      {/* 展开的色卡 */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">选择颜色</span>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setCustomColor("");
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                清除
              </button>
            )}
          </div>
          <div className="grid grid-cols-10 gap-1.5">
            {colorPalette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={cn(
                  "w-6 h-6 rounded-md transition-all hover:scale-110 hover:shadow-lg",
                  value === color && "ring-2 ring-white ring-offset-2 ring-offset-zinc-800"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 快速选择按钮 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">快速选择：</span>
        <div className="flex gap-1">
          {["#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={cn(
                "w-5 h-5 rounded-full transition-all hover:scale-110",
                value === color && "ring-2 ring-white"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-auto"
        >
          {isOpen ? "收起" : "更多颜色"}
        </button>
      </div>
    </div>
  );
}
