import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/NewAppFiles%2FpujaVectors%2FGreihPravesh.png?alt=media&token=461b9b31-c406-41bc-a66e-1707743ad493", 
      title: "Chat with a Pandit for Free",
      description: "Get expert guidance from experienced pandits for free. Discuss your concerns and receive personalized solutions for your spiritual needs.",
      icon: "💬"
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fsaraswati_maa.png?alt=media&token=3f0608ca-6ef4-4b71-a5a1-93277a56e72c", 
      title: "Book Pandit for Your Puja",
      description: "Easily book certified pandits for any puja or ritual. Ensure your ceremonies are conducted with precision and devotion.",
      icon: "📅"
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/appfiles%2Fpuja2.png?alt=media&token=86a025b0-f401-4271-bed8-477505e2fea9", 
      title: "Purchase Puja Essentials",
      description: "Find all the necessary puja items in one place. From incense sticks to sacred idols, we have everything you need for a perfect puja.",
      icon: "🛍️"
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fbhumi-pujan.png?alt=media&token=d55f705a-e0e3-4d07-8711-880f4f7d4685", 
      title: "Easy to Use Platform",
      description: "Our platform is designed for simplicity and convenience. Book services, shop for essentials, and connect with pandits effortlessly.",
      icon: "👍"
    },
  ];

  const howWeWorkSteps = [
    {
      step: "1",
      title: "Select Service",
      description: "Choose from our wide range of puja services or consultation options",
      icon: "📋"
    },
    {
      step: "2",
      title: "Provide Details",
      description: "Share your requirements, date, time and other necessary details",
      icon: "✍️"
    },
    {
      step: "3",
      title: "Confirm Booking",
      description: "Review and confirm your booking with secure payment options",
      icon: "✅"
    },
    {
      step: "4",
      title: "Experience Service",
      description: "Our pandit will arrive on time and perform the puja as per traditions",
      icon: "🕉️"
    }
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
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8" id="why-choose-us">
      <div className="max-w-7xl mx-auto">
        {/* Why Choose Us Section */}
        <motion.div 
          className="text-center mb-12" 
          initial="hidden" 
          animate="visible" 
          variants={titleVariants}
        >
          <div className="inline-block mb-4">
            <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
            <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose PanditJi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide authentic, convenient and personalized puja services to help you 
            maintain your spiritual practices with ease and devotion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <img
                  alt={feature.title}
                  loading="lazy"
                  width="120"
                  height="120"
                  decoding="async"
                  className="object-contain h-24 mb-4"
                  src={feature.image}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How We Work Section */}
        <div className="mt-16">
          <motion.div 
            className="text-center mb-12" 
            initial="hidden" 
            animate="visible" 
            variants={titleVariants}
          >
            <div className="inline-block mb-4">
              <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
              <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process ensures you get the best puja experience
            </p>
          </motion.div>

          {/* Horizontal Steps for All Devices */}
          <div className="relative">
            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide">
              {howWeWorkSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="flex-shrink-0 w-64 md:w-auto md:flex-1 px-2"
                  >
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mr-4">
                          {step.step}
                        </div>
                        <div className="text-3xl">{step.icon}</div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                    </div>
                  </motion.div>

                  {/* Arrow between steps (except last one) */}
                  {index < howWeWorkSteps.length - 1 && (
                    <div className="flex-shrink-0 flex items-center justify-center px-2 md:px-0">
                      <ChevronRight className="w-8 h-8 text-orange-400 hidden md:block" />
                      <ChevronRight className="w-6 h-6 text-orange-400 md:hidden transform rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile indicator (only shows on mobile) */}
          <div className="md:hidden text-center mt-4 text-sm text-gray-500">
            ← Scroll to see all steps →
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;