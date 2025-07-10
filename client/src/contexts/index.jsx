import { useContext } from "react";
import ShopContext from "./shopContext";

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }

  return context;
};
