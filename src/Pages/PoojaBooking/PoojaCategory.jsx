import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const PoojaCategory = ({categoryData}) => {
  const category = categoryData;
  const categoryArray = category?.data ? Object.values(category.data) : [];
  console.log(categoryArray,"in category page");
  return (
    <div className="hidden border border-gray-400 bg-white p-3 sm:block">
    <p className="font-semibold">Shop by Categories</p>
    <Swiper
      spaceBetween={10}
      slidesPerView={15}
      loop={true} // Added loop for continuous scrolling
      pagination={{ clickable: true }}
      className="nk-swiper-container"
    >
      {categoryArray.map((val, ind) => {
        // Check if the 'category' field is present before rendering the component
        if (val.category) {
          return (
            <SwiperSlide key={ind}>
              <div className="group border border-gray-400 p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out">
                <a className="h-full w-full" href="shop-grid-left-sidebar.html">
                  <div className="flex flex-col items-center justify-center">
                    <div className="hover:bg-primary/30 h-14 w-14 rounded-full">
                      <img
                        className="h-full w-full object-contain object-center p-2 hover:stroke-current"
                        src={val.pooja_image || 'default-image-path.jpg'} // Fallback image if no image provided
                        alt="Category Image"
                      />
                    </div>
                    <p className="hover:text-primary line-clamp-1 mt-2 text-sm font-semibold text-gray-900 hover:underline">
                      {val.category}
                    </p>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          );
        }
        return null; // Return null if 'category' is not present
      })}
    </Swiper>
  </div>
  
  );
};

export default PoojaCategory;
