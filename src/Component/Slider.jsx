import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';

const Slider = () => {
  const APIURL = "http://localhost:3000/api/slider/get-slider"; // Your API URL
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.post(APIURL, {
          category: "Home", 
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8' // Use your actual token
          }
        });
        setSliders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSliders(); 
  }, []); 
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching sliders: {error}</div>;
  }
return (
    <div
      id="new-hero-slider"
      className="mx-auto -mt-5 h-98 w-full sm:h-[500px] lg:h-[500px]">
      <div className="nk-swiper-container bg-hero block h-full w-full">
        <div className="swiper nk-hero-slider h-full w-full">
          <Swiper 
            autoplay={{ delay: 2000, disableOnInteraction: true, }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}onSwiper={(swiper) => console.log(swiper)} id="first-hero-slider" className="swiper-wrapper h-full w-full">
            {sliders.map((slider, index) => (
              <SwiperSlide key={index} className="swiper-slide h-full w-full" style={{
                backgroundImage: `url(${slider.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}>
                <div className="relative mx-auto h-full w-full">
                  <div className="absolute inset-0 mx-auto flex h-full max-w-7xl items-center justify-between">
                    <div className="item-center justify-center flex h-full w-1/2 py-5">
                      {/* <div className="ml-0 h-full w-full space-y-3.5 px-2 sm:px-4 lg:ml-[165px] lg:px-0">
                        <div>
                          <div className="text-2xl font-thin sm:text-4xl text-white">
                            {slider.title || "FIND SUPER"} <br className="hidden sm:block" />
                            {slider.subtitle || "WOMEN'S DEALS"}
                          </div>
                          <div className="text-xs font-semibold sm:text-base text-white">
                            {slider.tagline || "TRENDING FLASH SALE"}
                          </div>
                        </div>
                        <div className="w-36 rounded border-4 border-dashed border-white-800 bg-white-800/40 py-2 text-center text-sm font-black text-white-800 sm:w-[250px] sm:text-xl text-white">
                          {slider.discount || "SAVE 40% OFF"}
                        </div>
                        <div className="text-3xl font-bold sm:text-6xl">
                          <div className="text-sm font-normal text-white">FROM</div>
                          <div className="-space-x-2 sm:-space-x-4">
                            <sup className="-top-2 text-base sm:-top-8 text-white">${slider.price || "179"}</sup>
                            <span className="text-white">{slider.discountedPrice || "99"}</span>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => (window.location.href = "shop.html")}
                            className="btn btn-bg-slide w-36 p-3 sm:w-52"
                          >
                            SHOP NOW
                            <span className="ml-2">
                              <i className="fas fa-arrow-right"></i>
                            </span>
                          </button>
                          <div className="py-3 text-xs font-semibold text-white">
                            VALID: Till Dec 2023
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="nk-pagination">
          <div className="nk-swiper-hero-pag absolute z-10 -mt-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
