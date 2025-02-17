import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { submitOrder,submitBhajanBooking } from './OrderPlace';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';

const UserOrderDetails = ({ cartItems, currencySymbol }) => {
  // console.log(JSON.stringify(cartItems, null, 2));
  const navigate = useNavigate();
 
  const cartUserData = JSON.stringify(cartItems, null, 2);
  const userEmail = localStorage.getItem("userEmail");

  const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isOfferChecked, setIsOfferChecked] = useState(false);
    const isSubmitEnabled = isTermsChecked && isOfferChecked;
    const [formData, setFormData] = useState({
        cartId:cartItems[0]?._id,
        userId:cartItems[0]?.user_id|| "",
        username: cartItems[0]?.username || "",
        contactNumber: cartItems[0]?.userphone || "",
        email: userEmail || "",
        streetAddress: "",
        aptSuite: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        specialNote: "",
        poojaType: cartItems[0]?.productType || "",
        poojaId: cartItems[0]?.product_id || "",    
        poojaName: cartItems[0]?.product_name || "",    
        amount: cartItems[0]?.product_amount || "",    
        quantity: cartItems[0]?.quantity || "",    
        isSamagriIncluded: cartItems[0]?.isSamagri || "",    
        date: cartItems[0]?.pooja_date || "",    
        time: cartItems[0]?.pooja_time || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCiLRwm29ghwbDc1MrJ9svjNDg-NmQFx5A", // Replace with your API key
      });
    
      const [showMap, setShowMap] = useState(false);
      const [selectedLocation, setSelectedLocation] = useState(null);
      const [currentLocation, setCurrentLocation] = useState(null);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        if (formData.poojaType === "Pooja") {
          response = await submitOrder(formData);
        } else if (formData.poojaType === "Bhajan Mandal") {
          response = await submitBhajanBooking(formData);
        } else {
          toast.error("Invalid Pooja Type!");
          return;
        }
        if (response.success) {
          toast.success("Order submitted successfully!");
          const order_id = response.orderData.poojaBooking.bookingId;
          navigate("/order-preview/" + order_id);
        } else {
          toast.error("Error: " + response.message);
        }
      };
      
      const handleMapClick = async (e) => {
        const { lat, lng } = e.latLng.toJSON();
        setSelectedLocation({ lat, lng });
        setFormData((prevState) => ({
          ...prevState,
          location: { lat, lng },
        }));
        setShowMap(false);
    
        // Reverse geocode the selected location to fill in the address fields
        const address = await getAddressFromLatLng(lat, lng);
        if (address) {
          setFormData((prevState) => ({
            ...prevState,
            streetAddress: address.street,
            aptSuite: address.suite,
            city: address.city,
            state: address.state,
            zipCode: address.zip,
            country: address.country,
          }));
        }
      };
    
      const handleMarkerDragEnd = async (e) => {
        const { latLng } = e;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setSelectedLocation({ lat, lng });
        setFormData((prevState) => ({
          ...prevState,
          location: { lat, lng },
        }));
    
        // Reverse geocode the dragged marker location
        const address = await getAddressFromLatLng(lat, lng);
        if (address) {
          setFormData((prevState) => ({
            ...prevState,
            streetAddress: address.street,
            aptSuite: address.suite,
            city: address.city,
            state: address.state,
            zipCode: address.zip,
            country: address.country,
          }));
        }
      };
    
      // Get address from latitude and longitude using Google Maps Geocoding API
      const getAddressFromLatLng = async (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);
        return new Promise((resolve, reject) => {
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              const addressComponents = results[0].address_components;
              const address = {
                street: "",
                suite: "",
                city: "",
                state: "",
                zip: "",
                country: "",
              };              
              // Extract address components
              addressComponents.forEach((component) => {
                if (component.types.includes("street_number") || component.types.includes("route")) {
                  address.street += component.long_name + " ";
                }
                if (component.types.includes("sublocality_level_1") || component.types.includes("locality")) {
                  address.city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  address.state = component.long_name;
                }
                if (component.types.includes("postal_code")) {
                  address.zip = component.long_name;
                }
                if (component.types.includes("country")) {
                  address.country = component.long_name;
                }
              });
              resolve(address);
            } else {
              reject("Unable to retrieve address.");
            }
          });
        });
      };
    
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            setSelectedLocation({ lat: latitude, lng: longitude });
          });
        }
      }, []);
      const [selectedPayment, setSelectedPayment] = useState('creditcard');
      const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
      };
    
    return (
        <>
                    <ToastContainer />

            <form className="mt-7 space--8" method="post" onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* Personal Details Section */}
                <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                    <div className="w-full space-y-6">
                        <div className="text-lg font-semibold">1. Customer details</div>
                        {/* Full Name Fields */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Full Name <span className="text-red-500">*</span></div>
                            <div className="flex w-full flex-col items-center space-x-0 space-y-4 sm:w-2/3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="w-full rounded bg-gray-100">
                                    <input
                                        className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                        type="text"
                                        name="name"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    
                        {/* Phone */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Phone <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="phone"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Email address <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                         {/* Apt/Suite */}
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Apt/Suite/building <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="aptSuite"
                                    value={formData.aptSuite}
                                    onChange={handleChange}
                                    onClick={() => setShowMap(true)}
                                />
                                </div>
                            </div>
                            {showMap && isLoaded && (
                                <div className="h-64 w-full">
                                <GoogleMap
                                    center={selectedLocation || { lat: 0, lng: 0 }}
                                    zoom={10}
                                    mapContainerClassName="h-full w-full"
                                    onClick={handleMapClick}
                                >
                                    {selectedLocation && <Marker position={selectedLocation} draggable onDragEnd={handleMarkerDragEnd} />}
                                </GoogleMap>
                                </div>
                            )}
                        {/* Street Address */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Street address <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                       
                        {/* City/Town */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">City/Town <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* State/Province */}
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                              <div className="w-full sm:w-1/3">State/Province <span className="text-red-500">*</span></div>
                              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                  <input
                                      className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                      type="text"
                                      name="state"
                                      value={formData.state}
                                      onChange={handleChange}
                                  />
                          </div>
                        </div>
                        {/* Zip Code */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Zip code <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Country */}
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full sm:w-1/3">Country <span className="text-red-500">*</span></div>
                            <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Special Notes Section */}
                <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                    <div className="w-full space-y-6">
                        <div className="text-lg font-semibold">2. Special Notes</div>
                        <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                            <div className="w-full rounded bg-gray-100 ">
                                <textarea
                                    className="focus:border-primary-500 border-gray-500 focus:ring-primary-500 block w-full rounded border-transparent  p-2.5 text-sm text-gray-900"
                                    name="specialNote"
                                    value={formData.specialNote}
                                    onChange={handleChange}
                                    rows="5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                    <div className="w-full space-y-6">
                        <div className="flex space-x-2 items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                checked={isTermsChecked}
                                onChange={() => setIsTermsChecked(!isTermsChecked)}
                            />
                            <label htmlFor="terms">I agree to the terms and conditions</label>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <input
                                type="checkbox"
                                name="offer"
                                id="offer"
                                checked={isOfferChecked}
                                onChange={() => setIsOfferChecked(!isOfferChecked)}
                            />
                            <label htmlFor="offer">I would like to receive offers and updates</label>
                        </div>
                    </div>
                </div>
                {/* Submit Button */}
                <div className="mt-3">
                    <button
                        type="submit"
                        disabled={!isSubmitEnabled}
                        className="disabled:opacity-50 w-full py-3 bg-primary text-white rounded text-sm"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserOrderDetails;
