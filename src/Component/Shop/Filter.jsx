import React from "react";

const Filter = () => {
    return (
        <>
            <div class="block border border-gray-400 bg-white p-3 md:hidden">
                <div class="inline-flex w-full items-center space-x-2">
                    <span class="font-semibold">Apply:</span>
                    <div data-open-sidebar="#product-filter" class="bg-primary-600 inline-block w-20 cursor-pointer rounded py-2 text-center text-xs font-semibold text-gray-50">
                        <span>Filters</span>
                        <span><i class="fas fa-chevron-down"></i></span>
                    </div>
                </div>
          </div>
        </>
    );
}

export default Filter;