import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
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
            <a
              className="uppercase text-sm text-[#39465F] barlow1"
              href="/dang-nhap"
            >
              tài khoản
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
