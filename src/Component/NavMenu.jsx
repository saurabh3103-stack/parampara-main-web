import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronDown, User, Menu, X } from "lucide-react";
import LoginModal from "../Pages/Login/LoginModal";

// MobileMenu Component
const MobileMenu = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-white focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              About Us
            </Link>
            <Link
              to="/horoscope"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Horoscope
            </Link>
            <Link
              to="/pooja"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Pooja Services
            </Link>
            <Link
              to="/bhajan-mandal"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Bhajan Mandali
            </Link>
            <Link
              to="/e-store"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              E-Store
            </Link>
            <Link
              to="/service"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Service
            </Link>
            <Link
              to="/contact-us"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Contact Us
            </Link>

            {/* Login/Dashboard Button */}
            <div className="pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-orange-600 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <LoginModal
                  trigger={
                    <button className="block w-full px-4 py-2 text-left text-orange-600 hover:bg-gray-100">
                      Login
                    </button>
                  }
                  onSuccess={onLogin}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NavItem Component
const NavItem = ({ href, text, icon, badge, hasDropdown, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative group">
      {!hasDropdown ? (
        <Link
          to={href}
          className="px-4 py-3 flex items-center space-x-2 hover:bg-orange-600 focus:outline-none"
        >
          {icon && <span>{icon}</span>}
          <span>{text}</span>
          {badge && <span className="ml-2 bg-green-500 text-white text-xs px-1 rounded">{badge}</span>}
        </Link>
      ) : (
        <Link
          to={href}
          className="px-4 py-3 flex items-center space-x-2 hover:bg-orange-600 focus:outline-none cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={toggleDropdown}
        >
          {icon && <span>{icon}</span>}
          <span>{text}</span>
          {badge && <span className="ml-2 bg-green-500 text-white text-xs px-1 rounded">{badge}</span>}
          <ChevronDown size={16} className={isOpen ? "rotate-180" : ""} />
        </Link>
      )}

      {hasDropdown && isOpen && (
        <div
          className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-lg z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// NavMenu Component
const NavMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage when the component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF9248] text-white hidden md:block">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center font-semibold">
            <div className="flex">
              <NavItem href="/" icon={<Home size={16} />} text="Home" />
              <NavItem href="/about-us" text="About Us" />
              <NavItem href="/horoscope" text="Horoscope" />
              <NavItem href="/pooja" text="Pooja Services" hasDropdown>
                <Link to="/satyanarayana-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Satyanarayana Puja</Link>
                <Link to="/ganapathi-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ganapathi Puja</Link>
                <Link to="/navagraha-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Navagraha Puja</Link>
              </NavItem>
              <NavItem href="/bhajan-mandal" text="Bhajan Mandali" hasDropdown>
                <Link to="/ganapathi-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ganapathi Homam</Link>
                <Link to="/ayushya-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ayushya Homam</Link>
                <Link to="/sudarshana-homam" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sudarshana Homam</Link>
              </NavItem>
              <NavItem href="/e-store" text="E-Store" />
              <NavItem href="/service" text="Service" hasDropdown>
                <Link to="/pooja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pooja Booking</Link>
                <Link to="/bhajan-mandal" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bhajan Mandal</Link>
                <Link to="/brahman-bhoj" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Brahman Bhoj</Link>
                <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Daily Pandit</Link>
                <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bhavya Ayojan</Link>
                <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Darshan Booking</Link>
              </NavItem>
              <NavItem href="/contact-us" text="Virtual Services" />
              <NavItem href="/contact-us" text="Contact Us" />
            </div>

            {/* Login/Dashboard Button */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 flex items-center space-x-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100"
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <LoginModal onSuccess={handleLogin} />
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="bg-[#FF6B00] md:hidden">
        <MobileMenu
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
};

export default NavMenu;