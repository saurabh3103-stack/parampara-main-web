import React from 'react'
import {
    ShoppingBag,
    Calendar,
    ChevronRight,
  
  } from "lucide-react"
export default function RecentBooking() {
    const recentOrders = [
        
      ]
    
  return (
<div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100 mb-8">
                <div className="flex items-center justify-between p-5 border-b border-orange-100">
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 text-orange-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                  </div>
                  <a href="/user/orders" className="text-sm text-orange-600 hover:text-orange-800 flex items-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>

                <div className="divide-y divide-orange-100">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-5 hover:bg-orange-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{order.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span className="mr-3">{order.id}</span>
                            <span className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {order.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <span className="font-semibold text-gray-800 mr-4">{order.price}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {recentOrders.length === 0 && (
                  <div className="p-8 text-center">
                    <ShoppingBag className="h-10 w-10 text-orange-300 mx-auto mb-3" />
                    <h3 className="text-gray-700 font-medium mb-1">No orders yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Start your spiritual journey by booking a pooja</p>
                    <a
                      href="/pooja"
                      className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Browse Poojas
                    </a>
                  </div>
                )}
              </div>  )
}
