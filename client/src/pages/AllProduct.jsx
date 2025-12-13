import React, { useEffect } from "react";
import { useShopContext } from "../contexts";
import { getAllSpus } from "../api/product.api";
import { toast } from "react-toastify";
import ProductCard from "../components/products/ProductCard";

const AllProduct = () => {
  const { spus, setSpus } = useShopContext();

  const fetchSpu = async () => {
    try {
      const res = await getAllSpus();
      if (res) {
        const dataSPU = res.data?.metadata || [];
        setSpus(dataSPU);
      } else {
        toast.error("Fetch Data Failure");
      }
    } catch (error) {
      toast.error("Invalid Fetch Data ");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpu();
  }, [setSpus]);

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
            {spus.map((product, index) => (
              <ProductCard
                key={index}
                image={product.product_thumb[0]}
                name={product.product_name}
                price={product.product_price}
                slug={`/san-pham/${product.product_slug}`}
                quantity={product.product_quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
