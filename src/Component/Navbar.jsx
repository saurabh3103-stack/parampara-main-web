import React from 'react';
import NabMenu from './NavMenu';
import "./globals.css";
import { PhoneCall, Mail, MessageCircle, ShoppingCart, User, Heart } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#8B1914] text-white px-8 ">
        <div className="container text-white mx-auto py-2 px-4 hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="mr-2">Book Pooja</span>
            </div>
            <div className="flex items-center">
              <PhoneCall size={16} className="mr-1" />
              <span>Call Us: +91 9999999999</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              <span>Whatsapp: +91 9999999999</span>
            </div>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-1" />
            <span>Email ID: info@parampara.com</span>
          </div>
        </div>
      </div>

      {/* Logo and Contact Section */}
      <div className="bg-white lg:px-24 md:px-24 sm:px-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src="/image/logo/logo1.png"
              alt="Dial4Iyer Logo"
              width={300}
              height={80}
              className="w-auto object-contain"
              style={{ height: '100px' }}
            />
          </div>
          <div className="flex flex-col items-center md:w-3/5 md:flex-row justify-between items-center">
            <div className="items-center text-[#8B1914] font-bold mb-3">
              <p className="text-[#8B1914] font-semibold mb-2 text-center md:text-right text-lg">FOR MORE DETAILS CONTACT US</p>
              <div className='flex items-center text-lg'>
                <PhoneCall size={20} className="mr-2" />
                <span>+91 9963103335</span>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* Book Pooja Button */}
              <button className="bg-[#FF6B00] hover:bg-[#e05f00] text-white px-4 py-2 rounded-lg lg:text-lg md:text-lg sm:text-base transition-transform transform hover:scale-105">
                <span className="mr-1">★</span> Book Pooja
              </button>
              {/* Book Mandali Button */}
              <button className="bg-[#8B1914] hover:bg-[#761410] text-white px-4 py-2 rounded-lg lg:text-lg md:text-lg sm:text-base transition-transform transform hover:scale-105">
                <span className="mr-1">★</span> Book Mandali
              </button>
              {/* Profile Button with Enhanced Animation */}
              <button className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <User size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </button>
              {/* Wishlist Button with Enhanced Animation */}
              <button className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <Heart size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </button>
              {/* Cart Button with Enhanced Animation */}
              <button className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <ShoppingCart size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full px-1.5 py-0.5 group-hover:bg-[#e05f00] transition-colors duration-300">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <NabMenu />
      </nav>
    </>
  );
};

export default Navbar;