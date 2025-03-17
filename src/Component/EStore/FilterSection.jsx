import React, { useContext, useState } from "react";
import { AppContext } from '../../context/AppContext';

const FilterSection = () => {
  const { filtercategoryID, setFilterCategoryID, categoryData } = useContext(AppContext);
  const categoryArray = categoryData?.data ? Object.values(categoryData.data) : [];

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setFilterCategoryID(categoryId);
  };

  const handleAllClick = () => {
    setActiveCategory(null);
    setFilterCategoryID(null);
  };

  const handleCloseSidebar = () => {
    const sidebar = document.getElementById("product-filter");
    if (sidebar) sidebar.style.transform = "translateX(-100%)";
  };

  return (
    <div
      id="product-filter"
      className="nk-open-sidebar absolute fixed left-0 top-0 z-[199] h-screen w-[300px] -translate-x-full transform space-y-3 overflow-y-auto overflow-x-hidden border border-gray-400 bg-white px-3 pb-16 shadow-xl duration-500 md:relative md:z-0 md:block md:h-full md:w-1/6 md:translate-x-0 md:py-4 sm:hidden"
    >
      <div className="hover:text-primary block p-2 text-right text-lg md:hidden" onClick={handleCloseSidebar}>
        <div className="bg-primary-600 inline-block w-20 cursor-pointer space-x-2 rounded py-2 text-center text-xs font-semibold text-gray-50">
          <span>
            <i className="fas fa-check"></i>
          </span>
          <span>Done</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold">Filter By</span>
        <span className="cursor-pointer text-xs text-blue-700 underline" onClick={handleAllClick}>
          Clear All
        </span>
      </div>

      {/* Category Filters */}
      <div id="shippingFilter" className="space-y-2">
        <p className="font-semibold">Category:</p>
        {/* All Button */}
        <div
          className={`flex items-center p-4 rounded-md cursor-pointer transition-colors duration-200 ${activeCategory === null ? "bg-red-100 text-red-500 border-red-500" : "bg-gray-100 text-gray-800 border-gray-400"}`}
          onClick={handleAllClick}
        >
          <label className="nk-checkbox-label">All</label>
        </div>

        {/* Dynamic Category List */}
        {categoryArray.map((category) => (
          <div
            key={category._id}
            className={`flex items-center p-4 rounded-md cursor-pointer transition-colors duration-200 ${activeCategory === category._id ? "bg-red-100 text-red-500 border-red-500" : "bg-gray-100 text-gray-800 border-gray-400"}`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <label htmlFor={`category-${category._id}`} className="nk-checkbox-label">
              {category.category_name}
            </label>
          </div>
        ))}
      </div>

      {/* Tags Section */}
      <div className="w-full border-b border-gray-400 py-2"></div>
      <div className="my-3 space-y-3 border border-gray-400 bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Tags</span>
        </div>
        <div className="flex flex-row flex-wrap space-x-2 text-xs">
          <div className="py-2">
            <a className="search-tags" href="#">
              NEW ARRIVALS
            </a>
          </div>
          <div className="py-2">
            <a className="search-tags" href="#">
              SOCIAL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;