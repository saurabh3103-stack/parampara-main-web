import { motion } from "framer-motion"

const Service = () => {
  const services = [
    {
      image: "https://deificindia.com/namonamah/assets/image/service/pandit.png",
      title: "Pooja Booking",
      featured: true,
    },
    {
      image: "https://deificindia.com/namonamah/assets/image/service/shoping.jpeg",
      title: "E-Store",
    },
    {
      image: "https://deificindia.com/namonamah/assets/image/service/brahman.png",
      title: "Brahman Bhoj",
    },
    {
      image: "https://deificindia.com/namonamah/assets/image/service/bhajan3.png",
      title: "Bhajan Mandal",
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
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse", // <-- Remove "as const"
      ease: "easeInOut",
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
  }

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white px-5 py-16" id="zodiac_Sign">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
                <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
                <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Choose Our Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Explore our wide range of spiritual services designed to meet all your devotional needs
            </p>
            </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
              {/* Card with hover effects */}
              <motion.div
                className={`bg-white rounded-2xl p-3 sm:p-4 border-2 ${
                  service.featured ? "border-orange-500" : "border-orange-300"
                } w-2/3  aspect-square flex flex-col justify-center items-center relative overflow-hidden shadow-md`}
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
                        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-10 -right-10 w-20 h-20 bg-orange-100 rounded-full opacity-50"
                      animate={{
                        scale: [1, 1.2, 1],
                        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 },
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
                    src={service.image || "/placeholder.svg"}
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Service