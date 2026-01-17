"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export function MarkdownEditor({ value, onChange, height = 500 }: MarkdownEditorProps) {
  return (
    <div data-color-mode="dark" className="rounded-lg overflow-hidden border border-zinc-700">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={height}
        preview="live"
        hideToolbar={false}
        enableScroll={true}
        visibleDragbar={false}
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
