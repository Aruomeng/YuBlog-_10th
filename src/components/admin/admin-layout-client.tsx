"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, useSidebar } from "@/components/admin/sidebar-context";
import { AdminSidebar } from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";

function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // 页面切换时触发动画
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning 
          ? "opacity-0 translate-y-2" 
          : "opacity-100 translate-y-0"
      )}
    >
      {displayChildren}
    </div>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isImmersive } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 - 沉浸模式时滑出屏幕 */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen z-50 transition-all duration-500 ease-in-out",
          isImmersive ? "opacity-0 pointer-events-none -translate-x-full" : "opacity-100 translate-x-0"
        )}
      >
        <AdminSidebar />
      </div>

      {/* 主内容区 */}
      <main
        className={cn(
          "min-h-screen transition-all duration-500 ease-in-out",
          isImmersive 
            ? "ml-0" 
            : isCollapsed 
              ? "ml-20" 
              : "ml-64"
        )}
      >
        <div className={cn(
          "transition-all duration-500 ease-in-out",
          isImmersive ? "px-6 py-4" : "p-8"
        )}>
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}


