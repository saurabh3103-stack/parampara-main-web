import React from "react";
import { motion } from "framer-motion";
const WhyChooseUs = () => {
  const poojas = [
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/NewAppFiles%2FpujaVectors%2FGreihPravesh.png?alt=media&token=461b9b31-c406-41bc-a66e-1707743ad493", 
      title: "Chat with a Pandit for Free",
      description: "Get expert guidance from experienced pandits for free. Discuss your concerns and receive personalized solutions for your spiritual needs."
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fsaraswati_maa.png?alt=media&token=3f0608ca-6ef4-4b71-a5a1-93277a56e72c", 
      title: "Book Pandit for Your Puja",
      description: "Easily book certified pandits for any puja or ritual. Ensure your ceremonies are conducted with precision and devotion."
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/swastik13prod.appspot.com/o/appfiles%2Fpuja2.png?alt=media&token=86a025b0-f401-4271-bed8-477505e2fea9", 
      title: "Purchase Puja Essentials",
      description: "Find all the necessary puja items in one place. From incense sticks to sacred idols, we have everything you need for a perfect puja."
    },
    { 
      image: "https://firebasestorage.googleapis.com/v0/b/mongodb-asset/o/puja-vectors%2Fbhumi-pujan.png?alt=media&token=d55f705a-e0e3-4d07-8711-880f4f7d4685", 
      title: "Easy to Use",
      description: "Our platform is designed for simplicity and convenience. Book services, shop for essentials, and connect with pandits effortlessly."
    },
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
    }}
  return (
    <section className="bg-white px-5 rashi_wrapper mt-2" id="zodiac_Sign" style={{backgroundColor:'#fff'}}>
      <div className="container mx-auto px-12">
        <div className="heading_wrapper" style={{ marginBottom: "40px" }}>
        <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={titleVariants}>
            <div className="inline-block mb-3">
                <span className="block h-1.5 w-12 bg-orange-500 rounded-full mb-1.5 mx-auto"></span>
                <span className="block h-1.5 w-24 bg-orange-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Why Choose Us
            </h2>
          
            </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {poojas.map((pooja, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-orange-200 p-4 rounded-2xl 
              transition-transform duration-300 ease-in-out transform hover:scale-100 hover:border-2 hover:border-orange-500"
            >
              {
                console.log(pooja.image)
              }
              <img
                alt={`Puja ${index + 1}`}
                loading="lazy"
                width="200"
                height="200"
                decoding="async"
                className="object-contain w-[40%] md:w-[30%]"
                src={pooja.image}
                style={{ color: "transparent" }}
              />
              <div className="flex flex-col items-center md:items-start text-center md:text-start mt-4 md:mt-0 md:ml-4">
                <h2 className="text-orange-600 font-bold text-xl md:text-2xl">
                  {pooja.title}
                </h2>
                <p className="text-sm text-gray-700 font-semibold mt-2">
                {pooja.description}
                </p>
                <div className="flex mt-3">
                  <div className="p-1 bg-orange-400 m-1 rounded-full"></div>
                  <div className="p-1 bg-orange-400 m-1 rounded-full"></div>
                  <div className="p-1 bg-orange-400 m-1 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;