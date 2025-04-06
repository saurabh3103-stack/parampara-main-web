import React from 'react';
import NabMenu from './NavMenu';
import {Link} from 'react-router-dom';
import "./globals.css";
import { PhoneCall, Mail, MessageCircle, ShoppingCart, User, Heart } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#8B1914] text-white px-8">
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
      <div className="bg-white lg:px-24 md:px-8 sm:px-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4">
          <div className="mb-4 md:mb-0">
            <img
              src="/image/logo/logo6.png"
              alt="Dial4Iyer Logo"
              width={300}
              height={80}
              className="w-auto object-contain"
              style={{ height: '100px' }}
            />
          </div>
          
          {/* This section will be hidden on mobile (small screens) */}
          <div className="hidden md:flex flex-col items-center md:w-3/5 md:flex-row justify-end">
            {/* Contact details - hidden on md, visible on lg */}
            <div className="items-center text-[#8B1914] font-bold mb-3 md:mb-0 hidden lg:block mr-5">
              <p className="text-[#8B1914] font-semibold mb-2 text-center md:text-right text-lg">FOR MORE DETAILS CONTACT US</p>
              <div className='flex items-center text-lg'>
                <PhoneCall size={20} className="mr-2" />
                <span>+91 9963103335</span>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* Book Pooja Button - always visible on md and larger */}
              <Link to={'/pooja'} className="bg-[#FF6B00] hover:bg-[#e05f00] text-white px-4 py-2 rounded-lg lg:text-lg md:text-lg sm:text-base transition-transform transform hover:scale-105">
                <span className="mr-1">★</span> Book Pooja
              </Link>
              
              {/* Register Partner Button - hidden on md, visible on lg */}
              <Link to={'/partner-register'} className="hidden lg:block bg-[#8B1914] hover:bg-[#761410] text-white px-4 py-2 rounded-lg lg:text-lg md:text-lg sm:text-base transition-transform transform hover:scale-105">
                <span className="mr-1">★</span> Register Partner
              </Link>

              {/* Profile Button */}
              <Link to={'user/dashboard'} className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <User size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </Link>
              
              {/* Wishlist Button */}
              <button className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
                <Heart size={20} className="text-[#8B1914] group-hover:text-[#761410] transition-colors duration-300" />
              </button>
              
              {/* Cart Button */}
              <Link to={'/cart'} className="relative rounded-lg flex items-center transition-transform transform hover:scale-110 group">
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
      <nav>
        <NabMenu />
      </nav>
    </>
  );
};

export default Navbar;