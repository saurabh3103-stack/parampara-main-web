import React from 'react'
import { motion } from 'framer-motion';
export default function Horoscope() {
    const zodiacSigns = [
        { name: "Aries", color: "bg-red-300", textColor: "text-red-700", icon: "🐏" },
        { name: "Taurus", color: "bg-blue-300", textColor: "text-blue-700", icon: "🐂" },
        { name: "Gemini", color: "bg-yellow-300", textColor: "text-yellow-700", icon: "👥" },
        { name: "Cancer", color: "bg-gray-300", textColor: "text-gray-700", icon: "🦀" },
        { name: "Leo", color: "bg-orange-300", textColor: "text-orange-700", icon: "🦁" },
        { name: "Virgo", color: "bg-green-300", textColor: "text-green-700", icon: "👩" },
        { name: "Libra", color: "bg-cyan-300", textColor: "text-cyan-700", icon: "⚖️" },
        { name: "Scorpio", color: "bg-pink-300", textColor: "text-pink-700", icon: "🦂" },
        { name: "Sagittarius", color: "bg-purple-300", textColor: "text-purple-700", icon: "🏹" },
        { name: "Capricorn", color: "bg-rose-300", textColor: "text-rose-700", icon: "🐐" },
        { name: "Aquarius", color: "bg-violet-300", textColor: "text-violet-700", icon: "🏺" },
        { name: "Pisces", color: "bg-red-300", textColor: "text-red-700", icon: "🐟" },
      ];
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
    <section className="bg-white px-5 rashi_wrapper" id="zodiac_Sign" style={{backgroundColor:'#fff'}}>
<div className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
                <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
                <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Daily Free Horoscopes

            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Your daily zodiac sign reading free            </p>
            </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {zodiacSigns.map((sign, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${sign.color}`}
          >
            <div className="text-5xl">{sign.icon}</div>
            <h2 className={`mt-4 font-bold ${sign.textColor}`}>{sign.name}</h2>
          </div>
        ))}
      </div>
    </div>
    </section>
    
  )
}

