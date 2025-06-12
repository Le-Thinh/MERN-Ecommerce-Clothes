"use strict";

import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import SidebarContext from "./SidebarContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
