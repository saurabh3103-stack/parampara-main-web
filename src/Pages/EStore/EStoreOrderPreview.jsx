import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "lucide-react";
import EStoreOrderDetails from "./EStoreOrderDetails";

const EStoreOrderPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const currencySymbol = "₹";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch order and delivery address simultaneously
      const [orderResponse, addressResponse] = await Promise.all([
        fetch(`http://34.131.10.8:3000/api/e-store/orders/${id}`, {
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
      console.log(orderData.order.orderDetails);
      // Update state
      setCartItems(orderData.order.orderDetails);
      setOrderData(orderData);
      setDeliveryAddress(addressData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    try {
      const combinedPaymentId = orderData?.order?.combinedPaymentId;
      if (!combinedPaymentId) throw new Error("Combined Payment ID not found");

      const updateUrl = `http://34.131.10.8:3000/api/e-store/update-order/${combinedPaymentId}`;
      const orderDetails = {
        transactionId: "TXN123456",
        transactionStatus: "completed",
        transactionDate: new Date().toISOString(),
      };

      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        toast.success("Order confirmed successfully!", { autoClose: 1000 });
        setTimeout(() => {
          navigate(`/e-store/order-receipt/${id}`);
        }, 1500);
      } else {
        toast.error("Failed to update order. Please try again.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the order.", { autoClose: 3000 });
    } finally {
      setIsConfirming(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.amount * item.quantity, 0);
  };

  const calculateShipping = () => 4.99;
  const calculateTax = () => 2.99;
  const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax() - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "pooja10") {
      setDiscount(calculateSubtotal() * 0.1); // Apply 10% discount
      setPromoApplied(true);
      toast.success("Coupon applied successfully!", { autoClose: 1000 });
    } else {
      toast.error("Invalid coupon code", { autoClose: 1000 });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <ToastContainer />
      <div className="w-full bg-orange-100 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-600" />
            <p className="text-sm">
              <span className="font-semibold">Special Offers.</span> We found offers available based on items in your cart.
            </p>
          </div>
          <Link to="#" className="text-orange-700 hover:underline text-sm font-medium">
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
          <Link to="/cart">
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
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                          In Stock
                        </span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">Qty: {item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">Shipping: 2 Days</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
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
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Subtotal <span className="font-normal">({cartItems.length} items)</span>:</p>
                    <p>{currencySymbol}{calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Shipping:</p>
                    <p>{currencySymbol}{calculateShipping().toFixed(2)}</p>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Discount:</p>
                      <p className="text-green-600">-{currencySymbol}{discount.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Tax:</p>
                    <p>{currencySymbol}{calculateTax().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                    <p>Total:</p>
                    <p>{currencySymbol}{calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
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
                  <button
                    className="w-full rounded bg-green-800 py-2 text-white"
                    onClick={handleConfirmOrder}
                    disabled={isConfirming}
                  >
                    {isConfirming ? "Confirming..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <EStoreOrderDetails previewData={orderData} deliveryAddress={deliveryAddress} />
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
                          <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                            In Stock
                          </span>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs">Qty: {item.quantity}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs">Shipping: 2 Days</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
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
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Subtotal <span className="font-normal">({cartItems.length} items)</span>:</p>
                      <p>{currencySymbol}{calculateSubtotal().toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Shipping:</p>
                      <p>{currencySymbol}{calculateShipping().toFixed(2)}</p>
                    </div>
                    {promoApplied && (
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Discount:</p>
                        <p className="text-green-600">-{currencySymbol}{discount.toFixed(2)}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Tax:</p>
                      <p>{currencySymbol}{calculateTax().toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                      <p>Total:</p>
                      <p>{currencySymbol}{calculateTotal().toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
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
                    <button
                        className="w-full rounded bg-green-800 py-2 text-white hover:bg-green-900 transition-colors duration-200"
                        onClick={handleConfirmOrder}
                        disabled={isConfirming}
                        >
                        {isConfirming ? (
                            <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Confirming...
                            </div>
                        ) : (
                            "Confirm Order"
                        )}
                        </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EStoreOrderPreview;