import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Achievement = () => {
    const stats = [
        {
          image: "https://i0.wp.com/pujabooking.com/wp-content/uploads/2023/02/pngegg.png?fit=519%2C504&ssl=1", 
          title: "SPIRITUAL GUIDE",
          count: 4000,
          description: "Priests, Pandits, Religious Experts & Consultants"
        },
        {
          image: "https://i0.wp.com/pujabooking.com/wp-content/uploads/2024/05/Pooja-Kalash-pujabooking_com.png?w=654&ssl=1", 
          title: "TYPES OF PUJA",
          count: 500,
          description: "500+ Types of Religious Services"
        },
        {
          image: "https://i0.wp.com/pujabooking.com/wp-content/uploads/2023/06/perform-puja.png?w=301&ssl=1", 
          title: "PUJA PERFORMED",
          count: 100000,
          description: "4000+ Spiritual Guides performed more than 100000+ Puja"
        }
    ];

    return (
        <div id="website_visitors" className="astrologers-work py-12 bg-white">
            <div className="container mx-auto px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 rounded-lg transition-all duration-300">
                            <div className="flex justify-center mb-4">
                                <motion.img 
                                    src={stat.image} 
                                    alt={stat.title} 
                                    className="w-36 h-36 object-contain"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ background: "#fff3c7", borderRadius: "50%", padding: "2%" }}
                                />
                            </div>
                            {/* Counter Animation */}
                            <h3 className="text-3xl font-bold text-white">
                                <CountUp start={0} end={stat.count} duration={3} separator="," />+
                            </h3>
                            <h4 className="text-xl font-bold text-white">{stat.title}</h4>
                            <p className="text-gray-700 mt-2">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Achievement;
