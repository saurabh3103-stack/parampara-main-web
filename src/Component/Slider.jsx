import React from "react";

const Slider = () => {
  return (
    <>
      <div
        id="new-hero-slider"
        className="mx-auto -mt-5 h-96 w-full sm:h-[420px] lg:h-[450px]"
        style={{
          backgroundImage: "url('https://demo.weckapp.com/html/neykart/assets/img/main-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="nk-swiper-container bg-hero block h-full w-full">
          <div className="swiper nk-hero-slider h-full w-full">
            <div id="first-hero-slider" className="swiper-wrapper h-full w-full">
              <div className="swiper-slide h-full w-full">
                <div className="relative mx-auto h-full w-full">
                  <div className="absolute inset-0 mx-auto flex h-full max-w-7xl items-center justify-between">
                    <div className="item-center justify-center flex h-full w-1/2 py-5">
                      <div className="ml-0 h-full w-full space-y-3.5 px-2 sm:px-4 lg:ml-[165px] lg:px-0">
                        <div>
                          <div className="text-2xl font-thin sm:text-4xl">
                            FIND SUPER <br className="hidden sm:block" />
                            WOMEN'S DEALS
                          </div>
                          <div className="text-xs font-semibold sm:text-base">TRENDING FLASH SALE</div>
                        </div>
                        <div className="w-36 rounded border-4 border-dashed border-rose-800 bg-rose-800/40 py-2 text-center text-sm font-black text-rose-800 sm:w-[250px] sm:text-xl">
                          SAVE 40% OFF
                        </div>
                        <div className="text-3xl font-bold sm:text-6xl">
                          <div className="text-sm font-normal">FROM</div>
                          <div className="-space-x-2 sm:-space-x-4">
                            <sup className="-top-2 text-base sm:-top-8">$</sup>
                            <span>179</span>
                            <sup className="-top-2 text-base sm:-top-8">99</sup>
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
                          <div className="py-3 text-xs font-semibold text-gray-600">
                            VALID: Till Dec 2023
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto h-full w-1/2">
                      <img
                        className="h-full object-contain"
                        src="assets/img/banners/inner-hero.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide h-full w-full">
                <div className="relative mx-auto h-full w-full">
                  <div className="absolute inset-0 mx-auto flex h-full max-w-7xl items-center justify-between">
                    <div className="item-center justify-center flex h-full w-1/2 py-5">
                      <div className="ml-0 h-full w-full space-y-3.5 px-2 sm:px-4 lg:ml-[165px] lg:px-0">
                        <div>
                          <div className="text-2xl font-thin sm:text-4xl">
                            FIND SUPER <br className="hidden sm:block" />
                            WOMEN'S DEALS
                          </div>
                          <div className="text-xs font-semibold sm:text-base">TRENDING FLASH SALE</div>
                        </div>
                        <div className="w-36 rounded border-4 border-dashed border-yellow-800 bg-yellow-800/40 py-2 text-center text-sm font-black text-yellow-800 sm:w-[250px] sm:text-xl">
                          SAVE 40% OFF
                        </div>
                        <div className="text-3xl font-bold sm:text-6xl">
                          <div className="text-sm font-normal">FROM</div>
                          <div className="-space-x-2 sm:-space-x-4">
                            <sup className="-top-2 text-base sm:-top-8">$</sup>
                            <span>179</span>
                            <sup className="-top-2 text-base sm:-top-8">99</sup>
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
                          <div className="py-3 text-xs font-semibold text-gray-600">
                            VALID: Till Dec 2023
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto flex h-full w-1/2 items-center justify-center">
                      <div>
                        <img src="assets/img/banners/third-hero.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-pagination">
            <div className="nk-swiper-hero-pag absolute z-10 -mt-16"></div>
          </div>
        </div>
      </div>
    </>
  );
};  

export default Slider;
