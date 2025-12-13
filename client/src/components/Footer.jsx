import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="border-t-[1px] border-t-[#ddd] w-full flex flex-col items-center">
        <div className=" mt-5 my-auto mr-0">
          <img className="h-[70px] w-[70px] " src={assets.logobird} alt="" />
        </div>
        <div className="flex justify-between px-20 pt-5 gap-3 w-full">
          <div className="flex flex-col gap-3 mt-10">
            <div className="flex items-center gap-2">
              <img className="w-5.5 h-[20px]" src={assets.delivery} alt="" />
              <h3 className="text-[#1D2630] font-normal text-sm barlow2">
                Ship COD toàn quốc
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-4 h-5" src={assets.gift} alt="" />
              <h3 className="text-[#1D2630] font-normal text-sm barlow2 line-clamp-2">
                Mua hàng để nhận những phần quà hấp dẫn!
              </h3>
            </div>
          </div>
          <div className="w-[370px] flex flex-col gap-5">
            <h1 className="uppercase barlow2 text-2xl">liên hệ</h1>
            <div className="flex items-center gap-2">
              <img className="w-[15px] h-[18px]" src={assets.phone} alt="" />
              <h3 className="text-[#1D2630] font-normal text-sm barlow2">
                032 666 1994
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-[17px] h-5" src={assets.place} alt="" />
              <h3 className="text-[#1D2630] font-normal text-sm barlow2 line-clamp-2">
                Số 25 ngõ 38 Yên Lãng, phường Láng Hạ, quận Đống Đa, thành phố
                Hà Nội
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-5 h-5" src={assets.facebookpng} alt="" />
              <h3 className="">
                <a
                  className="text-[#1D2630] font-normal text-sm barlow2 line-clamp-2"
                  href="https://www.facebook.com/chillnfreeshop"
                >
                  https://www.facebook.com/chillnfreeshop
                </a>
              </h3>
            </div>
          </div>
          <div className="w-[280px] flex flex-col gap-2">
            <h1 className="uppercase barlow2 text-2xl">chính sách</h1>
            <ul className="flex flex-col gap-3.5">
              <li className="barlow3 text-[#39465F]">Chính sách bảo mật</li>
              <li className="barlow3 text-[#39465F]">FAQ</li>
              <li className="barlow3 text-[#39465F]">
                Chính sách bảo hành và đổi trả
              </li>
              <li className="barlow3 text-[#39465F]">
                Chính sách giao hàng hoả tốc
              </li>
            </ul>
          </div>
          <div className="w-[200px] flex flex-col gap-2">
            <h1 className="uppercase barlow2 text-2xl">fanpage</h1>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-t-[#ccc] mt-10 mb-2.5 flex items-center justify-center pt-5">
        <p className="barlow3 text-sm text-[#39465F] font-semibold">
          Thiết kế và hỗ trợ kỹ thuật bởi{" "}
          <a
            className="barlow3 font-bold text-sm text-[#ea1b25]"
            href="https://hoanganhgaming.vn/"
          >
            Hoàng Anh Gaming
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
