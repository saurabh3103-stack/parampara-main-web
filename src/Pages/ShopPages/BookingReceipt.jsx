import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Gift,
  Download,
  Share2,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";

const fetchOrderReceipt = async (id) => {
  // Simulate API call
  return {
    orderData: {
      userDetails: {
        username: "Shivanshu",
        email: "shivanshu@gmail.com",
        contactNumber: "1234567890",
      },
      bookingDetails: {
        Type: "Pooja",
        bookingId: id,
        status: "Confirmed",
        createdAt: "2023-07-15T10:30:00Z",
        poojaId: "p1",
        poojaName: "Akhand Paath of Sri Ram Charit Manas",
        amount: 34999.0,
        date: "2025-12-25",
        time: "2:00 PM",
      },
      paymentDetails: {
        method: "Online",
        transactionId: "TXN123456789",
        transactionDate: "2023-07-15T10:35:00Z",
        status: "Success",
      },
    },
    deliveryAddress: {
      DeliveryAddress: {
        AddressLine1: "Lakhanpur Road",
        AddressLine2: "Near Temple",
        City: "Kanpur",
        State: "Uttar Pradesh",
        PostalCode: "208024",
        Country: "India",
      },
    },
    cartItems: [
      {
        _id: "1",
        product_id: "p1",
        product_name: "Akhand Paath of Sri Ram Charit Manas",
        product_image: "/placeholder.svg?height=80&width=80",
        product_amount: 34999.0,
        quantity: 1,
        pooja_date: "2025-12-25",
        pooja_time: "2:00 PM",
      },
      {
        _id: "2",
        product_id: "p2",
        product_name: "Udaka Shanti Puja",
        product_image: "/placeholder.svg?height=80&width=80",
        product_amount: 19900.0,
        quantity: 1,
        pooja_date: "2025-12-30",
        pooja_time: "4:00 AM",
      },
    ],
  };
};

const BookingReceipt = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencySymbol = "₹";

  // Fetch order data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderReceipt(id);
        setOrderData(data.orderData);
        setDeliveryAddress(data.deliveryAddress);
        setCartItems(data.cartItems);
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError("Failed to fetch order data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Calculate order totals
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product_amount * item.quantity, 0);
  };

  const calculateShipping = () => {
    return 4.99;
  };

  const calculateTax = () => {
    return 2.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  // Handle receipt download
  const handleDownloadReceipt = () => {
    alert("Receipt download functionality would be implemented here");
  };

  // Handle share receipt
  const handleShareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Pooja Booking Receipt",
        text: `Order #${id} confirmation from PoojaBooking`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your receipt...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link to="/cart">
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
              Return to Cart
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Special Offers Banner */}
      <div className="w-full bg-orange-100 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-600" />
            <p className="text-sm">
              <span className="font-semibold">Special Offers.</span> We found offers available based on items in your
              cart.
            </p>
          </div>
          <Link to="#" className="text-orange-700 hover:underline text-sm font-medium">
            See All Deals & Offers
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-800">Order Receipt</h1>
          </div>
          <Link to="/">
            <button className="border border-orange-300 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Order Confirmed Section */}
        <div className="border border-orange-200 bg-white rounded-lg shadow-sm">
          <div className="bg-green-50 border-b border-green-100 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Order Confirmed
              </h2>
              <div className="flex gap-2">
                <button
                  className="border border-green-200 text-green-700 hover:bg-green-50 px-3 py-1 rounded flex items-center"
                  onClick={handleDownloadReceipt}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
                <button
                  className="border border-green-200 text-green-700 hover:bg-green-50 px-3 py-1 rounded flex items-center"
                  onClick={handleShareReceipt}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Order Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-medium">{id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(orderData?.bookingDetails?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="font-medium">{orderData?.paymentDetails?.method}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Payment Status</p>
                  <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-sm">
                    {orderData?.paymentDetails?.status}
                  </span>
                </div>
              </div>

              <hr className="my-4 border-orange-100" />

              <div className="space-y-4">
                <h3 className="font-medium text-orange-800">Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{orderData?.userDetails?.username}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Contact Number</p>
                    <p className="font-medium">{orderData?.userDetails?.contactNumber}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="font-medium">{orderData?.userDetails?.email}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="font-medium text-orange-800">Order Summary</h3>
                {cartItems.map((item) => (
                  <div key={item._id} className="p-4 border-b border-orange-100">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative rounded overflow-hidden border border-orange-200">
                        <img
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.product_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-orange-800">{item.product_name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>Booking Date: {new Date(item.pooja_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>Booking Time: {item.pooja_time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">Qty: {item.quantity}</span>
                          <span className="font-medium">
                            {currencySymbol}
                            {item.product_amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                    <span>
                      {currencySymbol}
                      {calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span>
                      {currencySymbol}
                      {calculateShipping().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span>
                      {currencySymbol}
                      {calculateTax().toFixed(2)}
                    </span>
                  </div>

                  <hr className="my-2 border-orange-100" />

                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-orange-800">Total:</span>
                    <span className="text-orange-800">
                      {currencySymbol}
                      {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-orange-100" />

              <div className="space-y-4">
                <h3 className="font-medium text-orange-800">Delivery Address</h3>
                <p className="text-sm">
                  {deliveryAddress?.DeliveryAddress?.AddressLine1}, {deliveryAddress?.DeliveryAddress?.AddressLine2},
                  <br />
                  {deliveryAddress?.DeliveryAddress?.City}, {deliveryAddress?.DeliveryAddress?.State},<br />
                  {deliveryAddress?.DeliveryAddress?.PostalCode}, {deliveryAddress?.DeliveryAddress?.Country}
                </p>
              </div>

              <hr className="my-4 border-orange-100" />

              <div className="space-y-4">
                <h3 className="font-medium text-orange-800">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Transaction ID</p>
                    <p className="font-medium">{orderData?.paymentDetails?.transactionId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Transaction Date</p>
                    <p className="font-medium">
                      {new Date(orderData?.paymentDetails?.transactionDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm mt-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-orange-600" />
            <h3 className="font-medium text-orange-800">Booking Information</h3>
          </div>
          <p className="text-gray-700 mb-2">
            BookMypooja Team will contact you soon to confirm the auspicious dates for your ceremony.
          </p>
          <p className="text-gray-700">
            For any queries, please contact our customer support at{" "}
            <span className="text-orange-700">support@bookpooja.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingReceipt;