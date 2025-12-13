import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { getDataUser, logout } from "../api/user.api";
import { toast } from "react-toastify";
import { Link, Links, useNavigate } from "react-router-dom";
import { searchSpuByUser } from "../api/product.api";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);

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
          navigate("/dang-nhap");
        }
      } catch (err) {
        console.error("Lỗi lấy user:", err);
        navigate("/dang-nhap");
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
    <>
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
              <a className="uppercase text-sm text-[#39465F] barlow3" href="/">
                trang chủ
              </a>
              <a
                className="uppercase text-sm text-[#39465F] barlow3"
                href="/moi-ra-mat"
              >
                mới ra mắt
              </a>
              <a
                className="uppercase text-sm text-[#39465F] barlow3"
                href="/san-pham"
              >
                sản phẩm
              </a>
            </div>

            <div className="mx-8">
              <a href="">
                <img
                  className="w-[80px] h-[80px]"
                  src={assets.logobird}
                  alt=""
                />
              </a>
            </div>

            <div className="flex items-center justify-between gap-20">
              <a className="uppercase text-sm text-[#39465F] barlow3" href="">
                album
              </a>
              <a className="uppercase text-sm text-[#39465F] barlow3" href="">
                blog
              </a>
              <a className="uppercase text-sm text-[#39465F] barlow3" href="">
                giời thiệu
              </a>
            </div>
          </div>

          <div className="flex items-center absolute right-0 gap-2">
            <button
              onClick={() => setOpenSearch(true)}
              className="text-xl flex items-center cursor-pointer"
              type=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#39465f"
              >
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
              </svg>
            </button>

            <Link to={"/gio-hang"}>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#39465f"
                  className=""
                >
                  <path d="M263.79-96Q234-96 213-117.21t-21-51Q192-198 213.21-219t51-21Q294-240 315-218.79t21 51Q336-138 314.79-117t-51 21Zm432 0Q666-96 645-117.21t-21-51Q624-198 645.21-219t51-21Q726-240 747-218.79t21 51Q768-138 746.79-117t-51 21ZM253-696l83 192h301l82-192H253Zm-31-72h570q14 0 20.5 11t1.5 23L702.63-476.14Q694-456 676.5-444T637-432H317l-42 72h493v72H276q-43 0-63.5-36.15-20.5-36.16.5-71.85l52-90-131-306H48v-72h133l41 96Zm114 264h301-301Z" />
                </svg>
              </div>
            </Link>
            <div>
              {userName ? (
                <div className="relative group">
                  <span className="text-sm text-[#39465F] barlow1 cursor-pointer">
                    {userName}
                  </span>
                  <div className="absolute right-0  w-[180px] bg-gray-200 border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <Link
                      to="/thong-tin"
                      className="barlow3 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/lich-su-mua-hang"
                      className="barlow3 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Lịch sử mua hàng
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="barlow3 w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </>
  );
};

export default Navbar;
