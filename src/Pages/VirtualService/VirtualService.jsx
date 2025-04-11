import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function VirtualService() {
    const services = [
        {
            image: "https://deificindia.com/namonamah/assets/image/service/horoscope.png",
            title: "Daily Horoscope",
            description: "Get insights about your day based on your zodiac sign",
        },
        {
            image: "https://deificindia.com/namonamah/assets/image/service/ask.png",
            title: "Ask Pandit Ji",
            description: "Connect with experienced pandits for spiritual guidance",
        },
        {
            image: "https://deificindia.com/namonamah/assets/image/service/locater.png",
            title: "Temple Locator",
            description: "Find sacred temples near your location",
        },
    ];

    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
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
                                Virtual Service
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

                {/* Responsive Grid for All Devices */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                            }}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100"
                        >
                            <div className="relative overflow-hidden group h-40 sm:h-48 bg-orange-50 flex items-center justify-center p-4">
                                <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="h-28 w-28 sm:h-32 sm:w-32 object-contain z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4 sm:p-6 text-center">
                                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{service.description}</p>
                                <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base text-white bg-orange-500 rounded-full font-medium shadow hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1">
                                    BOOK NOW
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}

export default VirtualService;