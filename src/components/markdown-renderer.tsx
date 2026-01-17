"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // 自定义标题样式
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-white mt-6 mb-3 border-b border-zinc-800 pb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-white mt-5 mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">{children}</h4>
        ),
        // 段落
        p: ({ children }) => (
          <p className="text-zinc-300 leading-relaxed mb-4">{children}</p>
        ),
        // 链接
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            {children}
          </a>
        ),
        // 列表
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-zinc-300 space-y-1 mb-4 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-zinc-300 space-y-1 mb-4 ml-4">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-zinc-300">{children}</li>
        ),
        // 代码块
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-purple-300 text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} block`} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
            {children}
          </pre>
        ),
        // 引用
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-zinc-900/50 rounded-r-lg text-zinc-400 italic">
            {children}
          </blockquote>
        ),
        // 表格
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-zinc-800 rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-900">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left text-sm font-semibold text-white border-b border-zinc-800">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-sm text-zinc-300 border-b border-zinc-800">
            {children}
          </td>
        ),
        // 分割线
        hr: () => <hr className="border-zinc-800 my-8" />,
        // 图片
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ""}
            className="rounded-lg max-w-full h-auto my-4"
          />
        ),
        // 粗体和斜体
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-zinc-300">{children}</em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
