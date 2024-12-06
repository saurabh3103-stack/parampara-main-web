import React from 'react';
import NabMenu  from './NavMenu';
const Navbar = () => {


  return (
    <>
      <div  className="relative isolate z-[199] hidden items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 lg:flex">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true">
          <div
            className="nk-poly-16 aspect-[577/310] w-[38.0625rem] bg-gradient-to-r from-pink-600 to-primary opacity-30"></div>
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+10rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true">
          <div
            className="nk-poly-16 aspect-[577/310] w-[39.0625rem] bg-gradient-to-r from-pink-600 to-primary opacity-30"></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">Global Summit 2023</strong><svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx="1" cy="1" r="1" /></svg>Join us in New York from Dec 7 – 9 to see What’s coming next.
          </p>
          <a
            href="#"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Register Now <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          </button>
        </div>
      </div>
      <nav>
      <div className="w-full bg-gradient-to-r from-[#030038] to-[#1607b9] py-2.5 text-sm text-white lg:py-0 h-8">
            <div className="mx-auto flex  flex-row items-center justify-between px-3 xl:px-2">
            <marquee className="content mt-1" >&nbsp;Infinite Marquee with long sentence Infinite Marquee with long sentence Infinite Marquee with long sentence Infinite Marquee with long sentence Infinite Marquee with long sentence</marquee>
            </div>
          </div>
      <NabMenu/>
      </nav>
      
    </>
  );
};  

export default Navbar;
