import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const PoojaCategory = ({categoryData}) => {
  const category = categoryData;
  const categoryArray = category?.data ? Object.values(category.data) : [];
  console.log(categoryArray);
  return (
    <div className="hidden border border-gray-400 bg-white p-3 sm:block">
      <p className="font-semibold">Shop by Categories</p>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        pagination={{ clickable: true }}
        className="nk-swiper-container"
      >
        <SwiperSlide className="group">
          <div className="flex flex-shrink-0 flex-grow cursor-pointer flex-col items-center justify-center border border-gray-400 p-2 shadow-lg group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out xl:flex-shrink xl:flex-grow-0">
            <a className="h-full w-full" href="shop-grid-left-sidebar.html">
              <div className="flex flex-col items-center justify-center">
                <div className="group-hover:bg-primary/30 h-14 w-14 rounded-full">
                  <img
                    className="h-full w-full object-contain object-center p-2 group-hover:stroke-current"
                    src="assets/icons/clothing/dress.svg"
                    alt="Dress Categ."
                  />
                </div>
                <p className="group-hover:text-primary line-clamp-1 mt-2 text-sm font-semibold text-gray-900 group-hover:underline">
                  Dresses & Gowns
                </p>
              </div>
            </a>
          </div>
        </SwiperSlide>

        {/* Repeat SwiperSlide components for other categories */}
        <SwiperSlide className="group">
          <div className="flex flex-shrink-0 flex-grow cursor-pointer flex-col items-center justify-center border border-gray-400 p-2 shadow-lg group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out xl:flex-shrink xl:flex-grow-0">
            <a className="h-full w-full" href="shop-grid-left-sidebar.html">
              <div className="flex flex-col items-center justify-center">
                <div className="group-hover:bg-primary/30 h-14 w-14 rounded-full">
                  <img
                    className="h-full w-full object-contain object-center p-2 group-hover:stroke-current"
                    src="assets/icons/clothing/mens-shirts-half-sleeve.svg"
                    alt="Shirts Categ."
                  />
                </div>
                <p className="group-hover:text-primary line-clamp-1 mt-2 text-sm font-semibold text-gray-900 group-hover:underline">
                  Shirts & Tops
                </p>
              </div>
            </a>
          </div>
        </SwiperSlide>

        {/* Add more SwiperSlide components as needed */}
      </Swiper>
    </div>
  );
};

export default PoojaCategory;
