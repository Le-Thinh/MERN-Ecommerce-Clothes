import React from "react";
import { assets } from "../assets/products/asset";

const RelatedProducts = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="">
        <h1 className="uppercase text-[25px] barlow3">các sản phẩm khác</h1>
      </div>
      <div className="grid grid-cols-4 gap-12 text-center justify-center items-center barlow3 mt-5">
        <a className="" href="">
          <img
            className="object-cover h-[250px] w-[250px] m-[0_auto] rounded-2xl"
            src={assets.urbanMinimalTeeGreen}
            alt=""
          />
          <p className="block text-[#39465F] mt-5 truncate text-[18px] barlow3">
            Winged Freedom Tee White
          </p>
          <p className="block text-[#39465F] barlow3 text-base">420.000 VND</p>
        </a>
        <a className="" href="">
          <img
            className="object-cover h-[250px] w-[250px] m-[0_auto] rounded-2xl"
            src={assets.urbanMinimalTeeGreen}
            alt=""
          />
          <p className="block text-[#39465F] mt-5 truncate text-[18px] barlow3">
            Winged Freedom Tee White
          </p>
          <p className="block text-[#39465F] barlow3 text-base">420.000 VND</p>
        </a>
        <a className="" href="">
          <img
            className="object-cover h-[250px] w-[250px] m-[0_auto] rounded-2xl"
            src={assets.urbanMinimalTeeGreen}
            alt=""
          />
          <p className="block text-[#39465F] mt-5 truncate text-[18px] barlow3">
            Winged Freedom Tee White
          </p>
          <p className="block text-[#39465F] barlow3 text-base">420.000 VND</p>
        </a>
        <a className="" href="">
          <img
            className="object-cover h-[250px] w-[250px] m-[0_auto] rounded-2xl"
            src={assets.urbanMinimalTeeGreen}
            alt=""
          />
          <p className="block text-[#39465F] mt-5 truncate text-[18px] barlow3">
            Winged Freedom Tee White
          </p>
          <p className="block text-[#39465F] barlow3 text-base">420.000 VND</p>
        </a>
      </div>
    </div>
  );
};

export default RelatedProducts;
