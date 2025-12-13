import React from "react";

const SoldOutOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-[239px] flex justify-center items-center">
      <span className="text-white text-xl font-bold uppercase bg-black bg-opacity-60 px-4 py-2 rounded-md">
        SOLD OUT
      </span>
    </div>
  );
};

export default SoldOutOverlay;
