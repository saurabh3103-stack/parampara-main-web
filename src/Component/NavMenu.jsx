import React ,{useState}from "react"
import { Link } from 'react-router-dom';
import Authentication from "./Authentication";


export default function NabMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
   <>     
          <div id="bottomBar" className="hidden w-full xl:block py-2">
            <div className="mx-auto flex max-w-7xl flex-row items-center justify-between text-sm xl:px-2">
              <div className="nk-left-nav whitespace-nowrap">
           
                <div className="nk-logo">
                  <a className="text-primary h-full" href="/" style={{position:"relative",top:"-58px"}}>
                    <img className="h-full object-contain mt-2" src="https://deificindia.com/namonamah/assets/image/logo/namonamah.png" alt="" style={{maxWidth:"120px",width:"120px",height:"120px"}}/>
                  </a>
                </div>
                <div data-dropdown="#listHomepages" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to="/">Home</Link>
                  </div>
                </div>
                <div data-dropdown="#shop-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='/about-us'>About Us</Link>
                  </div>
                </div>
                <div data-dropdown="#pages-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='horoscope'>Horoscope</Link>
                  </div>
                </div>

                <div data-dropdown="#list-nav-headers" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='e-store'>E-Store</Link>
                  </div>
                
                </div>
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='service'>Service</Link>
                    <span style={{paddingLeft:"7px"}}><i class="fas fa-chevron-down"></i></span>
                  </div>
                  <div id="pages-dropdown" className="nk-dropdown_menu nk-dropdown-menu-animated my-2 w-[200px]">
                    <span className="nk-top-dropdown-triangle -left-[187px]"></span>
                    <div className="nk-dropdown-content" >
                      <Link className="nk-dropdown-nav-link" to="/pooja">Pooja Booking</Link>
                      <Link className="nk-dropdown-nav-link" to="/brahman-bhoj">Brahman Bhoj</Link>
                      <Link className="nk-dropdown-nav-link" to="/bhajan-mandal">Bhajan Mandal</Link>
                      <Link className="nk-dropdown-nav-link" to="javascript:void(0)">Temple Donation</Link>
                      <Link className="nk-dropdown-nav-link" to="javascript:void(0)">Daily Pandit</Link>
                      <Link className="nk-dropdown-nav-link" to="javascript:void(0)">Puja at Temple</Link>
                      <Link className="nk-dropdown-nav-link" to="javascript:void(0)">Darshan Booking</Link>
                    </div>
                  </div>
                </div>  
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='/'>Virtual Services</Link>
                  </div>
                </div>
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <Link to='/contact-us'>Contact Us</Link>
                  </div>
                </div>
              </div>
              <div className="nk-right-nav">
              <div className="hidden flex-row items-center space-x-6 xl:flex">
                
                <div>
                <a href="#!"><i className="fa fa-magnifying-glass"></i></a>
                </div>
                <Authentication/>
                <div>
                <Link to="/wishlist"><i className="fa fa-heart"></i></Link>
                </div>
                <div>
                <Link to="/cart"><i className="fa fa-cart-shopping"></i></Link>
                </div>
            </div>
              </div>
            </div>
          </div>
          <div className="nk-border-separator"></div>
          <div className="nk-mobile-container">
      <div
        id="slide-mobile-menu"
        className="nk-mobile-menu"
        style={{
          transition: "0.5s",
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <ul className="space-y-2 text-sm">
          <li className="nk-flex-items px-4">
            <span className="nk-mob-title">Namonamah</span>
            <span>
              <button
                onClick={toggleMenu}
                className="text-2xl"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                ×
              </button>
            </span>
          </li>
          <li className="nk-input-li">
            <div className="nk-input-div">
              <div className="nk-sticky-input">
                <input
                  type="text"
                  id="deps-search-bar"
                  className="nk-input-container"
                  placeholder="Search pooja ..."
                  autoComplete="off"/>
                <div class="nk-magnify-icon">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
          </li>
          <li className="px-4 text-sm text-gray-500">
            <ul className="space-y-3 py-2">
              <li className="nk-all-department-link">
                <Link to={'/'}>Home</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>About Us</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>Horoscope</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>E-Stoe</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>Service</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>Virtual Services</Link>
              </li>
              <li className="nk-all-department-link">
                <Link to={'/'}>Contact</Link>
              </li>
            </ul>
          </li>
         
          <li className="nk-mob-border"></li>
          <li className="space-y-1 px-4 py-2">
            <div className="py-2">
              <div className="nk-mob">
                <div>
                  <a className="nk-mob-link" href="./signin.html">
                    Sign In
                  </a>
                </div>
                <div>Or</div>
                <div>
                  <a className="nk-mob-link" href="./signup.html">
                    Create Account
                  </a>
                </div>
              </div>
            </div>
            <div className="py-2">
              <div className="nk-mob">
                <div>
                  <a className="nk-mob-link" href="javascript:void(0)">
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div id="stickyHeader" className="nk-sticky-header">
          <div className="nk-sticky-header-logo">
            <div
              data-open-sidebar="#slide-mobile-menu"
              className="cursor-pointer"
              onClick={toggleMenu}
            >
            <i class="fas fa-bars"></i>
            </div>
            <div className="h-7 font-extrabold">
              <a className="nk-sticky-logo h-full" href="./">
                <img className="h-full object-contain" src="https://deificindia.com/namonamah/assets/image/logo/namonamah.png" alt="logo" style={{maxWidth:"98px",width:"124px",height:"93px",top:"1%",position:"absolute"}}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
          <div id="overlay" className="nk-bg-overlay hidden"></div>
          
   </>
  );
}
