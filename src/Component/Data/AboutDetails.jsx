import React, { useState, useEffect } from "react";
import { Phone, Check, Star } from "lucide-react";

export default function AboutDetails() {
  const cities = ["Kanpur", "Noida", "Delhi", "Mumbai", "Pune"];
  const [currentCity, setCurrentCity] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const city = cities[index];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => setCharIndex((prev) => prev - 1), 100);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % cities.length);
      }
    } else {
      if (charIndex < city.length) {
        setTimeout(() => setCharIndex((prev) => prev + 1), 150);
      } else {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }

    setCurrentCity(city.substring(0, charIndex));
  }, [charIndex, isDeleting, index, cities]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div className="container mx-auto px-4">
          {/* Header with logo */}
        <header className="mb-8">
          <div className="text-orange-500 font-bold text-3xl flex items-center">
            <span className="bg-orange-500 text-white p-2 rounded-lg mr-2">
              <Phone size={24} />
            </span>
            PanditJi
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* Left side content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-gray-800">Connecting You With</span>{" "}
              <span className="text-orange-500">Trusted Pandits</span>{" "}
              <br />
              {/* <span className="text-gray-800">
                Across <span className="text-orange-500">{currentCity}</span>
              </span> */}
            </h1>

            <div className="text-gray-600 space-y-4">
              <p className="text-lg">
                PanditJi is your premier online platform for booking qualified and experienced 
                pandits for all your religious ceremonies and pujas. We bridge the gap between 
                traditional religious services and modern convenience.
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Verified and experienced pandits for all types of pujas</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Transparent pricing with no hidden charges</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Available in multiple languages and traditions</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Easy online booking and scheduling</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 flex items-center justify-center hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all">
                <Phone className="mr-2 h-5 w-5" /> Book a Pandit Now
              </button>
              <button className="border-2 border-orange-500 flex items-center justify-center hover:bg-orange-50 text-orange-500 px-6 py-3 rounded-lg text-lg font-medium transition-all">
                Learn More
              </button>
            </div>

            {/* Testimonials */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                ))}
                <span className="ml-2 text-gray-700 font-medium">4.9/5 (1200+ reviews)</span>
              </div>
              <p className="text-gray-600 italic">
                "PanditJi made finding the perfect pandit for our housewarming so easy. 
                The service was professional and the puja was conducted beautifully."
              </p>
              <p className="text-gray-800 font-medium mt-2">- Rajesh K., Mumbai</p>
            </div>
          </div>

          {/* Right side img */}
          <div className="hidden lg:block relative">
            <img
              src="https://pujapurohit.in/assets/gif/pandit3.webp"
              alt="Pandit performing pooja ceremony"
              className="w-full h-auto object-contain rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500">1600+</div>
              <div className="text-gray-600">Verified Pandits</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-md">
              <div className="text-3xl font-bold">11</div>
              <div>Cities Served</div>
            </div>
          </div>
        </div>

        {/* Stats section - for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:hidden">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-800">1600+</div>
            <div className="text-gray-600 text-sm">Verified Pandits</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-800">150+</div>
            <div className="text-gray-600 text-sm">Puja Types</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-800">11</div>
            <div className="text-gray-600 text-sm">Cities</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-800">3100+</div>
            <div className="text-gray-600 text-sm">Pujas Served</div>
          </div>
        </div>
      </div>
    </div>
  );
}