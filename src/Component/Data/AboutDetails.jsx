import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export default function AboutDetails() {
  const cities = ["Kanpur.", "Noida.", "Delhi.", "Mumbai.", "Pune."];
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with logo */}
      <header>
        <div className="text-orange-500 font-bold text-2xl">PanditJi</div>
      </header>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left side content */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-slate-700">Book Pandit</span>{" "}
            <span className="text-orange-500">For Pooja</span>{" "}
            <br />
            <span className="text-slate-700">
              In <span className="text-orange-500">{currentCity}</span>
            </span>
          </h1>

          <div className="text-slate-600 space-y-4">
            <p>
              Our experienced <span className="font-semibold">Hindi Pandits</span> and{" "}
              <span className="font-semibold">North Indian Pandits</span> in Bangalore
              specialize in various pujas, including Griha Pravesh,
              Satyanarayan Puja, marriage ceremonies, and more. We also have{" "}
              <span className="font-semibold">
                Bengali, Marathi, Odia, Kannada, Tamil, and Telugu Pandits
              </span>{" "}
              who perform pujas according to regional rituals. You are only one click
              away from making a booking. Feel free to enjoy our Pandit booking service.
            </p>
          </div>

          <button className="bg-orange-500 flex hover:bg-orange-600 text-white px-3 py-1 rounded-md text-lg w-full sm:w-auto">
            <Phone className="mr-2 h-5 w-5 mt-1" /> Book now
          </button>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-700 text-white p-1 rounded-md flex flex-col items-center justify-center text-center">
              <div className="mb-2">
                <img 
                  src="https://pujapurohit.in/assets/images/home-icon/2.webp" 
                  alt="Pandit icon" 
                  width={40} 
                  height={40} 
                  className="mx-auto"
                />
              </div>
              <div className="text-xl sm:text-2xl font-bold">1600+</div>
              <div className="text-xs sm:text-sm">PANDIT</div>
            </div>

            <div className="bg-slate-700 text-white p-1 rounded-md flex flex-col items-center justify-center text-center border-2 border-orange-500">
              <div className="mb-2">
                <img 
                  src="https://pujapurohit.in/assets/images/home-icon/1.webp" 
                  alt="Puja type icon" 
                  width={40} 
                  height={40} 
                  className="mx-auto"
                />
              </div>
              <div className="text-xl sm:text-2xl font-bold">150+</div>
              <div className="text-xs sm:text-sm">PUJA TYPE</div>
            </div>

            <div className="bg-slate-700 text-white p-1 rounded-md flex flex-col items-center justify-center text-center">
              <div className="mb-2">
                <img 
                  src="https://pujapurohit.in/assets/images/home-icon/3.webp" 
                  alt="City icon" 
                  width={40} 
                  height={40} 
                  className="mx-auto"
                />
              </div>
              <div className="text-xl sm:text-2xl font-bold">11</div>
              <div className="text-xs sm:text-sm">CITY</div>
            </div>

            <div className="bg-slate-700 text-white p-1 rounded-md flex flex-col items-center justify-center text-center">
              <div className="mb-2">
                <img 
                  src="https://pujapurohit.in/assets/images/home-icon/4.webp" 
                  alt="Puja served icon" 
                  width={40} 
                  height={40} 
                  className="mx-auto"
                />
              </div>
              <div className="text-xl sm:text-2xl font-bold">3100+</div>
              <div className="text-xs sm:text-sm">PUJA SERVED</div>
            </div>
          </div>
        </div>

        {/* Right side img - hidden on mobile, visible on larger screens */}
        <div className="hidden md:block">
          <img
            src="https://pujapurohit.in/assets/gif/pandit3.webp"
            alt="Pandit performing pooja ceremony"
            width={600}
            height={600}
            className="ml-auto w-3/4 h-auto object-contain float-end"
          />
        </div>
      </div>
    </div>
  );
}
