import React from "react";
import {Link} from 'react-router-dom';
const Cart = () => {
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
                    <div class="flex flex-wrap space-y-16 lg:flex-row lg:flex-nowrap lg:space-y-0 lg:space-x-6">
                    <div class="w-full lg:w-2/3">
                        <div class="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                        <p>Your Cart</p>
                        <p>
                            <Link to={"./"}>
                            <span class="hover:underline">Continue Shopping</span>
                            </Link>
                        </p>
                        </div>
                        <div class="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                        <div class="space-y-3">
                            <div class="flex flex-col space-y-3 sm:flex-row md:space-x-8 lg:flex-nowrap lg:space-x-3">
                            <div class="flex flex-col space-y-3 lg:w-1/2 lg:items-center lg:space-x-0 xl:flex-row xl:items-start xl:space-y-0">
                                <div class="mx-auto flex w-full sm:w-1/2 sm:justify-center lg:items-start lg:justify-start xl:w-1/3">
                                <img
                                    class="h-24 w-24 rounded border-2 border-gray-400 object-cover"
                                    src="./assets/img/products/fashion/shoes/3.jpg"
                                    alt=""/>
                                </div>
                                <div class="w-full space-y-2 xl:w-2/3">
                                <p>
                                    <a class="text-sky-600 hover:underline" href="./shop-product.html">Nike Red shoes lasts release apparel for all ages</a>
                                </p>
                                <p><span class="font-semibold">Sold by:</span> Neykartp</p>
                                <p class="font-semibold text-green-600">In Stock</p>
                                <p><span class="font-semibold">Color:</span> Red with white</p>
                                <p><span class="font-semibold">Size:</span> 8.5 (US Size)</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap space-y-3 sm:flex-col sm:space-y-2 lg:w-1/2 xl:flex-row">
                                <div class="w-full space-y-3 xl:w-2/3">
                                <div class="flex flex-row space-x-2">
                                    <p>
                                    <input
                                        class="focus:border-primary-500 text-primary focus:ring-primary-500"
                                        type="radio"
                                        checked/>
                                    </p>
                                    <div>
                                    Fast Two-Day shipping <br />
                                    <span class="text-green-400">Get it by Monday, Jul 7</span> <br />
                                    <span></span> When your order by 8:00 Today
                                    </div>
                                </div>
                                <p>
                                    <span><i class="fas fa-store-slash"></i></span> Order Pickup
                                    <span class="text-red-600"> not available</span>
                                </p>
                                <div>
                                    <p>
                                    <span><i class="fas fa-truck-fast"></i></span>
                                    <span class="font-semibold"> Ship from:</span>
                                    US
                                    </p>
                                </div>
                                </div>
                                <div class="flex w-20 flex-row space-x-8 pb-5 text-right sm:float-right xl:w-1/3 xl:flex-col xl:space-x-0">
                               
                                <div class="py-2 text-base font-semibold">$129.95</div>
                                </div>
                            </div>
                            </div>
                            <div class="space-y-2 sm:space-y-1">
                            
                            <div class="items center flex flex-row justify-between py-2 text-xs sm:w-1/2">
                                <span class="cursor-pointer text-sky-600 hover:underline"><a href="./shop-product.html">Edit</a></span>
                                <span class="cursor-pointer text-sky-600 hover:underline"><a href="./account-wishlist.html">Save for later</a></span>
                                <span class="cursor-pointer text-sky-600 hover:underline">Remove</span>
                            </div>
                            <div class="pb-5 text-xs">
                                <span class="font-semibold">NeykartCard:</span> <br />
                                Earn a $20 statement credit when you spend $29 on eligible purchases.
                                <span><a class="cursor-pointer text-sky-600 hover:underline" href="#">Learn more</a></span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-[350px] lg:w-1/3">
                    <div class="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                        <p></p>
                        <p>
                            <button class="btn btn-red-800 text-white">
                            <span>Empty Cart</span>
                            </button>
                        </p>
                        </div>
                        <div class="mb-8 mt-1">
                        <div class="space-y-2 border border-gray-400 bg-white p-5 text-sm">
                            <h1 class="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
                            <div>
                            <form class="flex items-center space-x-2">
                                <div class="w-2/3">
                                <input
                                    class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 bg-gray-100 p-2 outline-none"
                                    type="text"
                                    placeholder="Enter Promo code here..."/>
                                </div>
                                <div class="w-1/3">
                                <button class="w-full rounded bg-gray-200 py-2 text-gray-600">Apply</button>
                                </div>
                            </form>
                            </div>
                            <div class="space-y-2 pt-3">
                            <div class="flex items-center justify-between">
                                <p class="font-semibold">Subtotal <span class="font-normal">(3 items)</span> :</p>
                                <p>$184.85</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="font-semibold">Shipping:</p>
                                <p class="text-lightBlue-600 cursor-pointer text-xs hover:underline">Two-Day Delivery</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="font-semibold">Saving/Promo Code:</p>
                                <p>-</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-lightBlue-600 cursor-pointer hover:underline">Estimate Tax</p>
                                <p class="text-xs italic">See in Checkout</p>
                            </div>
                            <div
                                class="flex items-center justify-between border-t border-gray-400 py-2 text-lg font-semibold">
                                <p class="">Total:</p>
                                <p>$184.85</p>
                            </div>
                            </div>
                            <div class="pt-3">
                            <a href="signin-to-checkout.html">
                                <div class="btn-gradient btn-full">Checkout</div>
                            </a>
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
export default Cart;