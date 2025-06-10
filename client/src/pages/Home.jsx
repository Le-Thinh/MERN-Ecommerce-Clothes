import React from "react";
import Slider from "../layouts/home/Slider";
import NewProduct from "../layouts/home/NewProduct";
import Accessory from "../layouts/home/accessory";

const Home = () => {
  return (
    <div className="flex flex-col mt-[100px]">
      <div className="w-full p-[10px]">
        <Slider />

        <div className="mt-14">
          <NewProduct />
        </div>

        <div className="mt-14">
          <Accessory />
        </div>
      </div>
    </div>
  );
};

export default Home;
