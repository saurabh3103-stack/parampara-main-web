import React from 'react'
import { motion } from "framer-motion"
import { Phone, Mail, Clock, MapPin, Send, Home, Users, Headphones, Globe, Star, MessageSquare, User, Calendar, Heart, Flower, Sparkles } from 'lucide-react'
import {Link} from 'react-router-dom'
function Service() {
    const services = [
        {
          image: "https://deificindia.com/namonamah/assets/image/service/pandit.png",
          title: "Pooja Booking",
          featured: true,
          url:'/pooja',
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/shoping.jpeg",
          title: "E-Store",
          url:'/e-store',
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/brahman.png",
          title: "Brahman Bhoj",
          url:'/brahman-bhoj',
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/bhajan3.png",
          title: "Bhajan Mandal",
          url:'/bhajan-mandal',
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/donate.jpg",
          title: "Temple Donation",
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/dailypandit.png",
          title: "Daily Pandit",
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/pooja.png",
          title: "Puja at Temple",
        },
        {
          image: "https://deificindia.com/namonamah/assets/image/service/darshan1.png",
          title: "Darshan Booking",
        },
      ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      borderColor: "#FF6B00",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const overlayVariants = {
    hover: {
      opacity: 0.15,
      transition: {
        duration: 0.3,
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Floating animation for featured card
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

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
    <>
      <div>
        <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-16">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay" 
              style={{ 
                backgroundImage: "url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-50">
                Our Service   
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center text-amber-100 mt-2"
              >
                Preserving Ancient Wisdom • Illuminating Modern Lives
              </motion.p>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute left-10 top-1/2 transform -translate-y-1/2 hidden md:block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-amber-300/40" />
              </motion.div>
            </div>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden md:block">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-amber-300/40" />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
            <Link to={service.url}>
                <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
                    {/* Card with hover effects */}
                    <motion.div
                    className={`bg-white rounded-2xl p-3 sm:p-4 border-2 ${
                        service.featured ? "border-orange-500" : "border-orange-300"
                    } w-full aspect-square flex flex-col justify-center items-center relative overflow-hidden shadow-md`}
                    variants={cardVariants}
                    whileHover="hover"
                    animate={service.featured ? floatingAnimation : {}}
                    >
                    {/* Decorative elements for featured card */}
                    {service.featured && (
                        <>
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg z-30">
                            Popular
                        </div>
                        <motion.div
                            className="absolute -top-10 -left-10 w-20 h-20 bg-orange-100 rounded-full opacity-50"
                            animate={{
                            scale: [1, 1.2, 1],
                            transition: { duration: 3, repeat: Infinity },
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-10 -right-10 w-20 h-20 bg-orange-100 rounded-full opacity-50"
                            animate={{
                            scale: [1, 1.2, 1],
                            transition: { duration: 3, repeat: Infinity, delay: 1.5 },
                            }}
                        />
                        </>
                    )}

                    {/* Overlay effect */}
                    <motion.div
                        className="absolute inset-0 bg-orange-500 opacity-0 z-10"
                        variants={overlayVariants}
                    ></motion.div>

                    {/* Image */}
                    <motion.div
                        className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center"
                        variants={imageVariants}
                    >
                        <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain rounded-xl"
                        />
                    </motion.div>

                    {/* Title inside card */}
                    <h4
                        className={`text-center font-medium mt-3 z-20 ${
                        service.featured ? "text-orange-700 font-semibold" : "text-slate-700"
                        }`}
                    >
                        {service.title}
                    </h4>

                    {/* View button on hover */}
                    <motion.button
                        className="mt-2 text-xs bg-orange-500 text-white py-1 px-3 rounded-full opacity-0 z-20"
                        variants={{
                        hover: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 },
                        },
                        }}
                        initial={{ y: 10 }}
                    >
                        View Details
                    </motion.button>
                    </motion.div>
                </motion.div>
            </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Service