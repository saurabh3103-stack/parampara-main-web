import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserAndCartDetails } from "./EStoreService";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft, Gift, NotebookIcon as Lotus,Info } from "lucide-react";
import EStoeUserOrderDetails from "./EStoeUserOrderDetails";

const EStoreCheckout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOffersChecked, setIsOffersChecked] = useState(false);
  const currencySymbol = "₹";

  // Form state
  const [formData, setFormData] = useState({
    cartId: "",
    userId: "",
    username: "",
    contactNumber: "",
    email: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    specialNote: "",
    poojaType: "",
    products: [],
  });

  // Fetch cart data
  const fetchData = async () => {
    try {
      const { cart, error } = await fetchUserAndCartDetails();
      if (error) {
        setError("Failed to fetch cart data");
      } else {
        setCartItems(cart || []);
        if (cart.length > 0) {
          setFormData((prev) => ({
            ...prev,
            cartId: cart[0]._id,
            userId: cart[0].user_id,
            username: cart[0].username,
            contactNumber: cart[0].userphone,
            email: localStorage.getItem("userEmail") || "",
            poojaType: cart[0].productType,
            products: cart.map((item) => ({
              product_id: item.product_id,
              product_name: item.product_name,
              amount: item.product_amount,
              quantity: item.quantity,
            })),
          }));
        }
      }
    } catch (error) {
      setError("Failed to fetch cart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate order totals
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product_amount * item.quantity, 0);
  };

  const calculateShipping = () => 4.99;
  const calculateTax = () => 2.99;
  const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            <EStoeUserOrderDetails
              formData={formData}
              setFormData={setFormData}
              cartItems={cartItems}
              isTermsChecked={isTermsChecked}
              setIsTermsChecked={setIsTermsChecked}
              isOffersChecked={isOffersChecked}
              setIsOffersChecked={setIsOffersChecked}
              calculateSubtotal={calculateSubtotal}
              calculateShipping={calculateShipping}
              calculateTax={calculateTax}
              calculateTotal={calculateTotal}
              currencySymbol={currencySymbol}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EStoreCheckout;