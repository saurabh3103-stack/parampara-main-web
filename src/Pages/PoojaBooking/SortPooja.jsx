import React  from "react";

const SortPooja = () => {
    return (
        <>
        <div class="flex items-center justify-between p-3">
            <div class="flex flex-row items-center space-x-2">
                <span class="hidden font-semibold sm:block">Sort By:</span>
                <span>
                  <select class="focus:border-primary-600 focus:ring-primary-600 w-40 rounded border bg-gray-200 py-1 px-2 outline-none" id="sort-by">
                    <option>Featured</option>
                    <option>New Arrivals</option>
                    <option>Best Sellers</option>
                    <option>Rating: High - Low</option>
                    <option>Price: High - Low</option>
                    <option>Price: Low - High</option>
                  </select>
                </span>
            </div>
        </div>
        </>
    );
}
export default SortPooja;