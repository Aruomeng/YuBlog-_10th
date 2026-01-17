"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { name: "首页", href: "/" },
  { name: "博客", href: "/blog" },
  { name: "项目", href: "/projects" },
  { name: "留言墙", href: "/guestbook" },
  { name: "关于", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // 初始化挂载状态
  useEffect(() => {
    setMounted(true);
  }, []);

  // 更新活动索引
  useEffect(() => {
    const index = navItems.findIndex((item) => {
      if (item.href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(item.href);
    });
    setActiveIndex(index >= 0 ? index : 0);
  }, [pathname]);

  // 计算指示器位置
  useEffect(() => {
    if (!mounted) return;
    
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      setIndicatorStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
  }, [activeIndex, mounted]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16 my-4 px-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50">
          {/* Logo */}
          <Link href="/" prefetch={true} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white hover:scale-110 transition-transform">
              Y
            </div>
            <span className="font-semibold text-white hidden sm:block">
              YuBlog
            </span>
          </Link>

          {/* Navigation with sliding indicator */}
          <div className="relative flex-1 flex justify-center">
            <ul className="flex items-center gap-1 relative">
              {/* 滑动活动指示器 */}
              {mounted && (
                <motion.div
                  className="absolute h-8 rounded-lg bg-white/10 -z-10"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  initial={false}
                  animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              
              {navItems.map((item, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <li
                    key={item.name}
                    ref={(el) => { itemRefs.current[index] = el; }}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className={cn(
                        "block px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                        isActive
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <Link href="/guestbook" prefetch={true} className="shrink-0">
            <span className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 text-sm font-medium text-white shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform">
              联系我
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
