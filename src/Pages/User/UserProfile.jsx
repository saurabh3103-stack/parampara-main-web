import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
          navigate("/signin");
        }
    }, [navigate]);
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Pandit', url: 'javascript:void(0)' },
        { label: 'My Account', url: 'javascript:void(0)'},
        { pagename : 'My Account'},
      ];
    return (
        <>
        <Breadcrumb links={breadcrumbLinks}/>
                {/* <div class="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                    <div>
                        <h1 class="text-xl font-extrabold sm:text-3xl">My Account</h1>
                    </div>
                    <div class="space-y-3 rounded-lg border border-gray-400 bg-white pt-3 shadow">
                    <div class="flex flex-row justify-between px-4 pb-4 xl:pb-0">
                    <div class="flex flex-auto space-x-1.5 sm:space-x-3">
                        <div class="h-11 w-11 sm:h-20 sm:w-20">
                        <img class="border-primary-500 h-full w-full rounded-full border-2 p-[3px]" src="assets/img/user-profile/avatar-7.jpg" alt=""/>
                        </div>
                        <div>
                        <div class="flex flex-row items-center space-x-1 py-1">
                            <span class="text-sm font-extrabold sm:text-lg sm:font-bold">John Doe Smith </span>
                            <span><img src="assets/icons/verified.svg" alt="" /></span>
                        </div>
                        <div class="space-y-2 text-xs font-semibold text-gray-400">
                            <p>AccountID: #ECX12345</p>
                            <div class="flex flex-col space-y-2 space-x-0 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
                            <div>
                                <span><i class="fas fa-user"></i></span> Customer
                            </div>
                            <div>
                                <span><i class="fas fa-map-marker-alt"></i></span> United States
                            </div>
                            <div class="whitespace-nowrap">
                                <span><i class="far fa-envelope"></i></span> johndoesmith@email.com
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                        <ProfileMenu/>
                    </div>
                    <div class="hidden w-full border-b border-gray-400 xl:block"></div>
                    <div
                    id="accountTabs"
                    class="mx-auto hidden w-full items-center space-x-2 overflow-x-auto whitespace-nowrap px-4 pb-3 text-sm font-semibold xl:inline-flex xl:flex-row xl:flex-nowrap xl:justify-between xl:overflow-x-hidden">
                    <a class="nk-acc-active-tab" href="account-overview.html">
                        <div>Account Overview</div>
                    </a>
                    <a class="nk-account-tab" href="account-settings.html">
                        <div>Settings</div>
                    </a>
                    <a class="nk-account-tab" href="account-orders-purchase.html">
                        <div>Orders &amp; Purchase</div>
                    </a>
                    <a class="nk-account-tab" href="account-shipping-billing.html">
                        <div>Shipping &amp; Billing</div>
                    </a>
                    <a class="nk-account-tab" href="account-buy-it-again.html">
                        <div>Buy It Again</div>
                    </a>
                    <a class="nk-account-tab" href="account-wishlist.html">
                        <div>Wishlist &amp; Saved Items</div>
                    </a>
                    <a class="nk-account-tab" href="account-gift-registry.html">
                        <div>Gifts Registry</div>
                    </a>
                    <a class="nk-account-tab" href="account-offers-deals.html">
                        <div>Offers &amp; Deals</div>
                    </a>
                    <a class="nk-account-tab" href="account-submit-return.html">
                        <div>Submit Return</div>
                    </a>
                    </div>
                    <div id="accOverview" class="animate-nk-acc-tab block space-y-12">
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Personal Details</div>
                            <div>
                            <a href="account-settings.html">
                                <div class="btn-gradient w-28 sm:w-40">Edit Profile</div>
                            </a>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <div class="space-y-2 px-4">
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <div class="w-52 text-sm">Full Name:</div>
                            <span class="font-semibold">John Doe Smith</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <div class="w-52 text-sm">Date of Birth:</div>
                            <span class="font-semibold">01/08/1987</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Company:</span><span class="font-semibold">Neykart Co.</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Phone:</span><span class="font-semibold">(123) 456 7890</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Email address:</span
                            ><span class="font-semibold">johndoesmith@email.com</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Web:</span><span class="font-semibold">Neykart.com</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">City:</span><span class="font-semibold">Elkhart</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">State/Province:</span><span class="font-semibold">INDIANA</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">ZIP/Postal Code:</span><span class="font-semibold">46514</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Country:</span><span class="font-semibold">United States</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Timezone:</span><span class="font-semibold">(GMT-07:00) Pacific Time (US & Canada)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Language:</span><span class="font-semibold">English (US)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Currency:</span><span class="font-semibold">US Dollar (USD)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Communication:</span><span class="font-semibold">Phone, Email</span>
                            </div>
                        </div>
                        </div>
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
                                <div class="w-full space-y-3 rounded border border-gray-400 p-2 sm:w-1/2">
                                <div class="flex flex-auto flex-row space-x-1 border-b border-gray-400 pb-4">
                                    <div class="w-2/6">
                                    <img class="h-24 rounded" src="assets/img/products/fashion/women/2.jpg" alt="" />
                                    </div>
                                    <div class="w-3/6 space-y-1">
                                    <p class="line-clamp-2">Women Long Red dress lasts release Apparel for women.</p>
                                    <p class="font-semibold">$21.95</p>
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
                                        <span class="nk-span-checked-order">
                                        <span><i class="fas fa-check"></i></span>
                                        </span>
                                        <h3 class="nk-checked-order-status">Order Processed</h3>
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
                            <div class="w-full space-y-3 rounded border border-gray-400 p-2 sm:w-1/2 lg:w-1/3">
                                <div class="flex flex-auto flex-row space-x-1 border-b border-gray-400 pb-4">
                                <div class="w-2/6">
                                    <img class="h-24 rounded" src="assets/img/products/fashion/kids/1.jpg" alt="" />
                                </div>
                                <div class="w-3/6 space-y-1">
                                    <p class="line-clamp-2">Dark green men's suit lasts release Apparel for all ages.</p>
                                    <p class="font-semibold">$32.95</p>
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
                                    <span class="nk-span-unchecked-order">
                                        <span><i class="fas fa-check"></i></span>
                                    </span>
                                    <h3 class="nk-unchecked-order-status">Delivered to the Customer</h3>
                                    </li>
                                </ul>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Shipping, Billing &amp; Payment Method</div>
                            <div>
                            <a href="account-shipping-billing.html">
                                <div class="text-xs text-gray-500 hover:underline">Edit</div>
                            </a>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <div class="mt-5 flex flex-col space-x-0 space-y-4 px-2 py-2 sm:space-y-4 md:flex-row md:flex-nowrap md:space-y-0 md:space-x-4">
                            <div class="flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:flex-nowrap sm:space-y-0 sm:space-x-4 md:w-2/3">
                            <div class="w-full rounded border border-gray-400 p-3 sm:w-1/2">
                                <div class="flex items-center justify-between">
                                <h1 class="whitespace-nowrap text-left text-base font-semibold">Delivery Address</h1>
                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">Primary</span>
                                </div>
                                <div class="space-y-1 py-2 text-sm">
                                <p class="font-semibold">John Doe Smith</p>
                                <p>johndoesmith@email.com</p>
                                <p>(123) 345-6789</p>
                                <p>12345 N Park Ave,</p>
                                <p>STE 67110</p>
                                <p>Elkhart, IN, 46514, US</p>
                                </div>
                            </div>
                            <div class="w-full rounded border border-gray-400 p-3 sm:w-1/2">
                                <div class="flex items-center justify-between">
                                <h1 class="whitespace-nowrap text-left text-base font-semibold">Billing Address</h1>
                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">Primary</span>
                                </div>
                                <div class="space-y-1 py-2 text-sm">
                                <p class="font-semibold">John Doe Smith</p>
                                <p>johndoesmith@email.com</p>
                                <p>(123) 345-6789</p>
                                <p>12345 N Park Ave,</p>
                                <p>STE 67110</p>
                                <p>Elkhart, IN, 46514, US</p>
                                </div>
                            </div>
                            </div>
                            <div class="w-full rounded border border-gray-400 p-3 sm:w-1/2 md:w-1/3">
                            <div class="flex items-center justify-between">
                                <h1 class="whitespace-nowrap text-left text-base font-semibold">Payment Method</h1>
                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs text-green-600">Primary</span>
                            </div>
                            <div class="space-y-1 py-2 text-sm">
                                <p class="font-semibold">John Doe Smith</p>
                                <p>johndoesmith@email.com</p>
                                <p>(123) 345-6789</p>
                                <p>12345 N Park Ave,</p>
                                <p>STE 67110</p>
                                <p>Elkhart, IN, 46514, US</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Wishlist &amp; Saved Items</div>
                            <div>
                            <a href="account-wishlist.html">
                                <div class="text-xs text-gray-300 hover:underline">View All</div>
                            </a>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <div class="mx-auto inline-flex w-full space-x-2 overflow-x-auto whitespace-nowrap pb-3">
                            <div class="flex-grow-1 flex-shrink-0 space-y-3 xl:w-full xl:flex-shrink xl:flex-grow-0">
                            <div class="w-full border-b border-gray-400"></div>
                            <div class="space-y-2 px-4">
                                <h1 class="text-left text-base font-semibold">Total Saved items: 3</h1>
                                <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                                <div class="mx-auto inline-flex w-full space-x-2 overflow-x-auto whitespace-nowrap pb-3">
                                    <div class="flex-grow-1 flex-shrink-0 space-y-3 xl:w-full xl:flex-shrink xl:flex-grow-0">
                                    <div class="grid grid-cols-12 items-center gap-4 px-4 font-semibold">
                                        <div class="col-span-1">
                                        <div class="flex items-center py-1">
                                            <input id="wishlist-check-all" aria-describedby="wishlist-check-all" type="checkbox" class="nk-checkbox-input"/>
                                        </div>
                                        </div>
                                        <div class="col-span-6 grid">Product</div>
                                        <div class="col-span-1 grid">Price</div>
                                        <div class="col-span-1 grid">Quantity</div>
                                        <div class="col-span-1 grid">Status</div>
                                        <div class="col-span-1 grid">Action</div>
                                        <div class="col-span-1 grid">
                                        <div class="text-right">Remove</div>
                                        </div>
                                    </div>
                                    <div class="w-full border-b border-gray-400"></div>
                                    <div class="grid grid-cols-12 items-center gap-4 px-4">
                                        <div class="col-span-1">
                                        <div class="flex items-center">
                                            <input type="checkbox" class="nk-checkbox-input" />
                                        </div>
                                        </div>
                                        <div class="col-span-6 grid">
                                        <a href="shop-product.html">
                                            <div class="flex items-center space-x-2">
                                            <div class="h-12 w-12">
                                                <img class="mx-auto h-full w-full object-contain" src="assets/img/products/fashion/women/15.jpg"
                                                alt="wishlist 1"/>
                                            </div>
                                            <div>
                                                <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                                This is first fashion cloth long sleeve
                                                </div>
                                                <div class="cursor-pointer text-xs">
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                                <span class="hover:underline">(123)</span>
                                                </div>
                                            </div>
                                            </div>
                                        </a>
                                        </div>
                                        <div class="col-span-1 grid">$139</div>
                                        <div class="col-span-1 grid">
                                        <select
                                            class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none"
                                        >
                                            <option>Qty 1</option>
                                            <option>Qty 2</option>
                                            <option>Qty 3</option>
                                            <option>Qty 4</option>
                                            <option>Qty 5</option>
                                        </select>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div
                                            class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600"
                                        >
                                            In Stock
                                        </div>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <button onclick="location.href = 'cart.html'" class="btn btn-full btn-outline">
                                            Add to Cart
                                        </button>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div class="hover:text-primary cursor-pointer text-right text-xs">
                                            <i class="fa-solid fa-trash"></i>
                                        </div>
                                        </div>
                                        <div class="col-span-1">
                                        <div class="flex items-center">
                                            <input type="checkbox" class="nk-checkbox-input" />
                                        </div>
                                        </div>
                                        <div class="col-span-6 grid">
                                        <a href="shop-product.html">
                                            <div class="flex items-center space-x-2">
                                            <div class="h-12 w-12">
                                                <img
                                                class="mx-auto h-full w-full object-contain"
                                                src="assets/img/products/fashion/women/19.jpg"
                                                alt="wishlist 1"
                                                />
                                            </div>
                                            <div>
                                                <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                                This is first fashion cloth long sleeve
                                                </div>
                                                <div class="cursor-pointer text-xs">
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                                <span class="hover:underline">(13)</span>
                                                </div>
                                            </div>
                                            </div>
                                        </a>
                                        </div>
                                        <div class="col-span-1 grid">$39</div>
                                        <div class="col-span-1 grid">
                                        <select
                                            class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none"
                                        >
                                            <option>Qty 1</option>
                                            <option>Qty 2</option>
                                            <option>Qty 3</option>
                                            <option>Qty 4</option>
                                            <option>Qty 5</option>
                                        </select>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div
                                            class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600"
                                        >
                                            In Stock
                                        </div>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <button onclick="location.href = 'cart.html'" class="btn btn-full btn-outline">
                                            Add to Cart
                                        </button>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div class="hover:text-primary cursor-pointer text-right text-xs">
                                            <i class="fa-solid fa-trash"></i>
                                        </div>
                                        </div>
                                        <div class="col-span-1">
                                        <div class="flex items-center">
                                            <input type="checkbox" class="nk-checkbox-input" />
                                        </div>
                                        </div>
                                        <div class="col-span-6 grid">
                                        <a href="shop-product.html">
                                            <div class="flex items-center space-x-2">
                                            <div class="h-12 w-12">
                                                <img
                                                class="mx-auto h-full w-full object-contain"
                                                src="assets/img/products/fashion/women/1.jpg"
                                                alt="wishlist 1"
                                                />
                                            </div>
                                            <div>
                                                <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                                This is first fashion cloth long sleeve
                                                </div>
                                                <div class="cursor-pointer text-xs">
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                                <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                                <span class="hover:underline">(3)</span>
                                                </div>
                                            </div>
                                            </div>
                                        </a>
                                        </div>
                                        <div class="col-span-1 grid">$19</div>
                                        <div class="col-span-1 grid">
                                        <select
                                            class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none"
                                        >
                                            <option>Qty 1</option>
                                            <option>Qty 2</option>
                                            <option>Qty 3</option>
                                            <option>Qty 4</option>
                                            <option>Qty 5</option>
                                        </select>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div
                                            class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600"
                                        >
                                            In Stock
                                        </div>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <button onclick="location.href = 'cart.html'" class="btn btn-full btn-outline">
                                            Add to Cart
                                        </button>
                                        </div>
                                        <div class="col-span-1 grid">
                                        <div class="hover:text-primary cursor-pointer text-right text-xs">
                                            <i class="fa-solid fa-trash"></i>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Social Network Account</div>
                            <div>
                            <a href="#">
                                <div class="text-xs text-gray-300 hover:underline"></div>
                            </a>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <h1 class="px-4 text-left text-sm font-semibold sm:text-base">
                            Please enter your social network accounts username
                        </h1>
                        <div class="w-full space-y-6 px-4 lg:w-3/4">
                            <div class="grid grid-cols-6 items-center gap-2 sm:gap-8">
                            <div class="flex space-x-1 sm:space-x-4">
                                <span><i class="fab fa-facebook-f"></i></span><span class="hidden sm:block">Facebook</span>
                            </div>
                            <div class="col-span-4 grid rounded sm:col-span-3">
                                <input
                                class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                type="text"
                                id="fbUsername"
                                value="johndoe.smith"
                                />
                            </div>
                            <div
                                class="col-span-1 grid cursor-pointer rounded border border-gray-400 py-2 text-center hover:bg-gray-100 hover:shadow-md sm:col-span-2"
                            >
                                <span class="hidden sm:block">Disconnect</span>
                                <span class="block sm:hidden"><i class="fas fa-unlink"></i></span>
                            </div>
                            </div>
                            <div class="grid grid-cols-6 items-center gap-2 sm:gap-8">
                            <div class="flex space-x-1 sm:space-x-4">
                                <span><i class="fab fa-instagram"></i></span><span class="hidden sm:block">Instagram</span>
                            </div>
                            <div class="col-span-4 grid rounded sm:col-span-3">
                                <input
                                class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                type="text"
                                id="igUsername"
                                value=""
                                />
                            </div>
                            <div
                                class="col-span-1 grid cursor-pointer rounded border border-gray-400 py-2 text-center hover:bg-gray-100 hover:shadow-md sm:col-span-2"
                            >
                                <span class="hidden sm:block">Connect</span>
                                <span class="block sm:hidden"><i class="fas fa-link"></i></span>
                            </div>
                            </div>
                            <div class="grid grid-cols-6 items-center gap-2 sm:gap-8">
                            <div class="flex space-x-1 sm:space-x-4">
                                <span><i class="fab fa-twitter"></i></span><span class="hidden sm:block">Twitter</span>
                            </div>
                            <div class="col-span-4 grid rounded sm:col-span-3">
                                <input
                                class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                type="text"
                                id="twitterUsername"
                                value=""
                                />
                            </div>
                            <div
                                class="col-span-1 grid cursor-pointer rounded border border-gray-400 py-2 text-center hover:bg-gray-100 hover:shadow-md sm:col-span-2"
                            >
                                <span class="hidden sm:block">Connect</span>
                                <span class="block sm:hidden"><i class="fas fa-link"></i></span>
                            </div>
                            </div>
                            <div class="grid grid-cols-6 items-center gap-2 sm:gap-8">
                            <div class="flex space-x-1 sm:space-x-4">
                                <span><i class="fab fa-tiktok"></i></span><span class="hidden sm:block">TikTok</span>
                            </div>
                            <div class="col-span-4 grid rounded sm:col-span-3">
                                <input
                                class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                type="text"
                                id="tiktokUsername"
                                value=""
                                />
                            </div>
                            <div
                                class="col-span-1 grid cursor-pointer rounded border border-gray-400 py-2 text-center hover:bg-gray-100 hover:shadow-md sm:col-span-2"
                            >
                                <span class="hidden sm:block">Connect</span>
                                <span class="block sm:hidden"><i class="fas fa-link"></i></span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Login Sessions</div>
                            <div>
                            <a href="#">
                                <div class="text-xs text-gray-300 hover:underline">View All</div>
                            </a>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <div class="mx-auto inline-flex w-full space-x-2 overflow-x-auto whitespace-nowrap pb-3">
                            <div class="flex-grow-1 flex-shrink-0 space-y-3 xl:w-full xl:flex-shrink xl:flex-grow-0">
                            <div class="grid grid-cols-9 items-center gap-4 px-4 font-semibold xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">Location</div>
                                <div class="col-span-1 grid">Status</div>
                                <div class="col-span-2 grid xl:col-span-3">Device</div>
                                <div class="col-span-2 grid">IP Address</div>
                                <div class="col-span-1 grid xl:col-span-2">Time</div>
                                <div class="col-span-1 grid">Action</div>
                            </div>
                            <div class="w-full border-b border-gray-400"></div>
                            <div class="grid grid-cols-9 items-center gap-4 px-4 text-sm xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">
                                <span class="font-semibold">California, US</span>
                                </div>
                                <div class="col-span-1 grid rounded bg-green-200 px-3 py-2 text-center text-xs text-green-600">
                                OK
                                </div>
                                <div class="col-span-2 grid xl:col-span-3">Safari-Mac OS</div>
                                <div class="col-span-2 grid">218.69.101.168</div>
                                <div class="col-span-1 grid xl:col-span-2">Now</div>
                                <div class="col-span-1 grid cursor-pointer hover:underline">Log Out</div>
                            </div>
                            <div class="grid grid-cols-9 items-center gap-4 px-4 text-sm xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">
                                <span class="font-semibold">New York, US</span>
                                </div>
                                <div class="col-span-1 grid rounded bg-green-200 px-3 py-2 text-center text-xs text-green-600">
                                OK
                                </div>
                                <div class="col-span-2 grid xl:col-span-3">iOS - iPhone 13 Pro Max</div>
                                <div class="col-span-2 grid">218.69.101.99</div>
                                <div class="col-span-1 grid xl:col-span-2">7 days ago</div>
                                <div class="col-span-1 grid cursor-pointer hover:underline">Log Out</div>
                            </div>
                            <div class="grid grid-cols-9 items-center gap-4 px-4 text-sm xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">
                                <span class="font-semibold">London, UK</span>
                                </div>
                                <div class="col-span-1 grid rounded bg-red-200 px-3 py-2 text-center text-xs text-red-600">ERR</div>
                                <div class="col-span-2 grid xl:col-span-3">iOS - iPad 12</div>
                                <div class="col-span-2 grid">23.69.101.168</div>
                                <div class="col-span-1 grid xl:col-span-2">2 weeks ago</div>
                                <div class="col-span-1 grid cursor-pointer hover:underline">Blocked</div>
                            </div>
                            <div class="grid grid-cols-9 items-center gap-4 px-4 text-sm xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">
                                <span class="font-semibold">Alabama, US</span>
                                </div>
                                <div class="col-span-1 grid rounded bg-green-200 px-3 py-2 text-center text-xs text-green-600">
                                OK
                                </div>
                                <div class="col-span-2 grid xl:col-span-3">Chrome - Windows 11</div>
                                <div class="col-span-2 grid">218.69.101.122</div>
                                <div class="col-span-1 grid xl:col-span-2">4 weeks ago</div>
                                <div class="col-span-1 grid cursor-pointer hover:underline">Log Out</div>
                            </div>
                            <div class="grid grid-cols-9 items-center gap-4 px-4 text-sm xl:grid-cols-12">
                                <div class="col-span-2 grid xl:col-span-3">
                                <span class="font-semibold">New Mexico, US</span>
                                </div>
                                <div class="col-span-1 grid rounded bg-yellow-200 px-3 py-2 text-center text-xs text-yellow-600">
                                WRN
                                </div>
                                <div class="col-span-2 grid xl:col-span-3">Firefox - Windows 11</div>
                                <div class="col-span-2 grid">228.109.99.168</div>
                                <div class="col-span-1 grid xl:col-span-2">1 month ago</div>
                                <div class="col-span-1 grid cursor-pointer hover:underline">Expired</div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>  
                </div>   */}
        </>
    );
}
export default UserProfile;