import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const BookingReceipt = () => {  
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const currencySymbol = "₹"; 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual token

    // Fetch order details
    const fetchOrderData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch delivery address
    const fetchDeliveryAddress = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/order/delivery-address/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDeliveryAddress(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderData();
        fetchDeliveryAddress();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
        <div class="mx-auto mt-8 flex w-full flex-col flex-wrap justify-center space-x-0 px-4 sm:flex-row sm:flex-nowrap sm:justify-center sm:space-x-4 md:max-w-4xl md:space-x-10">
          <div class="mx-auto flex w-full flex-col items-center sm:w-7/12">
            <div class="mb-8 space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-left text-sm shadow-lg">
              <div class="flex flex-col justify-start space-y-2 border-b border-gray-400 pb-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <h1 class="text-left text-base font-semibold">Order Id: {id}</h1>
                <div class="cursor-pointer whitespace-nowrap text-left text-xs underline">Print Receipt</div>
              </div>
              <div>
                <p>
                  The order confirmation will be sent shortly via email to
                  <span class="font-semibold"> {orderData.userDetails.email}</span>
                </p>
              </div>
              <div>
                <div class="mt-5 flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div class="w-full sm:w-1/2">
                    <h1 class="text-left text-base font-semibold">Payment Method</h1>
                    <div class="flex flex-row space-x-4">
                      <div class="text-3xl">
                        <span><svg class="svg-inline--fa fa-cc-mastercard" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="cc-mastercard" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8 .3-.3 .5-.8 .8-1.1 .3-.6 .3-1.1 .3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"></path></svg></span>
                      </div>
                      <div>
                        <p class="text-sm">MasterCard <strong>**** 6789</strong></p>
                        <p class="text-xs text-gray-400">Expire 06/26</p>
                      </div>
                    </div>
                    <p class="pt-1 text-xs text-gray-400">
                      Total amount will be reserved on your credit cad and will be charged once order has left our
                      warehouse.
                    </p>
                  </div>
                </div>
                <div class="mt-5 flex flex-col space-y-2 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div class="w-full sm:w-1/2">
                    <h1 class="text-left text-base font-semibold">Delivery Address</h1>
                    <p class="text-sm">
                      <span class="font-semibold">Mary John Smith</span> <br/>
                      maryjohndoe@email.com <br/>
                      (123) 345-6789 <br/>
                      {deliveryAddress.DeliveryAddress.AddressLine1},{deliveryAddress.DeliveryAddress.AddressLine2} <br/>
                      {deliveryAddress.DeliveryAddress.Landmark} <br/>
                      {deliveryAddress.DeliveryAddress.City} <br/>
                      {deliveryAddress.DeliveryAddress.State}, {deliveryAddress.DeliveryAddress.Country} {deliveryAddress.DeliveryAddress.PostalCode}
                    </p>
                  </div>
                  <div class="w-full sm:w-1/2">
                    <h1 class="text-left text-base font-semibold">Booking Time</h1>
                    <p>
                      Time : {orderData.schedule.time} <br/>
                      Date : {orderData.schedule.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 hidden w-full items-center justify-between py-3 text-sm sm:flex">
              <div class="">
                <div>
                  <a class="hover:underline" href="./"><span><svg class="svg-inline--fa fa-chevron-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path></svg></span> Continue Shopping</a>
                </div>
              </div>
              <div><a class="hover:underline" href="./">Go Home</a></div>
            </div>
          </div>
          <div class="mx-auto flex w-full flex-col items-center sm:w-5/12">
            <div class="mb-8 w-full space-y-2 rounded border border-gray-400 bg-white px-3 py-5 text-sm shadow-lg">
              <h1 class="border-b border-gray-400 pb-2 text-center text-base font-semibold">Order Summary</h1>
              <div class="w-full space-y-2 pt-3">
                <div class="flex items-center justify-between">
                  <p class="font-semibold">Subtotal <span class="font-normal">(3 items)</span> :</p>
                  <p>$184.85</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="font-semibold">Shipping:</p>
                  <p class="text-xs">Two-Day Delivery</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="font-semibold">Saving/Promo Code:</p>
                  <p>-</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="">Estimated Tax</p>
                  <p class="text-xs">$19.10</p>
                </div>
                <div class="flex items-center justify-between border-t border-b border-gray-400 py-2 text-lg font-semibold">
                  <p class="">Total:</p>
                  <p>$204.85</p>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <div class="mb-8 space-y-2 rounded border border-gray-400 bg-white px-12 py-5 text-sm shadow-lg">
                <h1 class="border-b border-gray-400 pb-2 text-center text-base font-semibold">Items Ordered</h1>
                <div class="flex flex-col space-y-4 pt-3">
                  <div class="flex flex-row space-x-2 text-xs">
                    <div class="w-2/6">
                      <img class="h-24 rounded" src="./assets/img/products/fashion/men/1.jpg" alt=""/>
                    </div>
                    <div class="w-3/6 space-y-1">
                      <p>Nike Red shoes lasts release apparel for all ages</p>
                      <p class="font-semibold">$129.95</p>
                      <p class="text-gray-400">Est. delivery : Jul 7</p>
                      <p>QTY 1</p>
            
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

export default BookingReceipt;