import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import AppLayout from "./layouts/AppLayout";
import Category from "./pages/Category";
import { ToastContainer } from "react-toastify";
import CreateCategory from "./components/category/CreateCategory";
import "react-toastify/dist/ReactToastify.css";
import CategoryDeleted from "./components/category/CategoryDeleted";
import Account from "./pages/Account";
import ListUser from "./components/user/ListUser";
import ListEmployee from "./components/user/ListEmployee";
import UpdateAccount from "./components/user/UpdateAccount";
import Product from "./pages/Product";
import CreateSpu from "./components/product/CreateSpu";
import ListAttribute from "./components/attribute/ListAttribute";
import { useLoadingContext } from "./contexts";
import LoadingSpinner from "./components/common/LoadingSpiner";
import SpuDetail from "./components/product/SpuDetail";
import EditSpu from "./components/product/EditSpu";

const App = () => {
  const { loading } = useLoadingContext();

  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      {loading && <LoadingSpinner />}
      <Routes>
        {/* Routes sử dụng layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          {/* BEGIN: routes category */}
          <Route path="/category" element={<Category />} />
          <Route path="/new-category" element={<CreateCategory />} />
          <Route path="/categories-deleted" element={<CategoryDeleted />} />
          {/* END: routes category */}
          {/* BEGIN: routes account */}
          <Route path="/account">
            <Route index element={<Account />} />
            <Route path="users" element={<ListUser />} />
            <Route path="employees" element={<ListEmployee />} />
            <Route path="users/update/:userId" element={<UpdateAccount />} />
          </Route>
          {/* END: routes account */}
          {/* BEGIN: routes products */}
          <Route path="/products" element={<Product />} />
          <Route path="/products/new-spu" element={<CreateSpu />} />
          <Route path="/products/detail/:spuId" element={<SpuDetail />} />l
          <Route path="/products/edit/:spuId" element={<EditSpu />} />l
          {/* END: routes products */}
          {/* BEGIN: routes products */}
          <Route path="/attributes" element={<ListAttribute />} />
          {/* END: routes products */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
