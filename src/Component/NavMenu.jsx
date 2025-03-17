import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronDown, ChevronRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

function NavItem({ href, text, icon, badge, hasDropdown, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <Link 
        to={href} 
        className="px-4 py-3 flex items-center space-x-2 hover:bg-orange-600"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {icon && <span>{icon}</span>}
        <span>{text}</span>
        {badge && <span className="ml-2 bg-green-500 text-white text-xs px-1 rounded">{badge}</span>}
        {hasDropdown && <ChevronDown size={16} />}
      </Link>
      {hasDropdown && isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
}

export default function NabMenu() {
  return (
    <>
      {/* Desktop Menu */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF9248] text-white hidden md:block">
        <div className="container mx-auto">
          <nav className="flex justify-center items-center font-semibold">
            <NavItem href="/" icon={<Home size={16} />} text="Home" />
            <NavItem href="/who-we-are" text="Who We Are?" />
            <NavItem href="/e-puja" text="E-Puja" badge="NEW" />
            <NavItem href="/pooja-services" text="Pooja Services" hasDropdown>
              <Link to="/satyanarayana-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Satyanarayana Puja</Link>
              <Link to="/ganapathi-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ganapathi Puja</Link>
              <Link to="/navagraha-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Navagraha Puja</Link>
            </NavItem>
            <NavItem href="/homam-services" text="Homam Services" hasDropdown>
              <Link to="/ganapathi-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ganapathi Homam</Link>
              <Link to="/ayushya-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ayushya Homam</Link>
              <Link to="/sudarshana-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sudarshana Homam</Link>
            </NavItem>
            <NavItem href="/ceremonies" text="Ceremonies" hasDropdown>
              <Link to="/marriage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Marriage</Link>
              <Link to="/naming-ceremony" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Naming Ceremony</Link>
              <Link to="/grihapravesham" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Grihapravesham</Link>
            </NavItem>
            <NavItem href="/astrology" text="Astrology" />
            <NavItem href="/priest-services" text="Priest Services" />
            <NavItem href="/contact-us" text="Contact Us" />
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="bg-[#FF6B00] md:hidden">
        <MobileMenu />
      </div>
    </>
  );
}