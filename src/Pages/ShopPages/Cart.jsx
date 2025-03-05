import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchUserAndCartDetails } from './CartFetch';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currencySymbol = "₹";
  const imgUrl = 'http://localhost:3000';
  const fetchData = async () => {
    try {
      const { cart, error } = await fetchUserAndCartDetails();
      if (error) {
        console.error("Error:", error);
        setError("Failed to fetch cart data");
      } else {
        setCartItems(cart); // Set the fetched cart data into state
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
    setCartItems(cartItems.filter(item => item._id !== itemId));
  };

  return (
    <>
      <div className="mx-auto">
        <div id="cartdiv">
          <div className="w-full bg-sky-100">
            <p className="mx-auto w-full px-4 py-4 text-sm sm:w-full sm:px-6 xl:max-w-7xl">
              <span className="font-semibold">Special Offers.</span> We found offers available based on items in your cart.
              <span><a className="text-sky-800 hover:underline ml-2" href="#">See All Deals &amp; Offers</a></span>
            </p>
          </div>
          <div className="mx-auto mt-8 w-full px-4 sm:w-full sm:px-6 xl:max-w-7xl">
            <div className="flex flex-wrap space-y-16 lg:flex-row lg:flex-nowrap lg:space-y-0 lg:space-x-6">
              <div className="w-full lg:w-2/3">
                <div className="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                  <p>Your Cart</p>
                  <p>
                    <Link to={"./"}>
                      <span className="hover:underline">Continue Shopping</span>
                    </Link>
                  </p>
                </div>
                {/* <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm"> */}
                  {loading ? (
                    <p>Loading cart...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <>
                        {cartItems.map((item) => (
                          <>
                        <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                          <div className="space-y-3">
                          <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="float-inline-end text-red-500 hover:text-red-700" style={{float:"inline-end",top:"-22px",position:"relative"}}>
                              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                            </button>
                          <div key={item._id} className="flex flex-col space-y-3 sm:flex-row md:space-x-8 lg:flex-nowrap lg:space-x-3">
                            <div className="flex flex-col space-y-3 lg:w-1/2 lg:items-center lg:space-x-0 xl:flex-row xl:items-start xl:space-y-0">
                              <div className="mx-auto flex w-full sm:w-1/2 sm:justify-center lg:items-start lg:justify-start xl:w-1/3">
                                <img
                                  className="h-24 w-24 rounded border-2 border-gray-400 object-cover"
                                  src={imgUrl+item.product_image}
                                  alt=""
                                />
                              </div>
                              <div className="w-full space-y-2 xl:w-2/3">
                                <p>
                                  <a className="text-sky-600 hover:underline" href="./shop-product.html">{item.product_name}</a>
                                </p>
                                <p className="font-semibold text-green-600">In Stock</p>
                                <p><span className="font-semibold">Pooja Type:</span> {item.product_name}</p>
                                <p><span className="font-semibold">Booking Date:</span> {new Date(item.pooja_date).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Booking Time:</span> {item.pooja_time}</p>
                                
                              </div>
                            </div>
                              <div className="flex flex-wrap space-y-3 sm:flex-col sm:space-y-2 lg:w-1/2 xl:flex-row">
                                  <div className="w-full space-y-3 xl:w-2/3">
                                  <div className="flex flex-row space-x-2">
                                      <p>
                                      <input
                                          className="focus:border-primary-500 text-primary focus:ring-primary-500"
                                          type="radio"
                                          checked
                                      />
                                      </p>
                                      <div>
                                      <p>Fast Two-Day shipping <br />
                                      <span className="text-green-400">Get it by Monday, Jul 7</span> <br />
                                      When your order by 8:00 Today</p>
                                      <p><span className="font-semibold">Quantity:</span> {item.quantity}</p> 
                                      <p><span className="font-semibold">Price:</span> {currencySymbol} {item.product_amount.toFixed(2)}</p> 
                                      <p><span className="font-semibold">Total:</span> {currencySymbol} {(item.product_amount * item.quantity).toFixed(2)}</p>
                                      </div>
                                  </div>
                                  </div>
                              </div>
                            {/* "Remove" Button */}
                          </div>
                          <div class="space-y-2 sm:space-y-1">
                              <div class="pb-5 text-xs">
                                  <span class="font-semibold">NeykartCard:</span> <br />
                                  Earn a $20 statement credit when you spend $29 on eligible purchases.
                                  <span><a class="cursor-pointer text-sky-600 hover:underline" href="#">Learn more</a></span>
                              </div>
                          </div>
                            </div>
                          </div>
                          </>
                        ))}
                    </>
                  )}
                {/* </div/> */}
              </div>
              <div className="w-full sm:w-[350px] lg:w-1/3">
              <div className="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                <p></p>
                <p>
                  <button className="btn btn-red-800 text-white">
                    <span>Empty Cart</span>
                  </button>
                </p>
              </div>
              <div className="mb-8 mt-1">
                <div className="space-y-2 border border-gray-400 bg-white p-5 text-sm">
                  <h1 className="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
                  <div>
                    <form className="flex items-center space-x-2">
                      <div className="w-2/3">
                        <input
                          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 bg-gray-100 p-2 outline-none"
                          type="text"
                          placeholder="Enter Promo code here..."
                        />
                      </div>
                      <div className="w-1/3">
                        <button className="w-full rounded bg-gray-200 py-2 text-gray-600">Apply</button>
                      </div>
                    </form>
                  </div>
                  <div className="space-y-2 pt-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        Subtotal <span className="font-normal">({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span> :
                      </p>
                      <p>
                        {currencySymbol}
                        {cartItems.reduce((acc, item) => acc + item.product_amount * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Shipping:</p>
                      <p className="text-lightBlue-600 cursor-pointer text-xs hover:underline">Two-Day Delivery</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Saving/Promo Code:</p>
                      <p>-</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lightBlue-600 cursor-pointer hover:underline">Estimate Tax</p>
                      <p className="text-xs italic">See in Checkout</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-400 py-2 text-lg font-semibold">
                      <p>Total:</p>
                      <p>
                        {currencySymbol}
                        {cartItems.reduce((acc, item) => acc + item.product_amount * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Link to={'/check-out'}>
                      <div className="btn-gradient btn-full">Checkout</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
