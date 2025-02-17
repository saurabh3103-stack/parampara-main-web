import React, { useContext, useEffect, useState } from "react";
import "../../Pages/PoojaBooking/slider.css";

const BhajanCategory = ({categoryData, onCategoryChange }) => {
    const IMGURL = "http://34.131.70.24:3000";

    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categoryData) {
            setCategories(categoryData);
            console.log("Category Data in BhajanCategory:", categoryData.data);
        } else {
            console.log("categoryData is undefined or empty");
        }
    }, [categoryData]);

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        onCategoryChange(categoryId);
    };

    return (
        <div className="hidden border border-gray-400 bg-white p-3 sm:block">
            <p className="font-semibold">Shop by Categories</p>
            <div className="flex flex-wrap gap-4">
                {/* All Category */}
                <div
                    className={`group border ${activeCategory === null ? "border-primary" : "border-gray-400"} p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6`}
                    onClick={() => handleCategoryClick(null)}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="h-14 w-14 rounded-full">
                            <img className="h-full w-full object-contain object-center p-2" src="default-image-path.jpg" alt="Category" />
                        </div>
                        <p className="line-clamp-1 mt-2 text-sm font-semibold text-gray-900">All</p>
                    </div>
                </div>

                {/* Categories */}
                {categories.map((val, ind) =>
                    val.category ? (
                        <div
                            key={ind}
                            className={`group border ${activeCategory === val._id ? "border-primary" : "border-gray-400"} p-2 shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out w-1/6`}
                            onClick={() => handleCategoryClick(val._id)}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <div className="h-14 w-14 rounded-full">
                                    <img
                                        className="h-full w-full object-contain object-center"
                                        src={val.pooja_image ? IMGURL + val.pooja_image : "default-image-path.jpg"}
                                        alt="Category"
                                    />
                                </div>
                                <p className="line-clamp-1 mt-2 text-sm font-semibold text-gray-900">{val.category}</p>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default BhajanCategory;
