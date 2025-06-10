import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { carouselSliders } from "../../assets/assets";
const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const eachTranslate = -750.4;

  const next = () =>
    setCurrentSlider((currentSlider + 1) % carouselSliders.length);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlider]);

  //listener

  return (
    <div className="relative flex items-center">
      <div
        id="left"
        className="relative top-0 left-0 w-[50%] flex justify-center items-center bg-[#3f3e3e80]"
      >
        <img
          className="relative top-0 left-0 h-[89vh] w-full z-[-1] blur-[2px] overflow-hidden object-cover"
          src={assets.slider1}
          alt=""
        />
        <img
          className="absolute w-[90%] transform z-[1] h-[80vh] object-cover"
          src={assets.slider1}
          alt=""
        />
      </div>
      <div
        id="right"
        className="absolute right-0 w-[50%] flex justify-center items-center bg-[#3f3e3e80]"
      >
        <div className="w-full overflow-hidden touch-pan-y">
          <ul
            id="carousel-slider"
            className="w-[500%] content-start flex h-[89vh] translate-x-0 translate-y-0 duration-300 touch-pan-y"
            style={{
              transform: `translateX(${currentSlider * eachTranslate}px)`,
            }}
          >
            {carouselSliders.map((item, index) => (
              <li key={index} className="w-[750.4px] relative">
                <img
                  className="w-full object-cover h-[89vh]"
                  src={item.image}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Slider;
