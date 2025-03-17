import React, { useEffect, useState } from "react";
import { fetchUserAndCartDetails } from './EStoreService';
import EStoeUserOrderDetails from "./EStoeUserOrderDetails";

const EStoreCheckOut = () => {
    const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currencySymbol = "₹"; // Currency symbol
    const imgUrl = 'http://34.131.10.8:3000';
    // Fetch cart data
    const fetchData = async () => {
        try {
            const { cart, error } = await fetchUserAndCartDetails();
            if (error) {
                console.error("Error:", error);
                setError("Failed to fetch cart data");
                setCartItems([]); // Ensure cartItems is an empty array
            } else {
                setCartItems(cart || []); // Set fetched cart data or default to empty array
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to fetch cart data");
            setCartItems([]); // Ensure cartItems is an empty array
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(); // Fetch cart data when component mounts
    }, []);
    // Handle loading and errors
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate subtotal, shipping, and total dynamically
    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.product_amount || 0) * (item.quantity || 1), 0);
    };

    const calculateShipping = () => {
        // Assuming shipping is a fixed cost, otherwise modify as needed
        return 4.99;
    };

    const calculateTax = () => {
        // Assuming tax is a fixed amount, otherwise modify as needed
        return 2.99;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() + calculateTax();
    };

    return (
        <>
            <div className="mx-auto">
                <div id="cartdiv">
                    <div className="w-full bg-sky-100">
                        <p className="mx-auto w-full px-4 py-4 text-sm sm:w-full sm:px-6 xl:max-w-7xl">
                            <span className="font-semibold">Special Offers.</span> We found offers available based on items in your cart.
                            <span><a className="text-sky-800 hover:underline" href="#">See All Deals &amp; Offers</a></span>
                        </p>
                    </div>
                    <div className="mx-auto mt-8 w-full px-4 sm:w-full sm:px-6 xl:max-w-7xl">
                        <div className="flex flex-wrap space-y-16 lg:flex-row lg:flex-nowrap lg:space-y-0 lg:space-x-6">
                            {/* Left Column - UserOrderDetails */}
                            <div className="w-full lg:w-2/3">
                                <div className="flex flex-auto flex-row items-center justify-between text-base font-semibold sm:text-xl">
                                    <p>Checkout</p>
                                    <p>
                                        <a href="./">
                                            <span style={{ fontSize: ".9rem", marginRight: ".1rem" }}>
                                                <i className="fas fa-chevron-left"></i>
                                            </span>
                                            <span className="hover:underline">Continue Shopping</span>
                                        </a>
                                    </p>
                                </div>
                                <EStoeUserOrderDetails cartItems={cartItems} currencySymbol={currencySymbol} />
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="w-full sm:w-[350px] lg:w-1/3 lg:ml-6">
                                <div className="mt-10">
                                    <div className="space-y-2 border border-gray-400 bg-white p-5 text-sm">
                                        <h1 className="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
                                        {cartItems.map((item) => (
                                            <div key={item.product_id} className="flex flex-row space-x-4">
                                                <div className="w-1/4 rounded">
                                                    <img
                                                        className="border-primary w-full border-2"
                                                        src={imgUrl + item.product_image}
                                                        alt="Image Error"
                                                    />
                                                </div>
                                                <div className="w-3/4 space-y-1">
                                                    <p>{item.product_name}</p>
                                                    <p className="font-semibold text-green-600">In Stock</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">Shipping:</p>
                                                        <p className="text-lightBlue-600 cursor-pointer text-xs hover:underline">Two-Day Delivery</p>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-between">
                                                        <div><span className="font-semibold"></span> </div>
                                                        <div>{currencySymbol}{item.product_amount}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="space-y-2 pt-3">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">Subtotal <span className="font-normal">({cartItems.length} items)</span> :</p>
                                                <p>{currencySymbol}{calculateSubtotal().toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">Shipping:</p>
                                                <p>{currencySymbol}{calculateShipping().toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">Saving/Promo Code:</p>
                                                <p>-</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-lightBlue-600 cursor-pointer hover:underline">Estimate Tax</p>
                                                <p>{currencySymbol}{calculateTax().toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                                                <p className="">Total:</p>
                                                <p>{currencySymbol}{calculateTotal().toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <form className="flex items-center space-x-2">
                                                <div className="w-2/3">
                                                    <input
                                                        className="focus:ring-primary focus:border-primary w-full rounded border border-gray-400 bg-gray-100 p-2 outline-none focus:outline-none focus:ring-1"
                                                        type="text"
                                                        id="checkout-promo-code"
                                                        placeholder="Enter Promo code here..."
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <button className="w-full rounded bg-gray-200 py-2 text-gray-600">Apply</button>
                                                </div>
                                            </form>
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
};

export default EStoreCheckOut;