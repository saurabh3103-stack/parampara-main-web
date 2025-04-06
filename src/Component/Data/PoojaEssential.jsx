import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import { fetchPoojaEssenceData } from '../../Pages/EStore/EStoreService';

const PoojaEssence = () => {
  const [essence, setEssence] = useState([]);
  const imgUrl = "http://localhost:3000/"; // Base URL for images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPoojaEssenceData();
        console.log("Fetched Data:", data); // Debugging: Check fetched data
        if (Array.isArray(data.data)) { // Ensure data is an array
          setEssence(data.data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching pooja essence data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
console.log(essence);
    const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} className="text-yellow-400" />)}
      </>
    );
  };

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
  };

  return (
    <section className="bg-white px-5 rashi_wrapper mt-2" id="pooja_essence">
      <div className="container mx-auto px-12">
        <div className="heading_wrapper" style={{ marginBottom: "40px" }}>
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
              <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
              <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Pooja Essence</h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600">
              Discover the essence of our spiritual services designed to enhance your devotional experience.
            </p>
          </motion.div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {Array.isArray(essence) && essence.length > 0 ? (
            essence.map((item, index) => {
              const words = item.name ? item.name.split(" ") : []; 
              return (
                <SwiperSlide key={index}>
                  <Link to={`/e-store/product/${item.slug}`} className="block"> 
                    <div className="rashi_sign_box bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300"
                      style={{ borderRadius: "20px", border: "1px #ff7e00 solid" }}>

                      {/* Image Section */}
                      <div className="sign_box_img flex justify-center">
                        <img
                          src={imgUrl + item.featuredImage} 
                          alt={item.name || "Pooja Essence"}
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="sign_box_cont text-center p-1">
                        <h4 className="text-xl font-semibold mb-2 mb-1">
                          {words.length > 4 ? `${words.slice(0, 2).join(" ")}` : item.name}
                        </h4>

                        <div className="flex justify-center items-center gap-1 mt-2">
                          {renderStars(item.rating || 4.2)}
                        </div>

                        <p className="text-gray-600 mb-1">Price: ₹{item.sellingPrice}</p> {/* Use `sellingPrice` */}
                      <p className="text-gray-600 mb-1">Category: {item.category}</p> {/* Use `category` */}

                        <Link
                          to={`/e-store/product/${item.slug}`}
                          className="inline-block bg-[#ff7e00] text-white px-6 py-2 rounded-lg uppercase hover:bg-[#e66a00] transition-colors duration-300"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No Pooja Essence data available.</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default PoojaEssence;