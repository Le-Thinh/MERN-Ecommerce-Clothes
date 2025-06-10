import React, { useState } from "react";
import { assets } from "../assets/products/asset";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetail = () => {
  const { product_slug } = useParams();

  const [size, setSize] = useState("");
  return (
    <div className="flex flex-col">
      <div className="flex mt-[100px]">
        <div className="block p-2.5 box-border">
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="ml-auto mt-5">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-12 mr-5">
                <img
                  className="w-[120px] h-[120px] object-cover rounded"
                  src={assets.urbanMinimalTeeGreen}
                  alt=""
                />
                <img
                  className="w-[120px] h-[120px] object-cover rounded"
                  src={assets.urbanMinimalTeeGreen}
                  alt=""
                />
              </div>
            </div>
            <div className="max-w-[580px]">
              <img
                className="rounded-lg w-[580px] h-[550px] float-right object-cover mb-2.5 overflow-hidden"
                src={assets.urbanMinimalTeeGreen}
                alt=""
              />
              <img
                className="h-auto max-w-[580px] float-right"
                src={assets.detail}
                alt=""
              />
            </div>
          </div>
          <div id="detail-product" className="ml-[180px] mt-5">
            <h1 className="uppercase text-[#ea1b25] barlow3 text-[26px] underline">
              chi tiết sản phẩm
            </h1>
            <h1 className="barlow3 text-xl mt-2.5">.</h1>
          </div>
        </div>
        <div className="w-full flex-[0.7] flex-col mt-2.5 px-2.5 box-border h-[550px]">
          <div className="grid text-left w-full gap-2.5 h-full">
            <h2 className="w-[300px] text-3xl mb-2.5 text-[#ea1b25] barlow5">
              URBAN MINIMAL TEE MINT GREEN
            </h2>
            <p className="barlow3 text-2xl text-[#000]">420.000 VND</p>
            <div className="w-full flex items-center">
              <p className="text-2xl barlow4 mt-9 text-[#000]">Lựa chọn</p>
            </div>
            <div className="mt-5 block items-center">
              <div className="gap-2.5 flex">
                <div>
                  <input
                    id="size-s"
                    type="checkbox"
                    onClick={() => setSize("S")}
                    className="hidden"
                  />
                  <label
                    htmlFor="size-s"
                    className={`flex ${
                      size === "S" ? "bg-[#ea1b25] text-white" : "text-[#333]"
                    } items-center justify-center px-2.5 border-2 border-[#ddd] rounded-lg  cursor-pointer text-[25px] h-[48px] text-center`}
                  >
                    S
                  </label>
                </div>
                <div>
                  <input
                    id="size-m"
                    type="checkbox"
                    onChange={() => setSize("M")}
                    className="hidden"
                  />
                  <label
                    htmlFor="size-m"
                    className={`flex ${
                      size === "M" ? "bg-[#ea1b25] text-white" : "text-[#333]"
                    } items-center justify-center px-2.5 border-2 border-[#ddd] rounded-lg text-[#333] cursor-pointer text-[25px] h-[48px] text-center`}
                  >
                    M
                  </label>
                </div>
                <div>
                  <input
                    id="size-l"
                    type="checkbox"
                    onChange={() => setSize("L")}
                    className="hidden"
                  />
                  <label
                    htmlFor="size-l"
                    className={`flex ${
                      size === "L" ? "bg-[#ea1b25] text-white" : "text-[#333]"
                    } items-center justify-center px-2.5 border-2 border-[#ddd] rounded-lg text-[#333] cursor-pointer text-[25px] h-[48px] text-center`}
                  >
                    L
                  </label>
                </div>
                <div>
                  <input
                    id="size-xl"
                    type="checkbox"
                    onChange={() => setSize("XL")}
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xl"
                    className={`flex ${
                      size === "XL" ? "bg-[#ea1b25] text-white" : "text-[#333]"
                    } items-center justify-center px-2.5 border-2 border-[#ddd] rounded-lg text-[#333] cursor-pointer text-[25px] h-[48px] text-center`}
                  >
                    XL
                  </label>
                </div>
              </div>
            </div>
            <div className="w-lg">
              <button
                className="uppercase text-[#39465F] h-[62px] w-[60%] cursor-pointer border rounded-lg text-[25px] mt-5 barlow4 font-normal"
                type="submit"
              >
                thêm vào giỏ hàng
              </button>
              <button
                className="uppercase text-white bg-[#ea1b25] h-[62px] w-[60%] cursor-pointer border rounded-lg text-[25px] mt-5 barlow4 font-normal"
                type="submit"
              >
                mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
