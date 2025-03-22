import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import { fetchPoojaData } from './PoojaAPIService';


const FeaturedPoojas = () => {

  const [pooja, setPooja] = useState([]);
  const imgUrl = "http://34.131.10.8:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPoojaData();
        setPooja(data.data);
      } catch (error) {
        console.error("Error fetching pooja data:", error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  console.log(pooja)


const poojas = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/NewAppFiles%2FpujaVectors%2FGreihPravesh.png?alt=media&token=461b9b31-c406-41bc-a66e-1707743ad493', title: 'Pooja Booking', price: '$50', rating: 4.5, url: 'javascript:void(0)' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fsaraswati_maa.png?alt=media&token=3f0608ca-6ef4-4b71-a5a1-93277a56e72c', title: 'Brahman Bhoj', price: '$40', rating: 4.7, url: 'javascript:void(0)' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/appfiles%2Fpuja2.png?alt=media&token=86a025b0-f401-4271-bed8-477505e2fea9', title: 'Bhajan Mandal', price: '$25', rating: 4.2, url: 'javascript:void(0)' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fbhumi-pujan.png?alt=media&token=d55f705a-e0e3-4d07-8711-880f4f7d4685', title: 'Temple Donation', price: '$20', rating: 4.8, url: 'javascript:void(0)' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/appfiles%2FVectors%2Fwest-bengal-durga-puja-celebration-260nw-1189413016-removebg-preview.png?alt=media&token=7220edc9-9844-4001-8339-bfa0a5b8b11a', title: 'Daily Pandit', price: '$35', rating: 4.6, url: 'javascript:void(0)' },
];

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
  }
return (
    <section className="bg-white px-5 rashi_wrapper mt-2" id="zodiac_Sign">
        <div className="container mx-auto px-12">
            <div className="heading_wrapper" style={{marginBottom:"40px"}}>
           
                    <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
                <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
                <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Poojas
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Explore our wide range of spiritual services designed to meet all your devotional needs
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
{pooja?.map((service, index) => {
    const words = service.pooja_name.split(" "); // Splitting the pooja name
    return (
        <SwiperSlide key={index} >
          <Link to={`/pooja/pooja-details/${service.slug_url}`} className="block">
            <div className="rashi_sign_box bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300" 
                style={{ borderRadius: "20px", border: "1px #ff7e00 solid" }}>
                
                {/* Image Section */}
                <div className="sign_box_img flex justify-center">
                    <img
                        src={imgUrl + service.pooja_image}
                        alt={service.pooja_name}
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* Content Section */}
                <div className="sign_box_cont text-center p-1">
                    <h4 className="text-xl font-semibold mb-2 mb-1">
                        {words.length > 4 ? `${words.slice(0, 2).join(" ")}` : service.pooja_name}
                    </h4>
                    
                    <div className="flex justify-center items-center gap-1 mt-2">
                        {renderStars(4.2)}
                    </div>

                    <p className="text-gray-600 mb-1">Price: ${service.price_withSamagri}</p>
                    
                    <Link
                        to={`/pooja/pooja-details/${service.slug_url}`}
                        className="inline-block bg-[#ff7e00] text-white px-6 py-2 rounded-lg uppercase hover:bg-[#e66a00] transition-colors duration-300"
                    >

                      {console.log(service.slug_url)}
                        Book Now
                    </Link>
                </div>
            </div>
            </Link>
        </SwiperSlide>
    );
})}

</Swiper>
        </div>
    </section>
);
};

export default FeaturedPoojas;