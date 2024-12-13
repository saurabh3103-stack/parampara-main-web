import React from "react";
import "../../Pages/PoojaBooking/slider.css";

const PoojaCategory = ({ categoryData, selectedCategory, onCategoryChange }) => {
  const categoryArray = categoryData?.data ? Object.values(categoryData.data) : [];
  const IMGURL= "http://localhost:3000";

  return (
    <div className="hidden border border-gray-400 bg-white p-3 sm:block">
      <p className="font-semibold">Shop by Categories</p>
      <div className="flex flex-wrap gap-4">
        {/* All Category */}
        <div className="group border border-gray-400 p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6">
          <a
            className="h-full w-full"
            href="javascript:void(0)"
            onClick={() => onCategoryChange(null)}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="hover:bg-primary/30 h-14 w-14 rounded-full">
                <img
                  className="h-full w-full object-contain object-center p-2 hover:stroke-current"
                  src="default-image-path.jpg"
                  alt="Category Image"
                />
              </div>
              <p className="hover:text-primary line-clamp-1 mt-2 text-sm font-semibold text-gray-900">
                All
              </p>
            </div>
          </a>
        </div>

        {/* Categories from categoryArray */}
        {categoryArray.map((val, ind) =>
          val.category ? (
            <div
              key={ind}
              className="group border border-gray-400 p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6"
            >
              <a
                className="h-full w-full"
                href="javascript:void(0)"
                onClick={() => onCategoryChange(val._id)}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:bg-primary/30 h-14 w-14 rounded-full">
                    <img
                      className="h-full w-full object-contain object-center hover:stroke-current"
                      src={IMGURL + val.pooja_image || "default-image-path.jpg"}
                      alt="Category Image"
                    />
                  </div>
                  <p className="hover:text-primary line-clamp-1 mt-2 text-sm font-semibold text-gray-900">
                    {val.category}
                  </p>
                </div>
              </a>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PoojaCategory;
  