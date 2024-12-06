import React from "react";

const Paginantion = () => {
    return (
        <>
        <div class="flex flex-row items-center justify-center py-7">
            <span class="cursor-not-allowed px-3 text-gray-300"><a href="#"><i class="fas fa-chevron-left"></i></a></span>
                <span class="space-x-3">
                    <a class="bg-primary rounded px-2 py-1 text-gray-50" href="#">1</a>
                    <a class="hover:bg-primary-300 rounded px-2 py-1 hover:text-gray-50" href="#">2</a>
                    <a class="hover:bg-primary-300 rounded px-2 py-1 hover:text-gray-50" href="#">3</a>
                    <span>...</span>
                    <a class="hover:bg-primary-300 rounded px-2 py-1 hover:text-gray-50" href="#">8</a>
                </span>
            <span class="hover:text-primary-800 px-3"><a href="#"><i class="fas fa-chevron-right"></i></a></span>
        </div>
        </>
    );
}
export default Paginantion;