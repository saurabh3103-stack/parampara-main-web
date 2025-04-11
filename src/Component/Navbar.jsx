import React from 'react';
import NabMenu from './NavMenu';
import { Link } from 'react-router-dom';
import "./globals.css";
import { PhoneCall, Mail, MessageCircle, ShoppingCart, User, Heart } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#8B1914] text-white">
        <div className="container mx-auto py-2 px-4 hidden lg:flex justify-between items-center">
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
      <div className="bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center py-4 px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="mb-4 lg:mb-0">
            <Link to="/">
              <img
                src="/image/logo/logo6.png"
                alt="Dial4Iyer Logo"
                width={300}
                height={80}
                className="w-auto h-16 md:h-20 lg:h-24 object-contain"
              />
            </Link>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-6 xl:space-x-8">
            {/* Contact details - hidden on mobile */}
            <div className="hidden lg:flex flex-col items-center lg:items-end text-[#8B1914] mb-3 lg:mb-0">
            <img src='/image/Google-Play.png'  className='img-fluid'/> 

              {/* <p className="font-semibold mb-1 text-sm xl:text-base">FOR MORE DETAILS CONTACT US</p>
              <div className='flex items-center text-sm xl:text-base'>
                <PhoneCall size={18} className="mr-2" />
                <span>+91 9963103335</span>
              </div> */}
            </div>
            
            {/* Buttons and icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5">
              {/* Book Pooja Button */}
              <Link 
                to={'/pooja'} 
                className="bg-[#FF6B00] hover:bg-[#e05f00] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-transform transform hover:scale-105"
              >
                <span className="mr-1">★</span> Book Pooja
              </Link>
              
              {/* Register Partner Button - hidden on smaller screens */}
              <Link 
                to={'/partner-register'} 
                className="hidden xl:block bg-[#8B1914] hover:bg-[#761410] text-white px-4 py-2 rounded-lg text-base transition-transform transform hover:scale-105"
              >
                <span className="mr-1">★</span> Register Partner
              </Link>

              {/* Profile Button */}
              <Link 
                to={'user/dashboard'} 
                className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group"
              >
                <User size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </Link>
              
              {/* Wishlist Button */}
              <button className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <Heart size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </button>
              
              {/* Cart Button */}
              <Link 
                to={'/cart'} 
                className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group"
              >
                <ShoppingCart size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full px-1.5 py-0.5 group-hover:bg-[#e05f00] transition-colors duration-300">
                  5
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="border-t border-b border-gray-200">
        <NabMenu />
      </nav>
    </>
  );
};

export default Navbar;