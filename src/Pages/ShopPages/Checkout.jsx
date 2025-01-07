import React from "react";
import { Link } from "react-router-dom";
import UserOrderDetails from "./UserOrderDetails";

const Checkout = () => {

    return(
        <>
             <div class="mx-auto">
        <div id="cartdiv">
          <div class="w-full bg-sky-100">
            <p class="mx-auto w-full px-4 py-4 text-sm sm:w-full sm:px-6 xl:max-w-7xl">
              <span class="font-semibold">Special Offers.</span> We found offers available based on items in your cart.
              <span><a class="text-sky-800 hover:underline" href="#">See All Deals &amp; Offers</a></span>
            </p>
          </div>
          <div class="mx-auto mt-8 w-full px-4 sm:w-full sm:px-6 xl:max-w-7xl">
            <div class="flex flex-wrap-reverse space-y-16 lg:flex-row lg:flex-nowrap lg:space-y-0 lg:space-x-6">
              <div class="w-full lg:w-2/3">
                <div class="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                  <p>Checkout</p>
                  <p>
                    <a href="./"><span style={{fontSize:".9rem",marginRight:".1rem"}}><i class="fas fa-chevron-left"></i></span>
                      <span class="hover:underline">Continue Shopping</span>
                    </a>
                  </p>
                </div>
                <UserOrderDetails/>
              </div>
              <div class="w-full sm:w-[350px] lg:w-1/3">
                <div class="mt-10">
                  <div class="space-y-2 border border-gray-400 bg-white p-5 text-sm">
                    <h1 class="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
                    <div class="flex flex-row space-x-4">
                      <div class="w-1/4 rounded">
                        <img
                          class="border-primary w-full border-2"
                          src="./assets/img/products/fashion/shoes/3.jpg"
                          alt="Image Error"
                        />
                      </div>
                      <div class="w-3/4 space-y-1">
                        <p>Nike gray shoes lasts release apparel for all ages</p>
                        <p><span class="font-semibold">Sold by:</span> Neykart</p>
                        <p><span class="font-semibold">Color:</span> Red with white</p>
                        <p><span class="font-semibold">Size:</span> 8.5 (US Size)</p>
                        <div class="flex flex-row items-center justify-between">
                          <div><span class="font-semibold">Quantity:</span> 1</div>
                          <div>$129.99</div>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-2 pt-3">
                      <div class="flex items-center justify-between">
                        <p class="font-semibold">Subtotal <span class="font-normal">(1 items)</span> :</p>
                        <p>$129.99</p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="font-semibold">Shipping:</p>
                        <p>$4.99</p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="font-semibold">Saving/Promo Code:</p>
                        <p>-</p>
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-lightBlue-600 cursor-pointer hover:underline">Estimate Tax</p>
                        <p>$2.99</p>
                      </div>
                      <div
                        class="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                        <p class="">Total:</p>
                        <p>$137.97</p>
                      </div>
                    </div>
                    <div class="mt-2">
                      <form class="flex items-center space-x-2">
                        <div class="w-2/3">
                          <input
                            class="focus:ring-primary focus:border-primary w-full rounded border border-gray-400 bg-gray-100 p-2 outline-none focus:outline-none focus:ring-1"
                            type="text"
                            id="checkout-promo-code"
                            placeholder="Enter Promo code here..."/>
                        </div>
                        <div class="w-1/3">
                          <button class="w-full rounded bg-gray-200 py-2 text-gray-600">Apply</button>
                        </div>
                      </form>
                    </div>
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
export default Checkout;