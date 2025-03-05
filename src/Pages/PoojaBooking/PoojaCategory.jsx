import React from "react";
import "../../Pages/PoojaBooking/slider.css";
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { useState } from "react";

const PoojaCategory = ({  selectedCategory,  }) => {
    const IMGURL= "http://localhost:3000";
 
  const { filtercategoryID,setFilterCategoryID,categoryData, setCategoryData, } = useContext(AppContext);
  const categoryArray = categoryData?.data ? Object.values(categoryData.data) : [];
  

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
      setActiveCategory(categoryId);
      setFilterCategoryID(categoryId)
     
  };


  return (
    <div className="hidden border border-gray-400 bg-white p-3 sm:block">
    <p className="font-semibold">Shop by Categories</p>
    <div className="flex flex-wrap gap-4">
        {/* All Category */}
        <div
            className={`group border ${
                activeCategory === null ? "border-primary" : "border-gray-400"
            } p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6`}
        >
            <a
                className="h-full w-full"
                href="javascript:void(0)"
                onClick={() => handleCategoryClick(null)}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="h-14 w-14 rounded-full">
                        <img
                            className="h-full w-full object-contain object-center p-2"
                            src="default-image-path.jpg"
                            alt="Category Image"
                        />
                    </div>
                    <p className="line-clamp-1 mt-2 text-sm font-semibold text-gray-900">
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
                    className={`group border ${
                        activeCategory === val._id
                            ? "border-primary"
                            : "border-gray-400"
                    } p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6 sm:w-1/6 md:w-1/6 lg:w-1/6`}
                >
                    <a
                        className="h-full w-full"
                        href="javascript:void(0)"
                        onClick={() => handleCategoryClick(val._id)}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div className="h-14 w-14 rounded-full">
                                <img
                                    className="h-full w-full object-contain object-center"
                                    src={
                                        IMGURL + val.pooja_image || "default-image-path.jpg"
                                    }
                                    alt="Category Image"
                                />
                            </div>
                            <p className="line-clamp-1 mt-2 text-sm font-semibold text-gray-900">
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
  