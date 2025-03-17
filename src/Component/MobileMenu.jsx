import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4">
        <span className="text-white font-medium">Menu</span>
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <div className="py-2">
            <a href="/" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-100">Home</a>
            <a href="/who-we-are" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-100">Who We Are?</a>
            <a href="/e-puja" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-100 flex items-center">
              E-Puja <span className="ml-2 bg-green-500 text-white text-xs px-1 rounded">NEW</span>
            </a>

            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100" onClick={() => toggleSubmenu("pooja")}>
                <span>Pooja Services</span>
                {openSubmenu === "pooja" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              {openSubmenu === "pooja" && (
                <div className="bg-gray-50 pl-8 pr-4 py-2">
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Satyanarayana Puja</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Ganapathi Puja</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Navagraha Puja</a>
                </div>
              )}
            </div>

            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100" onClick={() => toggleSubmenu("homam")}>
                <span>Homam Services</span>
                {openSubmenu === "homam" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              {openSubmenu === "homam" && (
                <div className="bg-gray-50 pl-8 pr-4 py-2">
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Ganapathi Homam</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Ayushya Homam</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Sudarshana Homam</a>
                </div>
              )}
            </div>

            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100" onClick={() => toggleSubmenu("ceremonies")}>
                <span>Ceremonies</span>
                {openSubmenu === "ceremonies" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              {openSubmenu === "ceremonies" && (
                <div className="bg-gray-50 pl-8 pr-4 py-2">
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Marriage</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Naming Ceremony</a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Grihapravesham</a>
                </div>
              )}
            </div>

            <a href="/contact-us" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">Contact Us</a>
          </div>
        </div>
      )}
    </div>
  );
}