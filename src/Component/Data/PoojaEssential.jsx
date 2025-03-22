import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
const PoojaEssential = () =>{
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }

    return(
        <>
            <section className="bg-white px-5 rashi_wrapper" id="zodiac_Sign">
                <div className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <div class="justify-center sm:justify-between md:flex-row md:items-center">
              
                <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
                <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
                <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Pooja Essentials
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Explore our wide range of spiritual services designed to meet all your devotional needs
            </p>
            </motion.div>
             
            </div>
                    <Swiper 
                        autoplay={{ delay: 2500, disableOnInteraction: true, }}
                        spaceBetween={50}
                        slidesPerView={5}
                        onSlideChange={() => console.log('slide change')}onSwiper={(swiper) => console.log(swiper)}>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                                <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                    <img
                                    class="mx-auto my-auto h-full w-full object-contain text-xs"
                                    src="assets/img/products/fashion/women/2.jpg"
                                    alt="Item 1"
                                    />
                                    <div
                                    class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                    >
                                    <div
                                        class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                    >
                                        <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                        <a href="account-wishlist.html">
                                            <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                            <i class="far fa-heart"></i>
                                            </span>
                                        </a>
                                        <div
                                            data-modal-toggle="nk-modal-quick-view"
                                            class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                        </div>

                                        <a href="compare-items.html"
                                            ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                            <i class="fas fa-exchange-alt"></i></span
                                        ></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="xs:text-sm text-left text-xs">
                                    <div class="space-y-1">
                                        <div class="mt-2">
                                        <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                            <a href="shop-product.html">Long multi-color dress event fashion</a>
                                        </h5>
                                        </div>
                                        <div class="font-semibold">
                                        <span class="text-lg text-gray-900">$199</span>
                                        <span class="text-xs text-gray-400 line-through">$299</span>
                                        </div>
                                        <div>
                                        <a
                                            class="flex items-center justify-between"
                                            href="shop-product.html#customers-rating-reviews"
                                        >
                                            <span class="text-yellow-400">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            </span>
                                            <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                        </a>
                                        </div>
                                        <div class="text-xs font-semibold text-green-500">
                                        <p>Get it in 2 days</p>
                                        </div>
                                        <div>
                                        <p>
                                            <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                            <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                            >Elkhart, IN</span
                                            >
                                        </p>
                                        </div>
                                        <div class="py-1">
                                        <a href="cart.html"
                                            ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                        </a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                            <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                <img
                                class="mx-auto my-auto h-full w-full object-contain text-xs"
                                src="assets/img/products/fashion/women/2.jpg"
                                alt="Item 1"
                                />
                                <div
                                class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100"
                                >
                                <div
                                    class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3"
                                >
                                    <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                    <a href="account-wishlist.html">
                                        <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="far fa-heart"></i>
                                        </span>
                                    </a>
                                    <div
                                        data-modal-toggle="nk-modal-quick-view"
                                        class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
                                    >
                                        <i class="fa-regular fa-eye"></i>
                                    </div>

                                    <a href="compare-items.html"
                                        ><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                        <i class="fas fa-exchange-alt"></i></span
                                    ></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div class="xs:text-sm text-left text-xs">
                                <div class="space-y-1">
                                    <div class="mt-2">
                                    <h5 class="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
                                        <a href="shop-product.html">Long multi-color dress event fashion</a>
                                    </h5>
                                    </div>
                                    <div class="font-semibold">
                                    <span class="text-lg text-gray-900">$199</span>
                                    <span class="text-xs text-gray-400 line-through">$299</span>
                                    </div>
                                    <div>
                                    <a
                                        class="flex items-center justify-between"
                                        href="shop-product.html#customers-rating-reviews"
                                    >
                                        <span class="text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </span>
                                        <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                    </a>
                                    </div>
                                    <div class="text-xs font-semibold text-green-500">
                                    <p>Get it in 2 days</p>
                                    </div>
                                    <div>
                                    <p>
                                        <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                        <span class="cursor-pointer font-semibold text-blue-900 hover:underline"
                                        >Elkhart, IN</span
                                        >
                                    </p>
                                    </div>
                                    <div class="py-1">
                                    <a href="cart.html"
                                        ><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>  
        </>
    );
}

export default PoojaEssential;