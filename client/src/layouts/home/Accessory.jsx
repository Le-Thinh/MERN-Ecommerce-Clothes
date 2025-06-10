import React from "react";
import { accessoryList } from "../../assets/accessory/assets";

const Accessory = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="uppercase text-[#ea1b25] barlow2 text-4xl font-semibold">
        phụ kiện
      </div>
      <div className="mt-10 grid grid-cols-4 gap-12 text-center barlow3">
        {accessoryList.map((product, index) => (
          <a key={index} href="" className="decoration-[inherit]">
            <div className="h-[300px] w-[300px] relative mb-5 overflow-hidden flex flex-col justify-center items-center text-center bg-white text-[inherit]">
              <img
                className="rounded-t-2xl w-full h-[239px] underline object-cover"
                src={product.image}
                alt=""
              />
              <div className="mt-5">
                <p className="uppercase barlow3 text-lg w-[200px] truncate">
                  {product.name}
                </p>
                <p className="text-base barlow3 leading-6 break-words text-[#39465F]">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Accessory;
