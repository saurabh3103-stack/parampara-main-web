"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Clock, MapPin, Send, Home, Users, Headphones, Globe, Star, MessageSquare, User, Calendar, Heart, Flower, Sparkles } from 'lucide-react'

// Import images
import omSymbol from "./om-symbol.png"
import diyas from "./diyas.png"
import swastik from "./swastik.png"
import kalash from "./kalash.png"
import vedicBook from "./vedic-book.png"
import lotus from "./lotus.png"

const AboutUs = () => {
  // State to track section visibility
  const [isVisible, setIsVisible] = useState({
    intro: false,
    aim: false,
    vision: false,
    mission: false,
    values: false
  })

  const OmIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM14.65,7.06a3.31,3.31,0,0,0-1.89-.56,3,3,0,0,0-1.86.56,1.83,1.83,0,0,0-.75,1.56,1.67,1.67,0,0,0,.34,1.09,3,3,0,0,0,.88.7,6.45,6.45,0,0,0,1.09.45V12a4.06,4.06,0,0,1-2.3.71,2.2,2.2,0,0,1-1.43-.48,1.6,1.6,0,0,1-.6-1.31,1.9,1.9,0,0,1,.09-.6l.12-.36-.69-.28-.12.36a2.6,2.6,0,0,0-.12.81,2.3,2.3,0,0,0,.86,1.89,3,3,0,0,0,1.89.67,4.83,4.83,0,0,0,2.3-.62v1.3a3.83,3.83,0,0,1-2.3.8,2.37,2.37,0,0,1-1.46-.48,1.6,1.6,0,0,1-.63-1.34,1.9,1.9,0,0,1,.09-.6l.12-.36-.69-.28-.12.36a2.6,2.6,0,0,0-.12.81,2.33,2.33,0,0,0,.86,1.92,3.12,3.12,0,0,0,2,.7,4.6,4.6,0,0,0,2.3-.65v.73a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V10.86a6.45,6.45,0,0,0,1.09-.45,3,3,0,0,0,.88-.7,1.67,1.67,0,0,0,.34-1.09A1.83,1.83,0,0,0,14.65,7.06Zm.09,2.19a2.06,2.06,0,0,1-.6.48,5.45,5.45,0,0,1-.92.38,5.45,5.45,0,0,1-.92-.38,2.06,2.06,0,0,1-.6-.48.72.72,0,0,1-.2-.5.9.9,0,0,1,.38-.77,2,2,0,0,1,1.22-.29,2.22,2.22,0,0,1,1.25.29.9.9,0,0,1,.38.77A.72.72,0,0,1,14.74,9.25Z"/>
    </svg>
  )

  // Scroll handler for section visibility
  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        intro: document.getElementById("intro-section"),
        aim: document.getElementById("aim-section"),
        vision: document.getElementById("vision-section"),
        mission: document.getElementById("mission-section"),
        values: document.getElementById("values-section")
      }

      Object.keys(sections).forEach(key => {
        if (sections[key] && isElementInViewport(sections[key])) {
          setIsVisible(prev => ({ ...prev, [key]: true }))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top <= (window.innerHeight * 0.75) &&
      rect.bottom >= (window.innerHeight * 0.25)
    )
  }

  // Animation configurations
  const animations = {
    floating: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97]
        },
      },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97]
        },
      },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97]
        },
      },
    },
    staggerContainer: {
      visible: {
        transition: {
          staggerChildren: 0.2
        }
      }
    },
    valueItem: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
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
              About Vaidic Parampara
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

      {/* Introduction Section */}
      <motion.section 
        id="intro-section"
        className="py-20 px-4"
        initial="hidden"
        animate={isVisible.intro ? "visible" : "hidden"}
        variants={animations.staggerContainer}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="relative w-full md:w-1/2"
            variants={animations.fadeInLeft}
          >
            <img 
              src='https://wd-image.webdunia.com/image-conversion/process-aws.php?url=https://nonprod-media.webdunia.com/public_html/_media/hi/img/article/2020-12/07/full/1607311219-0037.jpg&w=&h=&outtype=webp'
              alt="Ancient Temple"
              className="rounded-lg shadow-xl w-full" 
            />
            <motion.img 
              className="absolute -bottom-8 -right-8 w-24 h-24"
              src={lotus}
              alt="Lotus"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            variants={animations.fadeInRight}
          >
            <h2 className="text-3xl font-bold text-orange-800 mb-6">Our Sacred Journey</h2>
            <p className="text-gray-700 mb-4">
              Vaidic Parampara is a divine bridge connecting the ancient Vedic wisdom with contemporary spiritual seekers. 
              We are custodians of timeless traditions, preserving the sacred rituals and knowledge that have illuminated 
              Hindu spiritual practices for millennia.
            </p>
            <p className="text-gray-700 mb-6">
              Our organization brings together erudite pandits and spiritual guides, each deeply versed in authentic Vedic 
              scriptures and rituals. Through our services, we make these profound traditions accessible to devotees 
              worldwide, ensuring the eternal flame of Vedic knowledge continues to guide humanity.
            </p>
            <div className="flex items-center gap-2">
              <img src={swastik} alt="Swastik Symbol" className="w-10 h-10" />
              <span className="text-orange-700 font-medium">Vaidic Parampara Family</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Aim Section */}
      <motion.section 
        id="aim-section"
        className="py-20 px-4 bg-amber-50"
        initial="hidden"
        animate={isVisible.aim ? "visible" : "hidden"}
        variants={animations.staggerContainer}
      >
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            variants={animations.fadeInRight}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-16 bg-orange-600 origin-left scale-x-0" />
              <h2 className="text-3xl font-bold text-orange-800">Our Divine Aim</h2>
              <motion.img 
                src={diyas} 
                alt="Diyas" 
                className="w-10 h-10"
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: {
                    duration: 6,
                    repeat: Infinity
                  }
                }}
              />
            </div>
            <p className="text-gray-700 mb-6">
              At Vaidic Parampara, our sacred aim is to preserve and propagate the authentic Vedic traditions that form 
              the spiritual foundation of Sanatana Dharma. We serve as divine instruments to make these eternal rituals 
              accessible to all sincere seekers.
            </p>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start gap-2 text-gray-700"
                variants={animations.valueItem}
              >
                <span className="text-orange-600 mt-1">•</span>
                <span>Preserve authentic Vedic rituals with scriptural precision</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 text-gray-700"
                variants={animations.valueItem}
              >
                <span className="text-orange-600 mt-1">•</span>
                <span>Make spiritual practices accessible to global devotees</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 text-gray-700"
                variants={animations.valueItem}
              >
                <span className="text-orange-600 mt-1">•</span>
                <span>Guide seekers through qualified Vedic scholars</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2 text-gray-700"
                variants={animations.valueItem}
              >
                <span className="text-orange-600 mt-1">•</span>
                <span>Nurture a community united in spiritual growth</span>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            variants={animations.fadeInLeft}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md">
              <img 
                src={vedicBook} 
                alt="Vedic Scriptures" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        id="vision-section"
        className="py-20 px-4"
        initial="hidden"
        animate={isVisible.vision ? "visible" : "hidden"}
        variants={animations.staggerContainer}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            variants={animations.fadeInLeft}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md">
              <img 
                src={kalash} 
                alt="Sacred Kalash" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            variants={animations.fadeInRight}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.img 
                src={omSymbol} 
                alt="Om Symbol" 
                className="w-10 h-10"
                animate={animations.rotate}
              />
              <h2 className="text-3xl font-bold text-orange-800">Our Sacred Vision</h2>
              <div className="h-1 w-16 bg-orange-600 origin-left scale-x-0" />
            </div>
            <p className="text-gray-700 mb-6">
              We envision a world where the eternal wisdom of the Vedas illuminates every aspect of human life. 
              Vaidic Parampara aspires to create a global spiritual community where authentic Vedic practices 
              transcend geographical boundaries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md"
                variants={animations.valueItem}
              >
                <div className="text-2xl mb-2">🕉️</div>
                <p className="text-gray-700">Global presence for authentic Vedic practices</p>
              </motion.div>
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md"
                variants={animations.valueItem}
              >
                <div className="text-2xl mb-2">🌍</div>
                <p className="text-gray-700">Innovative accessibility to sacred traditions</p>
              </motion.div>
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md"
                variants={animations.valueItem}
              >
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="text-gray-700">Community of enlightened seekers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        id="mission-section"
        className="py-20 px-4 bg-amber-50"
        initial="hidden"
        animate={isVisible.mission ? "visible" : "hidden"}
        variants={animations.staggerContainer}
      >
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            variants={animations.fadeInRight}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-16 bg-orange-600 origin-left scale-x-0" />
              <h2 className="text-3xl font-bold text-orange-800">Our Divine Mission</h2>
              <motion.img 
                src={swastik} 
                alt="Swastik" 
                className="w-10 h-10"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity
                  }
                }}
              />
            </div>
            <p className="text-gray-700 mb-6">
              Our sacred mission is to provide authentic Vedic services that transform lives. Each ritual is performed 
              with scriptural precision and divine devotion, creating a conduit for spiritual blessings.
            </p>
            <div className="space-y-4">
              <motion.div 
                className="flex gap-4 items-start"
                variants={animations.valueItem}
              >
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">01</div>
                <p className="text-gray-700">Conduct Vedic ceremonies with utmost devotion and precision</p>
              </motion.div>
              <motion.div 
                className="flex gap-4 items-start"
                variants={animations.valueItem}
              >
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">02</div>
                <p className="text-gray-700">Provide guidance through enlightened Vedic scholars</p>
              </motion.div>
              <motion.div 
                className="flex gap-4 items-start"
                variants={animations.valueItem}
              >
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">03</div>
                <p className="text-gray-700">Educate about the profound significance of rituals</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center relative"
            variants={animations.fadeInLeft}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-64 flex items-center justify-center">
              <motion.img 
                src={diyas} 
                alt="Sacred Diyas" 
                className="w-32 h-32"
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        id="values-section"
        className="py-20 px-4"
        initial="hidden"
        animate={isVisible.values ? "visible" : "hidden"}
        variants={animations.staggerContainer}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={animations.fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">Our Eternal Values</h2>
            <p className="text-gray-600">The guiding principles that illuminate our path</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Authenticity</h3>
              <p className="text-gray-700">Uncompromising adherence to scriptural Vedic traditions</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Devotion</h3>
              <p className="text-gray-700">Every act performed with divine love and reverence</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Knowledge</h3>
              <p className="text-gray-700">Preserving and sharing the ocean of Vedic wisdom</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Accessibility</h3>
              <p className="text-gray-700">Making sacred traditions available to all sincere seekers</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🤲</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Service</h3>
              <p className="text-gray-700">Selfless dedication to spiritual upliftment of all</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
              variants={animations.valueItem}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(237, 138, 25, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Transformation</h3>
              <p className="text-gray-700">Facilitating spiritual evolution through sacred practices</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative py-20 px-4 bg-gradient-to-r from-orange-600 to-red-700 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Begin Your Sacred Journey</h2>
          <p className="text-amber-100 mb-8 text-xl">Experience the divine blessings of authentic Vedic traditions</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="bg-white text-orange-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Pooja
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consult a Pandit
            </motion.button>
          </div>
        </div>
        <motion.div 
          className="absolute right-10 bottom-10 opacity-20 hidden md:block"
          animate={animations.rotate}
        >
          <img src={omSymbol} alt="Om Symbol" className="w-32 h-32" />
        </motion.div>
      </motion.section>
    </div>
  )
}

export default AboutUs