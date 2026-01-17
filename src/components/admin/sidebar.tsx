"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

const navItems = [
  {
    title: "仪表盘",
    href: "/admin",
    icon: "📊",
  },
  {
    title: "文章管理",
    href: "/admin/posts",
    icon: "📝",
  },
  {
    title: "项目管理",
    href: "/admin/projects",
    icon: "🚀",
  },
  {
    title: "标签管理",
    href: "/admin/tags",
    icon: "🏷️",
  },
  {
    title: "技能管理",
    href: "/admin/skills",
    icon: "💡",
  },
  {
    title: "时间线",
    href: "/admin/timeline",
    icon: "📅",
  },
  {
    title: "留言管理",
    href: "/admin/guestbook",
    icon: "💬",
  },
  {
    title: "站点设置",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const navRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  // 计算当前活动项的位置
  useEffect(() => {
    if (navRef.current) {
      const activeIndex = navItems.findIndex((item) =>
        item.href === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(item.href)
      );
      
      if (activeIndex !== -1) {
        const navList = navRef.current;
        const items = navList.querySelectorAll('li');
        const activeItem = items[activeIndex] as HTMLElement;
        
        if (activeItem) {
          setIndicatorStyle({
            top: activeItem.offsetTop,
            height: activeItem.offsetHeight,
          });
        }
      }
    }
  }, [pathname]);

  return (
    <aside
      className={cn(
        "h-screen bg-zinc-900/95 border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-zinc-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
            Y
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            <h1 className="font-bold text-white whitespace-nowrap">YuBlog</h1>
            <p className="text-xs text-zinc-500 whitespace-nowrap">管理后台</p>
          </div>
        </Link>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shadow-lg"
        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        <svg
          className={cn(
            "w-3 h-3 transition-transform duration-300",
            isCollapsed ? "rotate-180" : ""
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul ref={navRef} className="space-y-1 relative">
          {/* 滑动指示器 */}
          <div
            className="absolute left-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out z-10"
            style={{
              top: indicatorStyle.top + 6,
              height: indicatorStyle.height - 12,
              opacity: indicatorStyle.height > 0 ? 1 : 0,
            }}
          />
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-white bg-zinc-800/50"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/30",
                    isCollapsed ? "justify-center" : "pl-5"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span
                    className={cn(
                      "overflow-hidden transition-all duration-300 whitespace-nowrap",
                      isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-800">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm text-zinc-500 hover:text-white transition-all duration-200 rounded-lg hover:bg-zinc-800/50",
            isCollapsed ? "justify-center" : ""
          )}
          title={isCollapsed ? "返回前台" : undefined}
        >
          <span className="flex-shrink-0">←</span>
          <span
            className={cn(
              "overflow-hidden transition-all duration-300 whitespace-nowrap",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            返回前台
          </span>
        </Link>
      </div>
    </aside>
  );
}


