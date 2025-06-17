import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { getDataUser, logout } from "../api/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("x-client-id");
        const accessToken = localStorage.getItem("authorization");

        if (!userId || !accessToken) return;

        const res = await getDataUser(userId, accessToken);
        const usr_name = res?.data.metadata?.metadata?.usr_name;

        if (usr_name) {
          setUserName(usr_name);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        console.error("Lỗi lấy user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("x-client-id");
      const accessToken = localStorage.getItem("authorization");

      if (!userId || !accessToken) throw new Error("Missing auth");

      await logout(userId, accessToken);

      // Xoá localStorage và cookie
      localStorage.clear();
      // document.cookie.clear();

      // Điều hướng
      navigate("/dang-nhap");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="flex w-full fixed z-50 bg-white p-2.5 h-[100px] border-b border-b-[#eadbdb] top-0">
      <div className="flex w-full items-center justify-between relative">
        <div className="flex absolute left-0">
          <a href="/">
            <img
              className="w-[200px] object-contain"
              src={assets.chillnfreelogo1}
              alt=""
            />
          </a>
        </div>
        <div className="flex gap-2 w-full items-center justify-center">
          <div className="flex items-center justify-center gap-20">
            <a className="uppercase text-base text-[#39465F] barlow2" href="/">
              trang chủ
            </a>
            <a
              className="uppercase text-base text-[#39465F] barlow2"
              href="/moi-ra-mat"
            >
              mới ra mắt
            </a>
            <a
              className="uppercase text-base text-[#39465F] barlow2"
              href="/san-pham"
            >
              sản phẩm
            </a>
          </div>

          <div className="mx-8">
            <a href="">
              <img className="w-[80px] h-[80px]" src={assets.logobird} alt="" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-20">
            <a className="uppercase text-base text-[#39465F] barlow2" href="">
              album
            </a>
            <a className="uppercase text-base text-[#39465F] barlow2" href="">
              blog
            </a>
            <a className="uppercase text-base text-[#39465F] barlow2" href="">
              giời thiệu
            </a>
          </div>
        </div>

        <div className="flex items-center absolute right-0 gap-2">
          <button className="text-xl flex items-center cursor-pointer" type="">
            <span className="material-symbols-outlined">search</span>
          </button>

          <a href="/">
            <div className="flex items-center">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </a>
          <div>
            {userName ? (
              <div className="relative group">
                <span className="text-sm text-[#39465F] barlow1 cursor-pointer">
                  {userName}
                </span>
                <div className="absolute right-0  w-[180px] bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <a
                    href="/thong-tin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <a
                className="uppercase text-sm text-[#39465F] barlow1"
                href="/dang-nhap"
              >
                tài khoản
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
