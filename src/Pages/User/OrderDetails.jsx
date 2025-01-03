import React from "react";

const OrderDetails = () => {
    return (
        <>
         <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                            <div class="flex flex-auto items-center justify-between px-4">
                                <div class="text-base font-semibold sm:text-lg">Orders &amp; Purchase</div>
                                <div>
                                <a href="account-orders-purchase.html">
                                    <div class="text-xs text-gray-300 hover:underline">View All</div>
                                </a>
                                </div>
                            </div>
                            <div class="w-full border-b border-gray-400"></div>
                            <h1 class="px-4 text-left text-base font-semibold">Active Orders</h1>
                            <div id="acc-overview-op" class="nk-na-tabContent block space-y-4">
                                <div class="flex flex-col space-x-0 space-y-4 px-2 py-2 sm:space-y-6 md:flex-nowrap lg:flex-row lg:space-y-0 lg:space-x-4">
                                <div class="flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:flex-nowrap sm:space-y-0 sm:space-x-4 lg:w-2/3">
                                    <div class="w-full space-y-3 rounded border border-gray-400 p-2 sm:w-1/2">
                                    <div class="flex flex-auto flex-row space-x-1 border-b border-gray-400 pb-4">
                                        <div class="w-2/6">
                                        <img class="h-24 rounded" src="assets/img/products/fashion/men/1.jpg" alt="" />
                                        </div>
                                        <div class="w-3/6 space-y-1">
                                        <p class="line-clamp-2">Nike Red shoes lasts release apparel for all ages</p>
                                        <p class="font-semibold">$129.95</p>
                                        <p class="text-gray-400">Order#: 123456</p>
                                        <p class="cursor-pointer py-1 text-sky-600 hover:underline">View details</p>
                                        </div>
                                        <div class="w-1/6 text-right">QTY 1</div>
                                    </div>
                                    <div class="flex flex-row items-center justify-between">
                                        <div class="text-left">
                                        <p class="font-semibold">Date Purchased</p>
                                        <p class="text-xs text-gray-400">December 01, 2022</p>
                                        </div>
                                        <div class="text-right">
                                        <p class="font-semibold">Estimated Delivery</p>
                                        <p class="text-xs text-gray-400">December 03, 2022</p>
                                        </div>
                                    </div>
                                    <div class="px-2">
                                        <ul class="border-primary-600 relative border-l-4">
                                        <li class="nk-li-order-track">
                                            <span class="nk-span-checked-order">
                                            <span><i class="fas fa-check"></i></span>
                                            </span>
                                            <h3 class="nk-checked-order-status">Oder Accepted</h3>
                                        </li>
                                        <li class="nk-li-order-track">
                                            <span class="nk-span-unchecked-order">
                                            <span><i class="fas fa-check"></i></span>
                                            </span>
                                            <h3 class="nk-unchecked-order-status">Order Processed</h3>
                                        </li>
                                        <li class="nk-li-order-track">
                                            <span class="nk-span-unchecked-order">
                                            </span>
                                            <h3 class="nk-unchecked-order-status">Order In Transit</h3>
                                        </li>
                                        <li class="nk-li-order-track">
                                            <span class="nk-span-unchecked-order">
                                            </span>
                                            <h3 class="nk-unchecked-order-status">Delivered to the Customer</h3>
                                        </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            
                                </div>
                            </div>
                        </div>
        </>
    );

}
export default OrderDetails;