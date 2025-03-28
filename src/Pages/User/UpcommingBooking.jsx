import React from 'react'
import {
    Calendar,
    Clock,
    ChevronRight,
    MapPin,
  } from "lucide-react"
export default function UpcommingBooking() {
  
    const upcomingPoojas = [
       
      ]
    return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
    <div className="flex items-center justify-between p-5 border-b border-orange-100">
      <div className="flex items-center">
        <Calendar className="h-5 w-5 text-orange-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Poojas</h2>
      </div>
      <a href="/user/calendar" className="text-sm text-orange-600 hover:text-orange-800 flex items-center">
        View Calendar
        <ChevronRight className="h-4 w-4 ml-1" />
      </a>
    </div>

    <div className="divide-y divide-orange-100">
      {upcomingPoojas.map((pooja) => (
        <div key={pooja.id} className="p-5 hover:bg-orange-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-orange-100 rounded-lg p-3 mr-4 text-center min-w-[60px]">
                <span className="block text-orange-800 font-bold text-lg">{pooja.date.split(" ")[0]}</span>
                <span className="block text-orange-600 text-xs">{pooja.date.split(" ")[1]}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{pooja.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-sm text-gray-500">
                  <span className="flex items-center mr-3">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {pooja.time}
                  </span>
                  <span className="flex items-center mt-1 sm:mt-0">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {pooja.location}
                  </span>
                </div>
              </div>
            </div>
            <a href={`/pooja/${pooja.id}`} className="text-orange-600 hover:text-orange-800">
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      ))}
    </div>

    {upcomingPoojas.length === 0 && (
      <div className="p-8 text-center">
        <Calendar className="h-10 w-10 text-orange-300 mx-auto mb-3" />
        <h3 className="text-gray-700 font-medium mb-1">No upcoming poojas</h3>
        <p className="text-gray-500 text-sm mb-4">Book a pooja to see it in your calendar</p>
        <a
          href="/shop"
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Book Now
        </a>
      </div>
    )}
  </div>  )
}
