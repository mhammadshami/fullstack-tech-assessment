import { useState, useCallback } from "react";

export const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

  return {
    isSidebarOpen,
    toggleSidebar,
  };
};