import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllSpus } from "../../api/product.api";
import { useShopContext } from "../../contexts";
import ProductCard from "../../components/products/ProductCard";

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
  );
};

export default NewProduct;
