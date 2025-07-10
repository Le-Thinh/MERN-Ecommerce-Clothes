import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllSpus } from "../../api/product.api";
import { useShopContext } from "../../contexts";

const NewProduct = () => {
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
    <div className="flex flex-col items-center">
      <div className="uppercase text-[#ea1b25] barlow2 text-4xl font-semibold">
        sản phẩm mới
      </div>
      <div className="mt-10 grid grid-cols-4 gap-12 text-center barlow3">
        {spus.map((product, index) => (
          <a
            key={index}
            href={`/san-pham/${product.product_slug}`}
            className="decoration-[inherit]"
          >
            <div className="h-[300px] w-[300px] relative mb-5 overflow-hidden flex flex-col justify-center items-center text-center bg-white text-[inherit]">
              <img
                className="rounded-t-2xl w-full h-[239px] underline object-cover"
                src={product.product_thumb[0]}
                alt=""
              />
              <div className="mt-5">
                <p className="uppercase barlow3 text-lg w-[200px] truncate">
                  {product.product_name}
                </p>
                <p className="text-base barlow3 leading-6 break-words text-[#39465F]">
                  {product.product_price.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
