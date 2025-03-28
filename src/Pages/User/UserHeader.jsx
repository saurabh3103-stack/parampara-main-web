import { useState } from "react"
import { Link } from "react-router-dom"
import { User, MapPin, Mail, Menu, ChevronDown, Edit, ShoppingBag, Truck, Heart, LogOut } from "lucide-react"
import { OmSymbol } from "./DevotionalIcons"

const UserHeader = ({ userData, activeTab, setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-orange-800 flex items-center">
        <OmSymbol className="h-6 w-6 text-orange-600 mr-2" />
        My Account
      </h1>

      <div className="rounded-xl border border-orange-200 bg-white shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-orange-400 p-1">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={
                      userData.image ||
                      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                    }
                    alt={userData.username}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-orange-100 p-1 rounded-full border border-orange-300">
                  <Edit className="h-4 w-4 text-orange-600" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-orange-800">{userData.username}</h2>
                  {/* Verified badge */}
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="flex items-center gap-1 mb-1">
                    <span className="text-orange-600 font-medium">AccountID:</span> #{userData.accountId || "ECX12345"}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-orange-500" />
                      <span>Customer</span>
                    </div>

                    {userData.city && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-orange-500" />
                        <span>{userData.city}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-orange-500" />
                      <span>{userData.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center p-2 rounded-lg bg-orange-100 text-orange-700"
              >
                <Menu className="h-5 w-5" />
                <span className="ml-2">Menu</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/user/profile"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Link>
              <Link
                to="/logout"
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="mt-4 border-t border-orange-100 pt-4 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/user/profile"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-orange-100 text-orange-700"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Link>
                <Link to="/logout" className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-orange-100">
          <div className="flex overflow-x-auto whitespace-nowrap px-2 py-1 text-sm font-medium">
            {[
              { id: "dashboard", label: "Dashboard", icon: <OmSymbol className="h-4 w-4" /> },
              { id: "edit", label: "Edit Profile", icon: <Edit className="h-4 w-4" /> },
              { id: "orders", label: "Orders & Purchase", icon: <ShoppingBag className="h-4 w-4" /> },
              { id: "shipping", label: "Shipping & Billing", icon: <Truck className="h-4 w-4" /> },
              { id: "wishlist", label: "Wishlist & Saved Items", icon: <Heart className="h-4 w-4" /> },
            ].map((tab) => (
              <Link
                key={tab.id}
                to={`/user/${tab.id === "dashboard" ? "profile" : tab.id}`}
                className={`flex items-center px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-600 text-orange-800"
                    : "border-transparent text-gray-600 hover:text-orange-700 hover:border-orange-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHeader

