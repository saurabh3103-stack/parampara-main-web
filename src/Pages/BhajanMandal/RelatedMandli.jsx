// import React from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { fetchBhajanByCategory } from "./BhajanService";
// import { Link } from "react-router-dom";

// import { useState,useEffect } from "react";
// const RelatedMandali = ({category,current}) => {
   


//     const [bhajans, setBhajans] = useState([]);
    

//      useEffect(() => {
//             const loadBhajans = async () => {
//                 try {
//                     const data = await fetchBhajanByCategory();
//                     setBhajans(data?.data || []);
//                 } catch (error) {
//                     console.error("Failed to load bhajans", error);
//                 }
//             };
//             loadBhajans();
//         }, []);
       

 
//     return (
//         <>
//          <section className="bg-white px-5 rashi_wrapper" id="zodiac_Sign" style={{background:"#fff"}}>
//                 <div className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
//                 <div class="flex flex-col justify-center sm:justify-between md:flex-row md:items-center">
//               <div>
//                 <h1 class="text-base font-bold md:text-2xl mb-4 ">Related Bhajan Mandali</h1>
//               </div>
//               <div id="new-arrival-tabs" class="hidden justify-center md:flex md:flex-row md:space-x-4 md:text-sm">
//                 <div data-filter-link="all" class="new-active cursor-pointer">View All</div>
//               </div>
//             </div>
//                     <Swiper 
//                         autoplay={{ delay: 2500, disableOnInteraction: true, }}
//                         spaceBetween={50}
//                         slidesPerView={5}
//                         onSlideChange={() => console.log('slide change')}onSwiper={(swiper) => console.log(swiper)}>
                       
//             {bhajans?.map(bhajan =>  
//               (

                

// (bhajan._id!= current)?
//                 (<SwiperSlide key={bhajan._id }>
                   
//                     <div className="group rounded border-gray-400 pb-0 lg:pb-3">
//                         <div className="relative w-full cursor-pointer lg:h-[16.25rem]">
//                             <img
//                                 className="mx-auto my-auto h-full w-full object-contain text-xs"
//                                 src={bhajan.bhajan_image || 'default-image.jpg'} // Fallback image if none provided
//                                 alt={bhajan.bhajan_name}
//                             />
//                             <div className="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100">
//                                 <div className="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3">
//                                     <div className="flex flex-row items-center justify-center space-x-2 px-2 text-center">
//                                         <a href="account-wishlist.html">
//                                             <span className="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
//                                                 <i className="far fa-heart"></i>
//                                             </span>
//                                         </a>
//                                         <div
//     data-modal-toggle="nk-modal-quick-view"
//     className="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50"
// >
//     <Link to={`/bhajan-mandal/${bhajan.slug_url}`} className="flex items-center justify-center h-full w-full">
//         <i className="fa-regular fa-eye"></i>
//     </Link>
// </div>
                                        
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <div className="xs:text-sm text-left text-xs">
//                                 <div className="space-y-1">
//                                     <div className="mt-2">
//                                         <h5 className="line-clamp-1 mb-0 cursor-pointer font-normal text-blue-700 hover:underline">
//                                             <Link to={'/bhajan-mandal/'+bhajan.slug_url}>{bhajan.bhajan_name}</Link>
//                                         </h5>
//                                     </div>
//                                     <div className="font-semibold">
//                                         <span className="text-lg text-gray-900">₹{bhajan.bhajan_price}</span>
//                                         {/* Assuming bhajan_price is in INR */}
//                                     </div>
//                                     <div>
//                                         <a
//                                             className="flex items-center justify-between"
//                                             href="shop-product.html#customers-rating-reviews"
//                                         >
//                                             <span className="text-yellow-400">
//                                                 {/* Assuming you want to show a fixed star rating */}
//                                                 <i className="fas fa-star"></i>
//                                                 <i className="fas fa-star"></i>
//                                                 <i className="fas fa-star"></i>
//                                                 <i className="fas fa-star"></i>
//                                                 <i className="fas fa-star"></i>
//                                             </span>
//                                             <span className="text-xs text-blue-700 hover:underline">(0)</span>
//                                         </a>
//                                     </div>
//                                     <div className="text-xs font-semibold text-green-500">
//                                         <p>Get it in 2 days</p>
//                                     </div>
//                                     <div>
//                                         <p>
//                                             <span className="font-semibold">Shipping:</span> Free Shipping in 2 Days to
//                                             <span className="cursor-pointer font-semibold text-blue-900 hover:underline">Kanpur, UP</span>
//                                         </p>
//                                     </div>
//                                     <div className="py-1">
//                                         <a href="cart.html">
//                                             <span className="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>):""
//             ))}
      
                       
//                     </Swiper>
//                 </div>
//             </section>  
//         </>
//     );

// }
// export default RelatedMandali;


import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchBhajanByCategory } from "./BhajanService";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const RelatedMandali = ({ category, current }) => {
    const [bhajans, setBhajans] = useState([]);

    useEffect(() => {
        const loadBhajans = async () => {
            try {
                const data = await fetchBhajanByCategory();
                setBhajans(data?.data || []);
            } catch (error) {
                console.error("Failed to load bhajans", error);
            }
        };
        loadBhajans();
    }, []);

    return (
        <div className="mt-12">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Related Bhajan Mandali</h2>
                <button className="text-primary text-sm flex items-center">
                    <i className="bi bi-info-circle mr-1"></i>
                    <span>Sponsored</span>
                </button>
            </div>

            {/* Swiper Section */}
            <Swiper
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {bhajans.map(bhajan => (
                    bhajan._id !== current && (
                        <SwiperSlide key={bhajan._id}>
                            <div className="border rounded-lg overflow-hidden group bg-white shadow-sm">
                                {/* Image Section */}
                                <div className="relative">
                                    <img
                                        src={bhajan.bhajan_image || '/placeholder.svg'}
                                        alt={bhajan.bhajan_name}
                                        className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 p-0 flex items-center justify-center">
                                        <Heart className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Bhajan Details */}
                                <div className="p-4">
                                    <div className="text-sm text-gray-500 mb-1">Bhajan Services</div>
                                    <h3 className="font-medium text-lg mb-2 truncate">{bhajan.bhajan_name}</h3>

                                    {/* Rating & Reviews */}
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < Math.floor(bhajan.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                            <span className="ml-1 text-xs text-gray-600">({bhajan.rating})</span>
                                        </div>
                                        <span className="mx-1 text-gray-300">|</span>
                                        <span className="text-xs text-gray-600">{bhajan.reviews} Reviews</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold">₹{bhajan.bhajan_price.toLocaleString()}</span>
                                    </div>

                                    {/* Select Button */}
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                                        SELECT OPTIONS
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                ))}
            </Swiper>
        </div>
    );
};

export default RelatedMandali;