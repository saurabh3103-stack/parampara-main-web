import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, NotebookIcon as Lotus, Info, Calendar, Clock } from "lucide-react";
import UserOrderDetails from "./UserOrderDetails";
import { fetchUserAndCartDetails } from './CartFetch';

// Mock fetchUserAndCartDetails function - in a real app this would be an actual API call


export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOffersChecked, setIsOffersChecked] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditcard");
  const currencySymbol = "₹";

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aptSuite: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    specialNotes: "",
    promoCode: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
const fetchData = async () => {
    try {
        const { cart, error } = await fetchUserAndCartDetails();
        if (error) {
            console.error("Error:", error);
            setError("Failed to fetch cart data");
        } else {
            setCartItems(cart); // Set fetched cart data
        }
    } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch cart data");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchData(); // Fetch cart data when component mounts
}, []);
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
  return (
    <div className="min-h-screen bg-white">
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
            <Lotus className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-800">Checkout</h1>
          </div>
          <Link to="/cart">
            <button className="border border-orange-300 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Cart
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary (Top on mobile, right on desktop) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-4 space-y-6">
              <div className="border border-orange-200 shadow-md rounded-lg overflow-hidden">
                <div className="bg-orange-50 border-b border-orange-100 p-4">
                  <h2 className="text-center text-orange-800 font-medium">Order Summary</h2>
                </div>
                <div className="p-0">
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-4 border-b border-orange-100">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 relative rounded overflow-hidden border border-orange-200">
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-orange-800">{item.product_name}</h3>
                          <div className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs inline-block">
                            In Stock
                          </div>
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
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Saving/Promo Code:</span>
                      <span>-</span>
                    </div>

                    <div className="my-2 bg-orange-100 h-px"></div>

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
                          className="border border-orange-200 rounded px-3 py-2 focus:border-orange-400 w-full"
                          value={formData.promoCode}
                          onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                        />
                        <button className="border border-orange-200 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-orange-600" />
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

          {/* Checkout Form (Bottom on mobile, left on desktop) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
          <UserOrderDetails cartItems={cartItems} currencySymbol={currencySymbol} />
          </div>
        </div>
      </div>
    </div>
  );
}