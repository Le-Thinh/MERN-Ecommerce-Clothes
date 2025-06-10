import React from "react";
import { assetsProducts } from "../assets/products/asset";

const AllProduct = () => {
  return (
    <div className="w-full mt-[130px]">
      <div className="w-full">
        <div className="uppercase text-center text-[#ea1b25]">
          <h1 className="text-[35px] barlow2 font-bold tracking-wide">
            tất cả sản phẩm
          </h1>
        </div>
        <div className="w-full items-center mt-10">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex w-full justify-center items-center barlow3 gap-3">
              <select
                className="w-[180px] h-[45px] px-4 py-2 bg-white border border-[#ccc] rounded text-[#39465F] text-b tracking-wide barlow3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#ea1b25] cursor-pointer custom-select"
                name=""
                id=""
              >
                <option value="">Lọc giá</option>
                <option value="100000">100.000 VND</option>
                <option value="300000">300.000 VND</option>
                <option value="500000">500.000 VND</option>
                <option value="1000000">1.000.000 VND</option>
              </select>
              <select
                className="w-[180px] h-[45px] px-4 py-2 bg-white border border-[#ccc] rounded text-[#39465F] text-b tracking-wide barlow3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#ea1b25] cursor-pointer custom-select"
                name=""
                id=""
              >
                <option value="">Danh mục</option>
                <option value="shirt">Áo</option>
                <option value="pants">Quần</option>
                <option value="accessory">Phụ kiện</option>
                <option value="jewelry">Trang sức</option>
              </select>
              <select
                className="w-[180px] h-[45px] px-4 py-2 bg-white border border-[#ccc] rounded text-[#39465F] text-b tracking-wide barlow3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#ea1b25] cursor-pointer custom-select"
                name=""
                id=""
              >
                <option value="">Sắp xếp theo</option>
                <option value="ascending">Giá tăng dần</option>
                <option value="decreasing">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        {/* product */}
        <div className=" w-full mt-10 grid justify-center items-center">
          <div className="grid grid-cols-4 barlow3 gap-12 text-center justify-center items-center">
            {assetsProducts.map((product, index) => (
              <a
                key={index}
                href={`/san-pham/${product.slug}`}
                className="decoration-[inherit]"
              >
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
      </div>
    </div>
  );
};

export default AllProduct;
