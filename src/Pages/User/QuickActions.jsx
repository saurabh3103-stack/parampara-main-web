import React from 'react'
import { OmSymbol, Lotus, Diya, Flame } from "./DevotionalIcons"
import {
  ShoppingBag,
  Calendar,
  Heart,
  Settings,
} from "lucide-react"
export default function QuickActions() {
    const quickActions = [
        { id: "pooja", label: "Book Puja", icon: <Calendar className="h-5 w-5" />, color: "bg-orange-100 text-orange-600" },
        { id: "orders", label: "My Orders", icon: <ShoppingBag className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
        { id: "wishlist", label: "Wishlist", icon: <Heart className="h-5 w-5" />, color: "bg-red-100 text-red-600" },
        { id: "account", label: "Settings", icon: <Settings className="h-5 w-5" />, color: "bg-gray-100 text-gray-600" },
      ]
  return (
  <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Diya className="h-5 w-5 text-orange-600 mr-2" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={`/${action.id}`}
                  className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 rounded-full ${action.color} mb-3`}>{action.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </a>
              ))}
            </div>
          </div>  )
}
