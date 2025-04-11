import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-cards"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const VirtualService = () => {
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
  ]

  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

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
    <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-5" id="zodiac_Sign">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
          <div className="inline-block mb-3">
            <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
            <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Virtual Services</h2>
          <h4 className="text-xl font-medium text-orange-600">Ask Pandit Ji</h4>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Connect with our experienced pandits for all your spiritual needs and pooja bookings
          </p>
        </motion.div>

        {/* Desktop and Tablet View (3 columns) */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100"
            >
              <div className="relative overflow-hidden group h-48 bg-orange-50 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="h-32 w-32 object-contain z-10 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="px-8 py-3 text-white bg-orange-500 rounded-full font-medium shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1">
                  BOOK NOW
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View with Enhanced Swiper */}
        <div className="md:hidden mt-8">
          <Swiper
            effect="cards"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, EffectCards]}
            className="service-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="py-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
                  <div className="relative overflow-hidden h-48 bg-orange-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-orange-500 opacity-10"></div>
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="h-32 w-32 object-contain z-10"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <button className="px-8 py-3 text-white bg-orange-500 rounded-full font-medium shadow-md hover:bg-orange-600 transition-all duration-300">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default VirtualService

