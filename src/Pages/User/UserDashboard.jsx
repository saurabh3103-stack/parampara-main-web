"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import { getUserByEmail } from "./GetUserDetails"
import { OmSymbol, Flame } from "./DevotionalIcons"
import {
  ShoppingBag,
  Calendar,
  Heart,
  Clock,
  ChevronRight,
  Gift,
  Star,
  Users,
  Settings,
  ArrowUpRight,
  Wallet,
  BarChart3,
  MapPin,
} from "lucide-react"
import WelcomeSection from "./WelcomeSection"
import RecentBooking from "./RecentBooking"
import UpcommingBooking from "./UpcommingBooking"
import QuickActions from "./QuickActions"

const Dashboard = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const imgUrl = 'http://localhost:3000/'
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const data = await getUserByEmail(navigate)
      if (data) {
        setUserData(data)
      } else {
        setError(error)
      }
      setLoading(false)
    }
    fetchUser()
  }, [navigate])
  const breadcrumbLinks = [{ label: "Home", url: "/" }, { label: "User", url: "#" }, { pagename: "Dashboard" }]
  const date = new Date(userData.created_at);
  const year = date.getFullYear();
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  // Mock data for dashboard
  const stats = [
    {
      id: "orders",
      label: "Total Orders",
      value: "12",
      icon: <ShoppingBag className="h-5 w-5 text-orange-600" />,
      change: "+2 this month",
      trend: "up",
    },
    {
      id: "spending",
      label: "Total Spending",
      value: "₹24,500",
      icon: <Wallet className="h-5 w-5 text-green-600" />,
      change: "+₹3,200 this month",
      trend: "up",
    },
    {
      id: "wishlist",
      label: "Wishlist Items",
      value: "8",
      icon: <Heart className="h-5 w-5 text-red-600" />,
      change: "3 new items",
      trend: "neutral",
    },
    {
      id: "points",
      label: "Devotion Points",
      value: "350",
      icon: <Flame className="h-5 w-5 text-amber-600" />,
      change: "+50 this month",
      trend: "up",
    },
  ]


  // const recommendations = [
  //   {
  //     id: "REC001",
  //     name: "Navgraha Shanti Puja",
  //     image: "/placeholder.svg?height=80&width=80",
  //     price: "₹12,999",
  //     rating: 4.8,
  //   },
  //   {
  //     id: "REC002",
  //     name: "Vastu Shanti Puja",
  //     image: "/placeholder.svg?height=80&width=80",
  //     price: "₹8,499",
  //     rating: 4.7,
  //   },
  //   {
  //     id: "REC003",
  //     name: "Ganesh Puja Kit",
  //     image: "/placeholder.svg?height=80&width=80",
  //     price: "₹1,999",
  //     rating: 4.9,
  //   },
  // ]

 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-600 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your spiritual journey...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Cosmic Header Banner */}
      <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <OmSymbol className="h-12 w-12 mx-auto text-amber-200 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50">Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Breadcrumb links={breadcrumbLinks} />

        <div className="mx-auto mt-5 w-full max-w-7xl">
          {/* Welcome Section */}
          <WelcomeSection user={userData}/>
          {/* Quick Actions */}
          <QuickActions/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <RecentBooking/>

              {/* Upcoming Poojas */}
             <UpcommingBooking/>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Account Summary */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
                <div className="flex items-center p-5 border-b border-orange-100">
                  <Users className="h-5 w-5 text-orange-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Account Summary</h2>
                </div>

                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-orange-400 mr-4">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          imgUrl+userData?.image ||
                          "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                        }
                        alt={userData?.username}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{userData?.username}</h3>
                      <p className="text-sm text-gray-500">{userData?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-medium text-gray-800">{monthName} {year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Membership Level</span>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {/* Gold Devotee */}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed Poojas</span>
                      {/* <span className="font-medium text-gray-800">8</span> */}
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-orange-100">
                    <a
                      href="/user/profile"
                      className="flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors w-full"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Full Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Recommended for You */}
              {/* <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100">
                <div className="flex items-center p-5 border-b border-orange-100">
                  <Gift className="h-5 w-5 text-orange-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Recommended for You</h2>
                </div>

                <div className="divide-y divide-orange-100">
                  {recommendations.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-orange-50 transition-colors">
                      <div className="flex items-center">
                        <div className="h-14 w-14 rounded-lg overflow-hidden border border-orange-200 mr-4 bg-orange-50 flex-shrink-0">
                          <img
                            className="h-full w-full object-cover"
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-orange-700 font-semibold">{item.price}</span>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-amber-500 mr-1 fill-amber-500" />
                              <span className="text-xs text-gray-600">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-orange-50">
                  <a
                    href="/shop"
                    className="flex items-center justify-center text-sm text-orange-700 hover:text-orange-900"
                  >
                    View All Recommendations
                    <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

