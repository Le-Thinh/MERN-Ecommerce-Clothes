import { Children, createContext, useState } from "react";

const ShopContext = createContext(undefined);

export const ShopContextProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);
  const [spus, setSpus] = useState([]);
  const [cart, setCart] = useState([]);
  const [spu, setSpu] = useState({});
  const [discountCode, setDiscountCode] = useState("");
  const [user, setUser] = useState({});
  const [allOrders, setAllOrders] = useState([]);
  return (
    <ShopContext.Provider
      value={{
        categories,
        setCategory,
        spus,
        setSpus,
        spu,
        setSpu,
        cart,
        setCart,
        discountCode,
        setDiscountCode,
        user,
        setUser,
        allOrders,
        setAllOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
