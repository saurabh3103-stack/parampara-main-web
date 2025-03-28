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

const EStoreOrderReceipt = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const currencySymbol = "₹";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

  // Fetch order and delivery address details
  const fetchOrderData = async () => {
    try {
      const [orderResponse, addressResponse] = await Promise.all([
        fetch(`http://34.131.41.101:3000/api/e-store/orders/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`http://34.131.41.101:3000/api/order/delivery-address/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!orderResponse.ok) throw new Error(`Order fetch error: ${orderResponse.status}`);
      const orderData = await orderResponse.json();

      if (!addressResponse.ok) throw new Error(`Address fetch error: ${addressResponse.status}`);
      const addressData = await addressResponse.json();

      setOrderData(orderData.order);
      setDeliveryAddress(addressData.DeliveryAddress);
      setCartItems(orderData.order.orderDetails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [id]);

  // Calculate order totals
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.amount * item.quantity, 0);
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

      <div className="max-w-4xl mx-auto px-4 py-8">
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
                    {new Date(orderData?.createdAt).toLocaleDateString()}
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
                  <div key={item.productId} className="p-4 border-b border-orange-100">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative rounded overflow-hidden border border-orange-200">
                        <img
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.productName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-orange-800">{item.productName}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">Qty: {item.quantity}</span>
                          <span className="font-medium">
                            {currencySymbol}
                            {item.amount.toFixed(2)}
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
                  {deliveryAddress?.addressLine1}, {deliveryAddress?.addressLine2},
                  <br />
                  {deliveryAddress?.city}, {deliveryAddress?.state},<br />
                  {deliveryAddress?.postalCode}, {deliveryAddress?.country}
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

export default EStoreOrderReceipt;