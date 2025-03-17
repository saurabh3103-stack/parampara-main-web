import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Check } from "lucide-react";
import React from "react";

export default function HeroSlider() {
  const APIURL = "http://34.131.10.8:3000/api/slider/get-slider";
  const IMGURL = "http://34.131.10.8:3000";
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.post(
          APIURL,
          { category: "Home" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8",
            },
          }
        );

        if (response.data && response.data.data) {
          setSlides(response.data.data);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error fetching slides: {error}</div>;

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <Swiper autoplay={{ delay: 5000, disableOnInteraction: false }} spaceBetween={50} slidesPerView={1} loop>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image ? `${IMGURL}${slide.image}` : "/placeholder.svg"}
                alt={slide.title || "Slide Image"}
                className="object-cover w-full h-full"
                loading="lazy"
              />
              <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl">
                  <h1 className="text-2xl md:text-4xl font-bold text-white italic mb-6">{slide.title}</h1>
                  <div className="space-y-2 md:space-y-3 mb-8">
                    {Array.isArray(slide.features) &&
                      slide.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="mt-1 mr-2 bg-[#FF6B00] rounded-full p-1 flex items-center justify-center">
                            <Check size={16} className="text-white" />
                          </div>
                          <p className="text-white text-sm md:text-base">{feature}</p>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-[#8B1914] hover:bg-[#761410] text-white px-4 py-2 rounded">Book Iyer Now</button>
                    <button className="bg-white text-[#8B1914] hover:bg-gray-100 px-4 py-2 rounded">View Services</button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}