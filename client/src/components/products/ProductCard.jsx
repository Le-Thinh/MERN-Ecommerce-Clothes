import React from "react";
import SoldOutOverlay from "./SoldOutOverlay.jsx";

const ProductCard = ({ image, name, price, slug, quantity }) => {
  return (
    <a href={slug} className="decoration-[inherit]">
      <div className="h-[300px] w-[300px] relative mb-5 overflow-hidden flex flex-col justify-center items-center text-center bg-white">
        <img
          className={`rounded-t-2xl w-full h-[239px] object-cover ${
            quantity === 0 ? "opacity-40" : ""
          }`}
          src={image}
          alt=""
        />

        {quantity === 0 && <SoldOutOverlay />}

        <div className="mt-5">
          <p className="uppercase barlow3 text-lg w-[200px] truncate">{name}</p>
          <p className="text-base barlow3 leading-6 break-words text-[#39465F]">
            {price?.toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
