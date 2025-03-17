import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const BookingReceipt = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const currencySymbol = "₹";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual token

    // Fetch booking details
    const fetchBookingData = async () => {
        try {
            const response = await fetch(`http://34.131.10.8:3000/api/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setBookingData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!bookingData) return <p>No data found</p>;

    return (
        <>
            <div className="mx-auto mt-8 flex w-full flex-col flex-wrap justify-center space-x-0 px-4 sm:flex-row sm:flex-nowrap sm:justify-center sm:space-x-4 md:max-w-4xl md:space-x-10">
                <div className="mx-auto flex w-full flex-col items-center sm:w-7/12">
                    <div className="mb-8 space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-left text-sm shadow-lg">
                        <div className="flex flex-col justify-start space-y-2 border-b border-gray-400 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <h1 className="text-left text-base font-semibold">Booking Id: {bookingData.bookingId}</h1>
                            <div className="cursor-pointer whitespace-nowrap text-left text-xs underline">Print Receipt</div>
                        </div>
                        <div>
                            <p>
                                The booking confirmation will be sent shortly via email to
                                <span className="font-semibold"> {bookingData.userDetails.email}</span>
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
                                        Total amount will be reserved on your credit card and will be charged once the booking is confirmed.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="w-full sm:w-1/2">
                                    <h1 className="text-left text-base font-semibold">Booking Details</h1>
                                    <p className="text-sm">
                                        <span className="font-semibold">{bookingData.bookingDetails.mandaliName}</span> <br />
                                        Type: {bookingData.bookingDetails.Type} <br />
                                        Booking Status: {bookingData.bookingStatus === 1 ? "Confirmed" : "Pending"} <br />
                                        Created At: {new Date(bookingData.createdAt).toLocaleString()} <br />
                                    </p>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <h1 className="text-left text-base font-semibold">Schedule</h1>
                                    <p>
                                        Time: {bookingData.schedule.time} <br />
                                        Date: {new Date(bookingData.schedule.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 hidden w-full items-center justify-between py-3 text-sm sm:flex">
                        <div>
                            <a className="hover:underline" href="./">
                                <span>
                                    <svg className="svg-inline--fa fa-chevron-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                                        <path fill="currentColor" d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path>
                                    </svg>
                                </span> Continue Shopping
                            </a>
                        </div>
                        <div><a className="hover:underline" href="./">Go Home</a></div>
                    </div>
                </div>
                <div className="mx-auto flex w-full flex-col items-center sm:w-5/12">
                    <div className="mb-8 w-full space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-sm shadow-lg">
                        <h1 className="border-b border-gray-400 pb-2 text-center text-base font-semibold">Booking Summary</h1>
                        <div className="w-full space-y-2 pt-3">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Subtotal <span className="font-normal">({bookingData.paymentDetails.quantity} items)</span> :</p>
                                <p>{currencySymbol}{bookingData.paymentDetails.amount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Tax:</p>
                                <p className="text-xs">{currencySymbol}0.00</p>
                            </div>
                            <div className="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                                <p className="">Total:</p>
                                <p>{currencySymbol}{bookingData.paymentDetails.amount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingReceipt;