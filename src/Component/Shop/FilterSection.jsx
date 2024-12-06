import React from "react";

const FilterSection = () => {
  const handleCloseSidebar = () => {
    const sidebar = document.getElementById("product-filter");
    sidebar.style.transform = "translateX(-100%)";
  };

  return (
    <div  id="product-filter"   class="nk-open-sidebar absoulute fixed left-0 top-0 z-[199] h-screen w-[300px] -translate-x-full transform space-y-3 overflow-y-auto overflow-x-hidden border border-gray-400 bg-white px-3 pb-16 shadow-xl duration-500 md:relative md:z-0 md:block md:h-full md:w-1/4 md:translate-x-0 md:py-4">
      <div
        className="hover:text-primary block p-2 text-right text-lg md:hidden"
        onClick={handleCloseSidebar}
      >
        <div className="bg-primary-600 inline-block w-20 cursor-pointer space-x-2 rounded py-2 text-center text-xs font-semibold text-gray-50">
          <span>
            <i className="fas fa-check"></i>
          </span>
          <span>Done</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold">Filter By</span>
        <span className="cursor-pointer text-xs text-blue-700 underline">
          Clear All
        </span>
      </div>

      {/* Delivery Filters */}
      <div id="shippingFilter" className="space-y-2">
        <p className="font-semibold">Delivery:</p>
        <div className="flex items-center">
          <input
            id="freeShippingId"
            aria-describedby="freeShippingId"
            type="checkbox"
            className="nk-checkbox-input"
          />
          <label htmlFor="freeShippingId" className="nk-checkbox-label">
            Free Shipping
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="nextDayDeliveryId"
            aria-describedby="nextDayDeliveryId"
            type="checkbox"
            className="nk-checkbox-input"
          />
          <label htmlFor="nextDayDeliveryId" className="nk-checkbox-label">
            Next-Day Delivery
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="storePickUpId"
            aria-describedby="storePickUpId"
            type="checkbox"
            className="nk-checkbox-input"
          />
          <label htmlFor="storePickUpId" className="nk-checkbox-label">
            Store Pick Up
          </label>
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Category: </span>
          <span className="cursor-pointer text-xs text-blue-700 underline">
            <a href="shop-wide.html"></a>
          </span>
        </div>
        <div className="space-y-1">
          <p>Fashion & Clothing</p>
          <p className="cursor-pointer text-blue-700 hover:underline">
            <span>
              <i className="fas fa-chevron-left"></i>
            </span>
            <a href="shop-grid-left-sidebar.html">
              Women, Shoes &amp; Accessories
            </a>
          </p>
          <p className="ml-5 cursor-pointer text-blue-700 hover:underline">
            <a href="shop-grid-left-sidebar.html">Women Clothes</a>
          </p>
        </div>
      </div>

      {/* Other Filters (Brands, Colors, Price, etc.) */}
      {/* Repeat the structure as per the HTML provided */}

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
          {/* Add more tags here */}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
