import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronDown, User, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "../Pages/Login/LoginModal";
import { getAllPooja } from "../Pages/PoojaBooking/PoojaService";
import { fetchBhajanMandal } from "../Pages/BhajanMandal/BhajanService";

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

// MobileMenu Component
const MobileMenu = ({ isLoggedIn, onLogin, onLogout, poojaName, bhajanName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    navigate("/sign-in");
    toast.success("Logged out successfully!");
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
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/horoscope"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Horoscope
            </Link>
            
            {/* Pooja Services Dropdown */}
            <div className="relative">
              <Link
                to="/pooja"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('mobile-pooja-dropdown').classList.toggle('hidden');
                }}
              >
                Pooja Services
                <ChevronDown size={16} />
              </Link>
              <div id="mobile-pooja-dropdown" className="hidden pl-4">
                {poojaName.map((pooja, index) => (
                  <Link 
                    to={"pooja/pooja-details/" + pooja?.slug_url || "#"} 
                    key={index} 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {pooja?.pooja_name || "Unknown Pooja"}
                  </Link>
                ))}
                <Link 
                  to="/satyanarayana-puja" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Satyanarayana Puja
                </Link>
                <Link 
                  to="/ganapathi-puja" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Ganapathi Puja
                </Link>
                <Link 
                  to="/navagraha-puja" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Navagraha Puja
                </Link>
              </div>
            </div>

            {/* Bhajan Mandali Dropdown */}
            <div className="relative">
              <Link
                to="/bhajan-mandal"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('mobile-bhajan-dropdown').classList.toggle('hidden');
                }}
              >
                Bhajan Mandali
                <ChevronDown size={16} />
              </Link>
              <div id="mobile-bhajan-dropdown" className="hidden pl-4">
                {bhajanName.map((bhajan, index) => (
                  <Link 
                    to={"/bhajan-mandal/" + bhajan?.slug_url || "#"} 
                    key={index} 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {bhajan?.bhajan_name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/e-store"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              E-Store
            </Link>

            {/* Service Dropdown */}
            <div className="relative">
              <Link
                to="/service"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('mobile-service-dropdown').classList.toggle('hidden');
                }}
              >
                Service
                <ChevronDown size={16} />
              </Link>
              <div id="mobile-service-dropdown" className="hidden pl-4">
                <Link 
                  to="/pooja" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Pooja Booking
                </Link>
                <Link 
                  to="/bhajan-mandal" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Bhajan Mandal
                </Link>
                <Link 
                  to="/brahman-bhoj" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Brahman Bhoj
                </Link>
                <Link 
                  to="#" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Daily Pandit
                </Link>
                <Link 
                  to="/bhavya-ayojan" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Bhavya Ayojan
                </Link>
                <Link 
                  to="#" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Darshan Booking
                </Link>
              </div>
            </div>

            <Link
              to="/contact-us"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <LoginModal
                  trigger={
                    <button 
                      className="block w-full px-4 py-2 text-left text-orange-600 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </button>
                  }
                  onSuccess={() => {
                    onLogin();
                    setIsOpen(false);
                    toast.success("Logged in successfully!");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NavMenu Component
const NavMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [poojaName, setPoojaName] = useState([]);
  const [bhajanName, setBhajanName] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check login status from localStorage when the component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch Pooja Names
  useEffect(() => {
    async function allPooja() {
      try {
        const data = await getAllPooja();
        setPoojaName(data?.data || []);
      } catch (err) {
        console.error("Error fetching pooja names:", err);
        setError(err instanceof Error ? err.message : "Failed to load puja names");
      }
    }

    async function fetchBhajanData() {
      try {
        const data = await fetchBhajanMandal();
        setBhajanName(data?.data || []);
      } catch (err) {
        console.error("Error fetching Bhajan Mandal data:", err);
        setError(err instanceof Error ? err.message : "Failed to load Bhajan Mandal data");
      }
    }

    allPooja();
    fetchBhajanData();
  }, []);

  // Handle login
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/sign-in");
    toast.success("Logged out successfully!");
  };

  return (
    <>
      {/* Desktop Menu - Show only on large screens (lg and up) */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF9248] text-white hidden lg:block">
        <div className="container mx-auto">
          <nav className="flex justify-between items-center font-semibold">
            <div className="flex">
              <NavItem href="/" icon={<Home size={16} />} text="Home" />
              <NavItem href="/about-us" text="About Us" />
              <NavItem href="/horoscope" text="Horoscope" />
              <NavItem href="/pooja" text="Pooja Services" hasDropdown>
                {poojaName.map((pooja, index) => (
                  <Link to={"pooja/pooja-details/" + pooja?.slug_url || "#"} key={index} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {pooja?.pooja_name || "Unknown Pooja"}
                  </Link>
                ))}
                <Link to="/satyanarayana-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Satyanarayana Puja</Link>
                <Link to="/ganapathi-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ganapathi Puja</Link>
                <Link to="/navagraha-puja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Navagraha Puja</Link>
              </NavItem>
              <NavItem href="/bhajan-mandal" text="Bhajan Mandali" hasDropdown>
                {bhajanName.map((bhajan, index) => (
                  <Link to={"/bhajan-mandal/" + bhajan?.slug_url || "#"} key={index} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {bhajan?.bhajan_name}
                  </Link>
                ))}
              </NavItem>
              <NavItem href="/e-store" text="E-Store" />
              <NavItem href="/service" text="Service" hasDropdown>
                <Link to="/pooja" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pooja Booking</Link>
                <Link to="/bhajan-mandal" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bhajan Mandal</Link>
                <Link to="/brahman-bhoj" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Brahman Bhoj</Link>
                <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Daily Pandit</Link>
                <Link to="/bhavya-ayojan" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bhavya Ayojan</Link>
                <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Darshan Booking</Link>
              </NavItem>
              <NavItem href="/virtual-service" text="Virtual Services" />
              <NavItem href="/contact-us" text="Contact Us" />
            </div>

            {/* Login/Dashboard Button */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user/dashboard"
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

      {/* Mobile/Tablet Header - Show on medium (md) and small screens */}
      <div className="bg-[#FF6B00] lg:hidden">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Book Pooja Button on Left */}
          <Link 
            to="/pooja" 
            className="bg-white text-[#FF6B00] px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <span className="mr-1">★</span> Book Pooja
          </Link>
          
          {/* Menu Toggle Button on Right */}
          <div className="flex items-center">
            <MobileMenu
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
              poojaName={poojaName}
              bhajanName={bhajanName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMenu;