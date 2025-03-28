import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserAndCartDetails } from "./EStoreService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, ShoppingBag, Gift, Info, Calendar, Clock } from "lucide-react";

const EStoreCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currencySymbol = "₹";
  const imgUrl = "http://34.131.41.101:3000/";

  // Fetch cart data
  const fetchData = async () => {
    try {
      const { cart, error } = await fetchUserAndCartDetails();
      if (error) {
        console.error("Error:", error);
        setError("Failed to fetch cart data");
      } else {
        setCartItems(cart || []); // Ensure cart is an array
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch cart data");
    } finally {
      setLoading(false); // Stop loading once the data is fetched
    }
  };

  useEffect(() => {
    fetchData(); // Fetch cart data when the component mounts
  }, []);

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  // Function to empty the cart
  const handleEmptyCart = () => {
    setCartItems([]);
  };

  // Calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((total, item) => total + item.product_amount * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Handle checkout
  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call or any processing
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Proceed to checkout!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate("/e-store/check-out"), // Navigate after toast closes
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-12 text-orange-300" />
            <h1 className="text-2xl font-bold text-orange-800">Your Sacred Cart</h1>
          </div>
          <Link to="/">
            <button className="border border-orange-300 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded">
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <p>Loading cart...</p>
            ) : error ? (
              <p>{error}</p>
            ) : cartItems.length === 0 ? (
              <div className="border-dashed border-2 border-orange-200 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingBag className="h-12 w-12 text-orange-300 mb-4" />
                  <p className="text-lg text-gray-600 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500 mb-6">Add items to begin your spiritual journey</p>
                  <Link to="/">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded">
                      Browse Products
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="overflow-hidden border-orange-200 shadow-md rounded-lg">
                  <div className="relative">
                    <div className="absolute top-2 right-2">
                      <button
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative h-32 w-32 mx-auto md:mx-0 rounded-lg overflow-hidden border-2 border-orange-200 bg-white">
                          <img
                            src={imgUrl + item.product_image}
                            alt={item.product_name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <Link to="#" className="text-orange-800 hover:text-orange-600 font-medium text-lg">
                              {item.product_name}
                            </Link>
                            <span className="ml-2 bg-green-50 text-green-700 border-green-200 px-2 py-1 rounded text-sm">
                              In Stock
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-orange-600" />
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Booking Date:</span>{" "}
                                  {new Date(item.pooja_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Booking Time:</span> {item.pooja_time}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col space-y-1">
                                  <p className="text-xs text-green-600">Get it by Monday, Jul 7</p>
                                  <p className="text-xs text-gray-600">When your order by 8:00 Today</p>
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1 mt-2">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Quantity:</span> {item.quantity}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Price:</span> {currencySymbol}{" "}
                                  {item.product_amount.toFixed(2)}
                                </p>
                                <p className="text-sm font-medium text-orange-800">
                                  <span className="font-medium">Total:</span> {currencySymbol}{" "}
                                  {(item.product_amount * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-orange-100">
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Parampara:</span> Earn a ₹20 statement credit when you spend
                          ₹29 on eligible purchases.
                          <Link to="#" className="text-orange-700 hover:underline ml-1">
                            Learn more
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="border-orange-200 shadow-md rounded-lg overflow-hidden">
                <div className="bg-orange-50 border-b border-orange-100 p-4">
                  <h2 className="text-center text-orange-800 font-bold">Order Summary</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Promo code here..."
                      className="border border-orange-200 focus:border-orange-400 px-3 py-2 rounded w-full"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="border border-orange-200 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded">
                      Apply
                    </button>
                  </div>

                  <hr className="bg-orange-100" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-gray-600">
                        Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):
                      </p>
                      <p className="font-medium">
                        {currencySymbol} {subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping:</p>
                      <p className="text-green-600">Two-Day Delivery</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Saving/Promo Code:</p>
                      <p>-</p>
                    </div>
                    <div className="flex justify-between">
                      <Link to="#" className="text-orange-700 hover:underline flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        <span>Estimate Tax</span>
                      </Link>
                      <p className="text-xs italic">See in Checkout</p>
                    </div>
                  </div>

                  <hr className="bg-orange-100" />

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-orange-800">Total:</p>
                    <p className="text-lg font-bold text-orange-800">
                      {currencySymbol} {total.toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded"
                    onClick={handleCheckout}
                    type="submit"
                    disabled={cartItems.length === 0 || isLoading}
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </button>

                  <button
                    className="w-full border border-orange-200 text-orange-700 hover:bg-orange-100 px-6 py-2 rounded"
                    onClick={handleEmptyCart}
                    disabled={cartItems.length === 0}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>

              <div className="border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <img src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
                  <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
                  <img src="/placeholder.svg?height=30&width=40" alt="PayPal" width={40} height={30} />
                  <img src="/placeholder.svg?height=30&width=40" alt="RuPay" width={40} height={30} />
                  <img src="/placeholder.svg?height=30&width=40" alt="UPI" width={40} height={30} />
                </div>
                <p className="text-center text-xs text-gray-500 mt-3">Guarantee Safe and Secure Payment Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EStoreCart;