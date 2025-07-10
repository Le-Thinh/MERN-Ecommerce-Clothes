"use strict";

import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import SidebarContext from "./SidebarContext";
import ShopContext from "./ShopContext";
import LoadingContext from "./LoadingContext";

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

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }

  return context;
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }

  return context;
};
