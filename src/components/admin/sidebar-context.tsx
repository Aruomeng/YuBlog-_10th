"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  isImmersive: boolean;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleImmersive: () => void;
  setImmersive: (immersive: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isImmersive, setIsImmersiveState] = useState(false);

  const toggleSidebar = useCallback(() => setIsCollapsed(prev => !prev), []);
  const setCollapsed = useCallback((collapsed: boolean) => setIsCollapsed(collapsed), []);
  const toggleImmersive = useCallback(() => setIsImmersiveState(prev => !prev), []);
  const setImmersive = useCallback((immersive: boolean) => setIsImmersiveState(immersive), []);

  return (
    <SidebarContext.Provider 
      value={{ 
        isCollapsed, 
        isImmersive, 
        toggleSidebar, 
        setCollapsed, 
        toggleImmersive, 
        setImmersive 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}


