import React  from "react";

const SortPooja = ({handleSearchChange}) => {
    return (
        <>
        <div class="flex items-center justify-between p-3">
            <div class="flex flex-row items-center space-x-2">
                {/* <label class="hidden font-semibold sm:block">Sort By:</label> */}

                  <select class="focus:border-primary-600 focus:ring-primary-600 w-40 rounded border bg-gray-200 py-1 px-2 outline-none" id="sort-by">
                    <option>Featured</option>
                    <option>New Arrivals</option>
                    <option>Best Sellers</option>
                    <option>Rating: High - Low</option>
                    <option>Price: High - Low</option>
                    <option>Price: Low - High</option>
                  </select>
            </div>
            <div class="flex flex-row items-center space-x-2">
                {/* <label class="hidden font-semibold sm:block">Search:</label> */}
                <input type="text" placeholder="Search Pooja..." className="border p-2 focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" onChange={handleSearchChange}/>
            </div>
        </div>
        <div class="w-full border-b border-gray-400"></div>

        </>
    );
}
export default SortPooja;