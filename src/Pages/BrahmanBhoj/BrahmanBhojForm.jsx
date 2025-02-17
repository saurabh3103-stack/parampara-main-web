"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function BrahmanBhojForm() {
  const [location, setLocation] = useState("")

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation(`${latitude}, ${longitude}`)
      })
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Section - Hidden on Mobile, Visible on Medium Screens and Above */}
          <div className="hidden md:block bg-orange-100 p-6 flex items-center justify-center">
            <motion.img
              src="https://cdni.iconscout.com/illustration/premium/thumb/pandit-ji-giving-blessings-illustration-download-in-svg-png-gif-file-formats--male-indian-blessing-well-wish-pack-people-illustrations-2319309.png?f=webp"
              alt="Animated Pandit"
              className="w-full max-w-xs"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
          {/* Form Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Brahman Bhoj Booking</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">
                    Attendees
                  </label>
                  <input
                    id="attendees"
                    type="number"
                    min="1"
                    placeholder="Number of guests"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="location"
                    value={location}
                    readOnly
                    placeholder="Your location"
                    className="flex-grow rounded-none rounded-l-md border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-orange-50 text-orange-600 hover:bg-orange-100"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700">
                  Special Requests
                </label>
                <textarea
                  id="special-requests"
                  rows={2}
                  placeholder="Any dietary requirements or special requests?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200"
               style={{background:'rgb(249 115 22 / var(--tw-bg-opacity, 1))'}}>
                Book Brahman Bhoj
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}