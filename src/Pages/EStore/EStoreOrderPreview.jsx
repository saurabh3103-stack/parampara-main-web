import React, { useEffect, useState } from "react";
import { fetchUserAndCartDetails } from "./EStoreService";
import { useParams, useNavigate } from "react-router-dom";
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
        if (id && token) {  // Ensure id and token are available
            fetchData();
        }
    }, [id, token]);

    const handleConfirmOrder = async () => {
        setIsConfirming(true);
        try {
            // Safely access combinedPaymentId using optional chaining
            const combinedPaymentId = orderData?.order?.combinedPaymentId;
            if (!combinedPaymentId) throw new Error("Combined Payment ID not found");

            const updateUrl = `http://34.131.10.8:3000/api/e-store/update-order/${combinedPaymentId}`; // Use the order ID in the URL
            const orderDetails = {
                transactionId: "TXN123456", // Replace with actual transaction ID if available
                transactionStatus: "completed", // Replace with actual transaction status if available
                transactionDate: new Date().toISOString(), // Use current date or actual transaction date
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
                console.log('Order updated successfully');
                // Navigate to the order receipt page or show a success message
                navigate(`/e-store/order-receipt/${id}`);
            } else {
                alert("Failed to update order.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the order.");
        } finally {
            setIsConfirming(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.amount * item.quantity, 0);
    };

    const calculateShipping = () => 4.99;
    const calculateTax = () => 2.99;
    const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax();

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
                                    <p>Order Preview</p>
                                    <p>
                                        <a href="./">
                                            <span style={{ fontSize: ".9rem", marginRight: ".1rem" }}>
                                                <i className="fas fa-chevron-left"></i>
                                            </span>
                                            <span className="hover:underline">Continue Shopping</span>
                                        </a>
                                    </p>
                                </div>
                                <EStoreOrderDetails previewData={orderData} deliveryAddress={deliveryAddress} />
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
                                                        src="./assets/img/products/fashion/shoes/3.jpg"
                                                        alt="Image Error"
                                                    />
                                                </div>
                                                <div className="w-3/4 space-y-1">
                                                    <p>{item.product_name}</p>
                                                    <p className="font-semibold text-green-600">In Stock</p>
                                                    <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">Shipping:</p>
                                                        <p className="text-lightBlue-600 cursor-pointer text-xs hover:underline">Two-Day Delivery</p>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-between">
                                                        <div><span className="font-semibold"></span> </div>
                                                        <div>{currencySymbol}{item.amount}</div>
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
                                            <div className="w-100">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EStoreOrderPreview;