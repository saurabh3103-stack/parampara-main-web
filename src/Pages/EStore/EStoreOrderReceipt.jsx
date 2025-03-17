import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const EStoreOrderReceipt = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const currencySymbol = "₹";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual token

    // Fetch order and delivery address details
    const fetchOrderData = async () => {
        try {
            const [orderResponse, addressResponse] = await Promise.all([
                fetch(`http://34.131.10.8:3000/api/e-store/orders/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }),
                fetch(`http://34.131.10.8:3000/api/order/delivery-address/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }),
            ]);

            if (!orderResponse.ok) throw new Error(`Order fetch error: ${orderResponse.status}`);
            const orderData = await orderResponse.json();

            if (!addressResponse.ok) throw new Error(`Address fetch error: ${addressResponse.status}`);
            const addressData = await addressResponse.json();

            setOrderData(orderData.order);
            setDeliveryAddress(addressData.DeliveryAddress);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!orderData) return <p>No data found</p>;

    return (
        <>
            <div className="mx-auto mt-8 flex w-full flex-col flex-wrap justify-center space-x-0 px-4 sm:flex-row sm:flex-nowrap sm:justify-center sm:space-x-4 md:max-w-4xl md:space-x-10">
                <div className="mx-auto flex w-full flex-col items-center sm:w-7/12">
                    <div className="mb-8 space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-left text-sm shadow-lg">
                        <div className="flex flex-col justify-start space-y-2 border-b border-gray-400 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <h1 className="text-left text-base font-semibold">Order Id: {orderData.orderId}</h1>
                            <div className="cursor-pointer whitespace-nowrap text-left text-xs underline">Print Receipt</div>
                        </div>
                        <div>
                            <p>
                                The order confirmation will be sent shortly via email to
                                <span className="font-semibold"> {orderData.userDetails.email}</span>
                            </p>
                        </div>
                        <div>
                            <div className="mt-5 flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="w-full sm:w-1/2">
                                    <h1 className="text-left text-base font-semibold">Payment Method</h1>
                                    <div className="flex flex-row space-x-4">
                                        <div className="text-3xl">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm">MasterCard <strong>**** 6789</strong></p>
                                            <p className="text-xs text-gray-400">Expire 06/26</p>
                                        </div>
                                    </div>
                                    <p className="pt-1 text-xs text-gray-400">
                                        Total amount will be reserved on your credit card and will be charged once the order is confirmed.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="w-full sm:w-1/2">
                                    <h1 className="text-left text-base font-semibold">Order Details</h1>
                                    <p className="text-sm">
                                        <span className="font-semibold">Order Status:</span> {orderData.orderStatus === 1 ? "Confirmed" : "Pending"} <br />
                                        <span className="font-semibold">Created At:</span> {new Date(orderData.createdAt).toLocaleString()} <br />
                                    </p>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <h1 className="text-left text-base font-semibold">Delivery Address</h1>
                                    <p className="text-sm">
                                        {deliveryAddress?.addressLine1}, {deliveryAddress?.addressLine2} <br />
                                        {deliveryAddress?.city}, {deliveryAddress?.state} <br />
                                        {deliveryAddress?.postalCode}, {deliveryAddress?.country} <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mx-auto flex w-full flex-col items-center sm:w-5/12">
                    <div className="mb-8 w-full space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-sm shadow-lg">
                        <h1 className="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
                        <div className="w-full space-y-2 pt-3">
                            {orderData.orderDetails.map((item) => (
                                <div key={item.productId} className="flex items-center justify-between">
                                    <p className="font-semibold">{item.productName} (x{item.quantity})</p>
                                    <p>{currencySymbol}{item.amount * item.quantity}</p>
                                </div>
                            ))}
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Subtotal:</p>
                                <p>{currencySymbol}{orderData.paymentDetails.totalAmount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Tax:</p>
                                <p className="text-xs">{currencySymbol}0.00</p>
                            </div>
                            <div className="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                                <p className="">Total:</p>
                                <p>{currencySymbol}{orderData.paymentDetails.totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EStoreOrderReceipt;