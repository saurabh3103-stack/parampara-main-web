import React, { useEffect, useState } from "react";

const OrderList = () => {
    const [orderData, setOrderData] = useState(null); // Use null initially
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
    const APIURL = 'http://34.131.10.8:3000/api/orders/user';

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${APIURL}/67821dd7abcafd5d0ecacb77`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []); 
    console.log(orderData);
    return(
        <>
        <div id="accOrderPurchase" class="accTabContent block space-y-10">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
              <div class="flex flex-col items-center justify-between space-y-2 px-4 sm:flex-row sm:space-y-0">
                <div class="w-full text-base font-semibold sm:w-1/2 sm:text-lg">Orders &amp; Purchase</div>
                <div class="flex w-full flex-row items-center space-x-4 text-sm sm:w-1/2">
                  <div class="w-3/4">
                    <input
                      class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900"
                      type="text"
                      placeholder="Search by product name or order number..."/>
                  </div>
                  <button class="btn-gradient w-12 sm:w-40">
                    <span class="block sm:hidden"> <i class="fas fa-magnifying-glass"></i> </span>
                    <span class="hidden sm:block">Search Order</span>
                  </button>
                </div>
              </div>
              <div>                
                  <div
                    class="mt-5 flex flex-col space-x-0 space-y-4 px-2 py-2 sm:space-y-6 md:flex-nowrap lg:flex-row lg:space-y-0 lg:space-x-4">
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
                            <p class="cursor-pointer py-1 text-sky-600 hover:underline">View Receipt</p>
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
                          <ul class="nk-ul-order-track">
                            <li class="nk-li-order-track">
                              <span class="nk-span-checked-order">
                                <span><i class="fas fa-check"></i></span>
                              </span>
                              <h3 class="nk-checked-order-status">Oder Accepted</h3>
                            </li>
                            <li class="nk-li-order-track">
                              <span class="nk-span-checked-order">
                                <span><i class="fas fa-check"></i></span>
                              </span>
                              <h3 class="nk-checked-order-status">Order Processed</h3>
                            </li>
                            <li class="nk-li-order-track">
                              <span class="nk-span-checked-order">
                                <span><i class="fas fa-check"></i></span>
                              </span>
                              <h3 class="nk-checked-order-status">Order In Transit</h3>
                            </li>
                            <li class="nk-li-order-track">
                              <span class="nk-span-checked-order">
                                <span><i class="fas fa-check"></i></span>
                              </span>
                              <h3 class="nk-checked-order-status">Delivered to the Customer</h3>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </>
    );
}   

export default OrderList;