import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import WelcomeSection from "./WelcomeSection"
import { getUserByEmail, fetchEcommerceOrders, fetchPoojaOrders, fetchBhajanOrders } from "./GetUserDetails"
import {
  ShoppingBag,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  Package,
  RefreshCw,
  X,
} from "lucide-react"
import OrderDetailsModal from "./OrderDetailsModal"
import OrdersTable from "./OrdersTable"

const OrderPurchase = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState({
    ecommerce: [],
    bhajan: [],
    pooja: []
  })
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [activeTab, setActiveTab] = useState("ecommerce")

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const data = await getUserByEmail(navigate)
        if (data) {
          setUserData(data)
        } else {
          setError("User not found")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const userId = userData?._id;

  // Helper function to normalize status
  const normalizeStatus = (status) => {
    if (status === undefined || status === null) return 'pending';
    
    const statusMap = {
      // Numeric status codes
      1: 'pending',
      2: 'accepted',
      3: 'completed',
      4: 'cancelled',
      
      // String status variations
      'pending': 'pending',
      'processing': 'processing',
      'accepted': 'accepted',
      'shipped': 'shipped',
      'delivered': 'delivered',
      'completed': 'completed',
      'cancelled': 'cancelled',
      'rejected': 'cancelled'
    };

    const lowerStatus = typeof status === 'string' ? status.toLowerCase() : status;
    return statusMap[lowerStatus] || 'pending';
  }

  // Helper function to get display text for status
  const getStatusDisplayText = (status) => {
    const normalizedStatus = normalizeStatus(status);
    const displayMap = {
      'pending': 'Pending',
      'processing': 'Processing',
      'accepted': 'Accepted',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return displayMap[normalizedStatus] || 'Pending';
  }

  // fetch user order 
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        
        const [ecommerceOrders, bhajanOrders, poojaOrders] = await Promise.all([
          fetchEcommerceOrders(userId),
          fetchBhajanOrders(userId),
          fetchPoojaOrders(userId)
        ]);
    
        // Process ecommerce orders
        const processedEcommerce = ecommerceOrders.map(order => ({
          id: order.orderId || order._id,
          name: order.orderDetails?.[0]?.productName || 'Ecommerce Order',
          date: new Date(order.createdAt),
          amount: order.totalAmount || order.orderDetails?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0,
          quantity: order.orderDetails?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 1,
          status: normalizeStatus(order.orderStatus),
          paymentStatus: order.paymentDetails?.transactionStatus || 'pending',
          formattedDate: new Date(order.createdAt).toLocaleDateString('en-IN'),
          statusText: getStatusDisplayText(order.orderStatus),
          image: order.orderDetails?.[0]?.image || "/placeholder.svg",
          type: 'ecommerce'
        })).sort((a, b) => b.date - a.date); // Sort by date descending by default
    
        // Process bhajan orders
        const processedBhajan = bhajanOrders.map(booking => ({
          id: booking.bookingId || booking._id,
          name: booking.bookingDetails?.mandaliName || 'Bhajan Booking',
          date: new Date(booking.createdAt),
          amount: booking.paymentDetails?.amount || 0,
          quantity: booking.paymentDetails?.quantity || 1,
          status: normalizeStatus(booking.bookingStatus),
          paymentStatus: booking.transactionDetails?.transactionStatus || 'pending',
          formattedDate: new Date(booking.createdAt).toLocaleDateString('en-IN'),
          statusText: getStatusDisplayText(booking.bookingStatus),
          image: "/placeholder.svg",
          type: 'bhajan'
        })).sort((a, b) => b.date - a.date);
    
        // Process pooja orders
        const processedPooja = poojaOrders.map(booking => ({
          id: booking.bookingId || booking._id,
          name: booking.bookingDetails?.poojaName || 'Pooja Booking',
          date: new Date(booking.createdAt),
          amount: booking.paymentDetails?.amount || 0,
          quantity: booking.paymentDetails?.quantity || 1,
          status: normalizeStatus(booking.bookingStatus),
          paymentStatus: booking.transactionDetails?.transactionStatus || 'pending',
          formattedDate: new Date(booking.createdAt).toLocaleDateString('en-IN'),
          statusText: getStatusDisplayText(booking.bookingStatus),
          image: "/placeholder.svg",
          type: 'pooja'
        })).sort((a, b) => b.date - a.date);
    
        setOrders({
          ecommerce: processedEcommerce,
          bhajan: processedBhajan,
          pooja: processedPooja
        });
    
        // Set filtered orders to the active tab's orders initially
        setFilteredOrders(activeTab === 'ecommerce' ? processedEcommerce : 
                         activeTab === 'pooja' ? processedPooja : processedBhajan);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchAllOrders();
    }
  }, [userId, activeTab]);

  // Filter and sort orders
  useEffect(() => {
    let result = [...orders[activeTab]];

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((order) => order.status === filterStatus);
    }

    // Apply year filter
    if (filterYear !== "all") {
      result = result.filter((order) => {
        const orderYear = order.date.getFullYear().toString();
        return orderYear === filterYear;
      });
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) => 
          order.id.toLowerCase().includes(term) || 
          order.name.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = a.date - b.date;
      } else if (sortBy === "price") {
        comparison = a.amount - b.amount;
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    setFilteredOrders(result);
  }, [orders, activeTab, filterStatus, filterYear, searchTerm, sortBy, sortDirection]);

  const getStatusIcon = (status) => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case "pending":
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      case "accepted":
      case "shipped":
        return <Truck className="h-4 w-4 text-orange-500" />
      case "completed":
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusClass = (status) => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case "pending":
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "accepted":
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewOrder = (order) => {
    // Create a more detailed order object for the modal
    const detailedOrder = {
      ...order,
      timeline: [
        { 
          status: order.type === 'ecommerce' ? "Order Placed" : "Booking Requested", 
          completed: true, 
          date: order.formattedDate 
        },
        { 
          status: order.type === 'ecommerce' ? "Processing" : 
                 order.type === 'pooja' ? "Priest Assigned" : "Organizer Assigned", 
          completed: ['processing', 'accepted', 'shipped', 'delivered', 'completed'].includes(order.status) 
        },
        { 
          status: order.type === 'ecommerce' ? "Shipped" : "Scheduled", 
          completed: ['shipped', 'delivered', 'completed'].includes(order.status) 
        },
        { 
          status: order.type === 'ecommerce' ? "Delivered" : "Completed", 
          completed: ['delivered', 'completed'].includes(order.status) 
        }
      ],
      items: [{
        id: order.id,
        name: order.name,
        quantity: order.quantity,
        price: order.amount,
        image: order.image
      }],
      price: order.amount,
      shipping: {
        address: "123 Temple Street",
        city: "Varanasi",
        state: "Uttar Pradesh",
        pincode: "221001",
        country: "India"
      },
      payment: {
        method: "Online Payment",
        status: order.paymentStatus || "Paid",
        last4: "4242"
      },
      pooja: order.type === 'pooja' ? {
        date: order.date,
        time: "10:00 AM",
        venue: "Shri Kashi Vishwanath Temple",
        priest: "Pandit Sharma Ji",
        duration: "2 hours",
        specialInstructions: "Please bring flowers and fruits"
      } : null,
      bhajan: order.type === 'bhajan' ? {
        date: order.date,
        time: "07:00 PM",
        venue: "Local Temple",
        organizer: "Mandali Group",
        duration: "1 hour"
      } : null
    };
    
    setSelectedOrder(detailedOrder);
    setShowOrderDetails(true);
  }

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  }

  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}`);
  }

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  }

  // Generate year options for filter
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= currentYear - 5; year--) {
    yearOptions.push(year.toString());
  }

  const breadcrumbLinks = [
    { label: "Home", url: "/" },
    { label: "User", url: "/user/dashboard" },
    { pagename: "My Orders" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-600 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your orders...</p>
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
                "url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-amber-200 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50">My Orders</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Breadcrumb links={breadcrumbLinks} />

        <div className="mx-auto mt-5 w-full max-w-7xl">
          {/* Welcome Section */}
          <WelcomeSection user={userData} />
          
          {/* Order Details Modal */}
          {showOrderDetails && (
            <OrderDetailsModal
              selectedOrder={selectedOrder}
              onClose={handleCloseOrderDetails}
              onDownloadInvoice={handleDownloadInvoice}
              getStatusClass={getStatusClass}
              getStatusIcon={getStatusIcon}
              getStatusDisplayText={getStatusDisplayText}
            />
          )}

          {/* Orders Table */}
          <OrdersTable
            activeTab={activeTab}
            filteredOrders={filteredOrders}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            filterYear={filterYear}
            yearOptions={yearOptions}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSearchChange={setSearchTerm}
            onFilterStatusChange={setFilterStatus}
            onFilterYearChange={setFilterYear}
            onSortChange={handleSortChange}
            onViewOrder={handleViewOrder}
            onDownloadInvoice={handleDownloadInvoice}
            getStatusClass={getStatusClass}
            getStatusIcon={getStatusIcon}
            getStatusDisplayText={getStatusDisplayText}
            setActiveTab={setActiveTab}
            setSearchTerm={setSearchTerm}
            setFilterStatus={setFilterStatus}
            setFilterYear={setFilterYear}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderPurchase