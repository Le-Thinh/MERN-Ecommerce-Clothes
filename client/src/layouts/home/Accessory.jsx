import React from "react";
import { accessoryList } from "../../assets/accessory/assets";
import ProductCard from "../../components/products/ProductCard";

const Accessory = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="uppercase text-[#ea1b25] barlow2 text-4xl font-semibold">
        phụ kiện
      </div>
      <div className="mt-10 grid grid-cols-4 gap-12 text-center barlow3">
        {accessoryList.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
            slug="/phu-kien"
            quantity={product.quantity ?? 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Accessory;
