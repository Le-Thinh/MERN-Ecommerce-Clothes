import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import NewRelease from "./pages/NewRelease";
import AllProduct from "./pages/AllProduct";
import EmailVerified from "./pages/EmailVerified";
import Cart from "./pages/Cart";
import InfoAccount from "./pages/InfoAccount";
import PurchaseHistory from "./components/user/PurchaseHistory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const location = useLocation();

  const hideNavbar = [
    "/dang-nhap",
    "/dang-ky-tai-khoan",
    "/quen-mat-khau",
    "/user/password/reset",
  ].includes(location.pathname);

  return (
    <div className="">
      <ToastContainer />
      {!hideNavbar && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky-tai-khoan" element={<Register />} />
          <Route path="/moi-ra-mat" element={<NewRelease />} />
          <Route path="/san-pham" element={<AllProduct />} />
          <Route path="/san-pham/:product_slug" element={<ProductDetail />} />
          <Route path="/verify-email" element={<EmailVerified />} />
          <Route path="/thong-tin" element={<InfoAccount />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/lich-su-mua-hang" element={<PurchaseHistory />} />
          <Route path="/quen-mat-khau" element={<ForgotPassword />} />
          <Route path="/user/password/reset" element={<ResetPassword />} />
        </Routes>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
