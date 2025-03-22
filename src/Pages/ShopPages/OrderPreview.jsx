import { useState, useEffect } from "react"
import { Link, useParams ,useNavigate  } from "react-router-dom"
import {
  ArrowLeft,
  Gift,
  Check,
  CreditCard,
  Banknote,
  NotebookIcon as Lotus,
  Info,
  Calendar,
  Clock,
} from "lucide-react"
import { fetchUserAndCartDetails } from "./CartFetch";
import OrderDetails from "./OrderDetails";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderPreviewPage() {
  const params = useParams()
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [MandaliData, setMandaliData] = useState({});
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const currencySymbol = "₹"
  const fetchData = async () => {
    try {
        setLoading(true);

        // Fetch cart details properly
        const cartResponse = await fetchUserAndCartDetails();
        if (!cartResponse || cartResponse.error) throw new Error("Failed to fetch cart data");
        const cartData = cartResponse.cart || []; // Ensure cartData is an array

        // Fetch order and delivery address simultaneously
        const [orderResponse, addressResponse] = await Promise.all([
            fetch(`http://34.131.10.8:3000/api/orders/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
            fetch(`http://34.131.10.8:3000/api/order/delivery-address/${id}`, {
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

        // Update state
        setCartItems(cartData);
        setOrderData(orderData);
        setDeliveryAddress(addressData);

        // Fetch Mandali data if order type is "Bhajan Mandali"
        if (orderData.bookingDetails?.Type === "Bhajan Mandali") {
            const mandaliResponse = await fetch(`http://34.131.10.8:3000/api/bhajanMandal/single_bhajan/${orderData.bookingDetails.mandaliId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!mandaliResponse.ok) throw new Error(`Mandali fetch error: ${mandaliResponse.status}`);
            const mandaliData = await mandaliResponse.json();
            setMandaliData(mandaliData.data);
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (id && token) {  // Ensure id and token are available
        fetchData();
    }
}, [id, token]);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product_amount * item.quantity, 0)
  }

  const calculateShipping = () => {
    return 4.99
  }

  const calculateTax = () => {
    return 2.99
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax() - discount
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "pooja10") {
      setDiscount(calculateSubtotal() * 0.1) 
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    try {
        let updateUrl;
        let orderDetails;
        const orderType = orderData?.bookingDetails?.Type || "N/A";

        if (orderType === "Pooja") {
            updateUrl = "http://34.131.10.8:3000/api/orders/update-order";
            orderDetails = {
                bookingId: id,
                userLat: deliveryAddress?.DeliveryAddress?.Latitude,
                userLong: deliveryAddress?.DeliveryAddress?.Longitude,
                transactionId: "09178297877022097098273169379879",
                transactionStatus: "Successful",
                transactionDate: new Date().toISOString(),
            };
        } else if (orderType === "Bhajan Mandali") {
            updateUrl = "http://34.131.10.8:3000/api/order/update-mandali-order";
            orderDetails = {
                bookingId: id,
                fcm_tokken: MandaliData.bhajan_owner?.fcm_tokken,
                userLat: deliveryAddress?.DeliveryAddress?.Latitude,
                userLong: deliveryAddress?.DeliveryAddress?.Longitude,
                transactionId: "09178297877022097098273169379879",
                transactionStatus: "Successful",
                transactionDate: new Date().toISOString(),
            };
        } else {
            throw new Error("Unknown order type");
        }

        const response = await fetch(updateUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderDetails),
        });

        if (response.ok) {
            toast.success("Order confirmed successfully!", {
                autoClose: 1000, 
            });
            setTimeout(() => {
                navigate(`/order-receipt/${orderDetails.bookingId}`);
            }, 1500);
        } else {
            toast.error("Failed to update order. Please try again.", {
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while updating the order.", {
            autoClose: 3000,
        });
    } finally {
        setIsConfirming(false);
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your sacred journey...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link href="/cart">
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">
              Return to Cart
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Special Offers Banner */}
      <ToastContainer/>
      <div className="w-full bg-orange-100 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-600" />
            <p className="text-sm">
              <span className="font-semibold">Special Offers.</span> We found offers available based on items in your
              cart.
            </p>
          </div>
          <Link href="#" className="text-orange-700 hover:underline text-sm font-medium">
            See All Deals & Offers
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Lotus className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-800">Order Preview</h1>
          </div>
          <Link href="/cart">
            <button className="flex items-center border border-orange-300 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded-md">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary - Mobile First */}
          <div className="lg:hidden">
            <div className="bg-white border border-orange-200 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-orange-50 border-b border-orange-100 p-4">
                <h2 className="text-center text-orange-800 font-semibold">Order Summary</h2>
              </div>
              <div className="p-0">
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
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                          In Stock
                        </span>
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
                    {/* Subtotal */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                      <span>
                        {currencySymbol}
                        {calculateSubtotal().toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span>
                        {currencySymbol}
                        {calculateShipping().toFixed(2)}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span>
                        {currencySymbol}
                        {calculateTax().toFixed(2)}
                      </span>
                    </div>

                    {/* Discount (if promo applied) */}
                    {promoApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          Promo Code Applied:
                        </span>
                        <span>
                          -{currencySymbol}
                          {discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="my-2 h-px bg-orange-100"></div>

                    {/* Total */}
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-orange-800">Total:</span>
                      <span className="text-orange-800">
                        {currencySymbol}
                        {calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    {/* Promo Code Input */}
                    <div className="pt-3">
                      <div className="flex items-center space-x-2">
                        <input
                          placeholder="Enter Promo code here..."
                          className="w-full p-2 border border-orange-200 rounded-md focus:border-orange-400"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                        />
                        <button
                          className="p-2 border border-orange-200 text-orange-700 hover:bg-orange-100 rounded-md"
                          onClick={handleApplyPromo}
                          disabled={promoApplied}
                        >
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Promo code "POOJA10" applied successfully!
                        </p>
                      )}
                    </div>

                    {/* Payment Method Section */}
                    <div className="mt-4 space-y-3">
                      <h3 className="text-lg font-semibold text-orange-800">Payment Method</h3>
                      <div className="space-y-2">
                        {/* Online Payment Option */}
                        <div className="flex items-center space-x-2 border border-orange-200 p-3 rounded-md hover:bg-orange-50">
                          <input
                            type="radio"
                            id="online"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={() => setPaymentMethod("online")}
                            className="text-orange-600"
                          />
                          <label htmlFor="online" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                            Online Payment
                          </label>
                        </div>

                        {/* Cash on Delivery Option */}
                        <div className="flex items-center space-x-2 border border-orange-200 p-3 rounded-md hover:bg-orange-50">
                          <input
                            type="radio"
                            id="cash"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                            className="text-orange-600"
                          />
                          <label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                            <Banknote className="h-5 w-5 text-orange-600" />
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Order Button */}
                    <button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-4"
                      onClick={handleConfirmOrder}
                      disabled={isConfirming}
                    >
                      {isConfirming ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
          <OrderDetails previewData={orderData} deliveryAddress={deliveryAddress} />
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-white border border-orange-200 rounded-lg shadow-md overflow-hidden">
                <div className="bg-orange-50 border-b border-orange-100 p-4">
                  <h2 className="text-center text-orange-800 font-semibold">Order Summary</h2>
                </div>
                <div className="p-0">
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
                          <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                            In Stock
                          </span>
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

                    {promoApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          Promo Code Applied:
                        </span>
                        <span>
                          -{currencySymbol}
                          {discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="my-2 h-px bg-orange-100"></div>

                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-orange-800">Total:</span>
                      <span className="text-orange-800">
                        {currencySymbol}
                        {calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-3">
                      <div className="flex items-center space-x-2">
                        <input
                          placeholder="Enter Promo code here..."
                          className="w-full p-2 border border-orange-200 rounded-md focus:border-orange-400"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                        />
                        <button
                          className="p-2 border border-orange-200 text-orange-700 hover:bg-orange-100 rounded-md"
                          onClick={handleApplyPromo}
                          disabled={promoApplied}
                        >
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Promo code "POOJA10" applied successfully!
                        </p>
                      )}
                    </div>

                    {/* Payment Section */}
                    <div className="mt-4 space-y-3">
                      <h3 className="text-lg font-semibold text-orange-800">Payment Method</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 border border-orange-200 p-3 rounded-md hover:bg-orange-50">
                          <input
                            type="radio"
                            id="online"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={() => setPaymentMethod("online")}
                            className="text-orange-600"
                          />
                          <label htmlFor="online" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                            Online Payment
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border border-orange-200 p-3 rounded-md hover:bg-orange-50">
                          <input
                            type="radio"
                            id="cash"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                            className="text-orange-600"
                          />
                          <label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                            <Banknote className="h-5 w-5 text-orange-600" />
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md mt-4"
                      onClick={handleConfirmOrder}
                      disabled={isConfirming}
                    >
                      {isConfirming ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}