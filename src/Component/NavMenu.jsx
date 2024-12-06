import React from "react"


export default function NabMenu() {
    
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
                    <a href="/">Home</a>
                  </div>
                </div>
                <div data-dropdown="#shop-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>About Us</span>
                  </div>
                </div>
                <div data-dropdown="#pages-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>Horoscope</span>
                  </div>
                </div>

                <div data-dropdown="#list-nav-headers" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>E-Store</span>
                  </div>
                
                </div>
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>Service</span>
                    <span style={{paddingLeft:"7px"}}><i class="fas fa-chevron-down"></i></span>
                  </div>
                  <div id="pages-dropdown" className="nk-dropdown_menu nk-dropdown-menu-animated my-2 w-[200px]">
                    <span className="nk-top-dropdown-triangle -left-[187px]"></span>
                    <div className="nk-dropdown-content" >
                      <a className="nk-dropdown-nav-link" href="/pooja-booking">Pooja Booking</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Brahman Bhoj</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Bhajan Mandal</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Temple Donation</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Daily Pandit</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Puja at Temple</a>
                      <a className="nk-dropdown-nav-link" href="javascript:void(0)">Darshan Booking</a>
                    </div>
                  </div>
                </div>  
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>Virtual Services</span>
                  </div>
                </div>
                <div data-dropdown="#elements-dropdown" className="nk-dropdown-slide ">
                  <div className="nk-dropdown-menu-link !py-4 ">
                    <span>Contact</span>
                  </div>
                </div>
              </div>
              <div className="nk-right-nav">
              <div className="hidden flex-row items-center space-x-6 xl:flex">
                
                <div>
                <a href="#!"><svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg></a>
                </div>
                <div>
                <a href="./account-wishlist.html"><svg className="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M462.1 62.86C438.8 41.92 408.9 31.1 378.7 32c-37.49 0-75.33 15.4-103 43.98l-19.7 20.27l-19.7-20.27C208.6 47.4 170.8 32 133.3 32C103.1 32 73.23 41.93 49.04 62.86c-62.14 53.79-65.25 149.7-9.23 207.6l193.2 199.7C239.4 476.7 247.6 480 255.9 480c8.332 0 16.69-3.267 23.01-9.804l193.1-199.7C528.2 212.5 525.1 116.6 462.1 62.86zM437.6 237.1l-181.6 187.8L74.34 237.1C42.1 203.8 34.46 138.1 80.46 99.15c39.9-34.54 94.59-17.5 121.4 10.17l54.17 55.92l54.16-55.92c26.42-27.27 81.26-44.89 121.4-10.17C477.1 138.6 470.5 203.1 437.6 237.1z"></path></svg></a>
                </div>
                <div>
                <a href="./account-overview.html"><svg className="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg></a>
                </div>
                <div>
                <a href="./cart.html"><svg className="svg-inline--fa fa-cart-shopping" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-shopping" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416zM175.1 416c-26.51 0-47.1 21.49-47.1 48S149.5 512 175.1 512s47.1-21.49 47.1-48S202.5 416 175.1 416zM569.5 44.73c-6.109-8.094-15.42-12.73-25.56-12.73H121.1L119.6 19.51C117.4 8.19 107.5 0 96 0H23.1C10.75 0 0 10.75 0 23.1S10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.29 0 26.84-9.47 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73z"></path></svg></a>
                </div>
            </div>
              </div>
            </div>
          </div>
          <div className="nk-border-separator"></div>
          <div className="nk-mobile-container">
            <div id="slide-mobile-menu" className="nk-mobile-menu" style={{transition: "0.5s",transform: "translateX(-100%)"}}>
              <ul className="space-y-2 text-sm">
                <li className="nk-flex-items px-4">
                  <span className="nk-mob-title">Menus &amp; Pages</span>
                  <span><a href="javascript:void(0)" className="text-2xl" data-close-sidebar="#slide-mobile-menu">×</a></span>
                </li>
                <li className="nk-input-li">
                  <div className="nk-input-div">
                    <div className="nk-sticky-input">
                      <input type="text" id="deps-search-bar" className="nk-input-container" placeholder="Search categories ..." autocomplete="off" fdprocessedid="8dqd8b"/>
                      <div className="nk-magnify-icon">
                        <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="px-4 text-sm text-gray-500">
                  <ul className="space-y-3 py-2">
                    <li className="nk-item-accordion-li">
                      <div className="nk-item-accordion">
                        <div>Home</div>
                        <div className="nk-chevron-icon">
                          <svg className="svg-inline--fa fa-chevron-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg>
                        </div>
                      </div>
                    </li>
                    <li className="nk-item-accordion-li">
                      <div className="nk-item-accordion">
                        <div>Shop</div>
                        <div className="nk-chevron-icon">
                          <svg className="svg-inline--fa fa-chevron-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg>
                        </div>
                      </div>
                    </li>
                    <li className="nk-item-accordion-li">
                      <div className="nk-item-accordion">
                        <div>Shop by Categories</div>
                        <div className="nk-chevron-icon">
                          <svg className="svg-inline--fa fa-chevron-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg>
                        </div>
                      </div>
                    </li>
                    <li className="nk-item-accordion-li">
                      <div className="nk-item-accordion">
                        <div>Pages</div>
                        
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nk-mob-border"></li>
                <li className="px-4">
                  <span className="nk-mob-title">Featured</span>
                </li>
              
                <li className="nk-mob-border"></li>
                <li className="space-y-1 px-4 py-2">
                  <div className="py-2">
                    <div className="nk-mob">
                      <div><a className="nk-mob-link" href="./signin.html">Sign In</a></div>
                      <div>Or</div>
                      <div><a className="nk-mob-link" href="./signup.html">Create Account</a></div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="nk-mob">
                      <div><a className="nk-mob-link" href="javascript:void(0)">Call Us</a></div>
                      <div>Or</div>
                      <div><a className="nk-mob-link" href="javascript:void(0)">Chat Now</a></div>
                    </div>
                  </div>
                  <div className="py-2">
                    <a className="nk-cat-hover-underline" href="#!">
                      <div className="nk-mob">
                        <div>Help &amp; Support</div>
                      </div>
                    </a>
                  </div>
                  <div className="px-4 pt-8 pb-16" data-close-sidebar="#slide-mobile-menu">
                    <div className="nk-mob-close"><svg className="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg> Close</div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div id="stickyHeader" className="nk-sticky-header">
                <div className="nk-sticky-header-logo">
                  <div data-open-sidebar="#slide-mobile-menu" className="cursor-pointer">
                    <svg className="svg-inline--fa fa-bars" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 224H31.1C14.33 224 0 238.3 0 256s14.33 32 31.1 32h384C433.7 288 448 273.7 448 256S433.7 224 416 224zM416 384H31.1C14.33 384 0 398.3 0 415.1S14.33 448 31.1 448h384C433.7 448 448 433.7 448 416S433.7 384 416 384zM416 64H31.1C14.33 64 0 78.33 0 95.1S14.33 128 31.1 128h384C433.7 128 448 113.7 448 96S433.7 64 416 64z"></path></svg>
                  </div>
                  <div className="h-7 font-extrabold">
                    <a className="nk-sticky-logo h-full" href="./">
                      <img className="objact-contain h-full" src="./assets/img/logo-white.svg" alt=""/>
                    </a>
                  </div>
                </div>
                <div className="nk-sticky-search">
                  <div className="nk-sticky-input">
                    <input type="text" id="responsive-search-bar" className="nk-input-container pr-10" placeholder="Search products/Items ..." autocomplete="off"/>
                    <div className="nk-magnify-icon">
                      <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="nk-sticky-main-bk">
                  <div id="open-search-overlay" className="nk-sticky-search-icon">
                    <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
                  </div>
                  <div id="mobile-search-overlay" className="hidden">
                    <span id="close-search" className="nk-close-search" title="Close Overlay"><svg className="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg></span>
                    <div className="nk-popup-search">
                      <form className="w-full">
                        <input type="text" className="nk-popup-input" placeholder="Search items..." name="search"/>
                        <button className="nk-popup-btn" type="submit">
                          <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="nk-sticky-container">
                    <div>
                      <a className="nk-sticky-link" href="./cart.html">
                        <div className="relative">
                          <span className="bg-primary-800 absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-center text-xs text-white">3</span>
                          <span><svg className="svg-inline--fa fa-cart-shopping" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-shopping" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416zM175.1 416c-26.51 0-47.1 21.49-47.1 48S149.5 512 175.1 512s47.1-21.49 47.1-48S202.5 416 175.1 416zM569.5 44.73c-6.109-8.094-15.42-12.73-25.56-12.73H121.1L119.6 19.51C117.4 8.19 107.5 0 96 0H23.1C10.75 0 0 10.75 0 23.1S10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.29 0 26.84-9.47 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73z"></path></svg></span>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a className="nk-sticky-link" href="./account-overview.html">
                        <svg className="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-sticky-bottom-bar">
                <div className="nk-scrollbars-hidden nk-sticky-bottom-bar-menu text-light">
                  <a href="#" className="text-white">Pooja Booking</a>
                  <a href="#" className="text-white">Virtual Services</a>
                  <a href="#" className="text-white">Horoscope</a>
                  <a href="#" className="text-white">Contact</a>
                </div>
              </div>
            </div>
          </div>
          <div id="overlay" className="nk-bg-overlay hidden"></div>
          
   </>
  );
}
