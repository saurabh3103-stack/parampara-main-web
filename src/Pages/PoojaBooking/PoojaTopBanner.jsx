import React from 'react'

export default function PoojaTopBanner() {
  return (
    <div className="bg-red-900 text-white p-6 md:p-12 flex flex-col md:flex-row items-center justify-between rounded-2xl">
    <div className="md:w-1/2 flex justify-start mt-6 md:mt-0">
      <img
        src="https://pujabooking.com/wp-content/uploads/2023/02/PngItem_1749404.png"
        alt="Pure Kashmiri Saffron"
        className="w-64 md:w-80 object-contain"
      />
    </div>
    <div className="md:w-1/2 text-center md:text-left">
      {/* <h3 className="text-sm uppercase">Sri Sampann Kashmiri Mongra Saffron</h3> */}
      <h2 className="text-2xl text-white md:text-4xl font-semibold my-4">
      We provide services for <br/>
      Hindu devotional pujas and <br/>
      pandit services. Our services can <br/>
      be performed Online and Offline 
      </h2>
      <button className="mt-6 bg-white text-red-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-200">
        Book Now
      </button>
    </div>    
  </div>
  )
}
