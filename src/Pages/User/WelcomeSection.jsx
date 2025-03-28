import React from 'react'
import {Lotus} from "./DevotionalIcons"
import {ShoppingBag,Users,} from "lucide-react"
const  WelcomeSection = ({user})  =>{
    const userData = user;
   
  return (
<div className="mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 md:p-8 relative">
                <div className="absolute right-0 top-0 opacity-10">
                  <Lotus className="h-48 w-48 text-white" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Namaste, {userData?.username}!
                  </h2>
                  <p className="text-orange-100 mb-6 max-w-2xl">
                    Welcome to your spiritual journey dashboard. Track your poojas, orders, and discover new spiritual
                    services tailored for you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/pooja"
                      className="inline-flex items-center px-4 py-2 bg-white text-orange-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Browse Poojas
                    </a>
                    <a
                      href="/user/profile"
                      className="inline-flex items-center px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default WelcomeSection;