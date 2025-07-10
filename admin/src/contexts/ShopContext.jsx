import { Children, createContext, useState } from "react";

const ShopContext = createContext(undefined);

export const ShopContextProvider = ({ children }) => {
  const [categories, setCategory] = useState([]);
  const [spus, setSpus] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [attributes, setAttributes] = useState({});
  return (
    <ShopContext.Provider
      value={{
        categories,
        setCategory,
        users,
        setUsers,
        user,
        setUser,
        attributes,
        setAttributes,
        spus,
        setSpus,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
