import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { submitOrder, submitBhajanBooking } from './OrderPlace';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowLeft, Gift, MapPin, CreditCard, NotebookIcon as Lotus, Info, Calendar, Clock } from "lucide-react";

const UserOrderDetails = ({ cartItems = [], currencySymbol }) => {
  const navigate = useNavigate();
  const cartUserData = JSON.stringify(cartItems, null, 2);
  const userEmail = localStorage.getItem("userEmail");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOffersChecked, setIsOffersChecked] = useState(false);
  console.log(cartItems['0']);
  const [formData, setFormData] = useState({
    cartId: cartItems[0]?._id,
    userId: cartItems[0]?.user_id || "",
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
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    if (cartItems.length > 0) {
      setFormData((prev) => ({
        ...prev,
        cartId: cartItems[0]?._id || "",
        userId: cartItems[0]?.user_id || "",
        username: cartItems[0]?.username || "",
        contactNumber: cartItems[0]?.userphone || "",
        poojaType: cartItems[0]?.productType || "",
        poojaId: cartItems[0]?.product_id || "",
        poojaName: cartItems[0]?.product_name || "",
        amount: cartItems[0]?.product_amount || "",
        quantity: cartItems[0]?.quantity || "",
        isSamagriIncluded: cartItems[0]?.isSamagri || "",
        date: cartItems[0]?.pooja_date || "",
        time: cartItems[0]?.pooja_time || "",
      }));
    }
  }, [cartItems]); 

  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiLRwm29ghwbDc1MrJ9svjNDg-NmQFx5A", // Replace with your API key
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (formData.poojaType === "Pooja") {
      response = await submitOrder(formData);
      console.log("Pooja Response:", response); // Debugging
      if (response && response.orderData && response.orderData.poojaBooking) {
        toast.success("Order place successfully!");
        navigate("/order-preview/" + response.orderData.poojaBooking.bookingId);
      } else {
        toast.error("Failed to submit order. Please try again.");
      }
    } else if (formData.poojaType === "Bhajan Mandali") {
      response = await submitBhajanBooking(formData);
      console.log("Bhajan Response:", response); // Debugging
      if (response && response.orderData && response.orderData.bhajanbooking) {
        toast.success("Order submitted successfully!");
        // navigate("/order-preview/" + response.orderData.bhajanbooking.bookingId);
      } else {
        toast.error("Failed to submit order. Please try again.");
      }
    } else {
      toast.error("Invalid Pooja Type!");
      return;
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latLng.toJSON();
    setSelectedLocation({ lat, lng });
    setFormData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
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
      latitude: lat,
      longitude: lng,
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

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
          <div className="bg-orange-50 border-b border-orange-100 p-4">
            <h2 className="text-orange-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
                1
              </span>
              Customer Details
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-orange-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-orange-800">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-orange-800">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
          <div className="bg-orange-50 border-b border-orange-100 p-4">
            <h2 className="text-orange-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
                2
              </span>
              Shipping Address
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-orange-600" />
              <p className="text-sm text-orange-800">Where should we deliver your sacred items?</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="aptSuite" className="text-orange-800">
                Apt/Suite/Building <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="aptSuite"
                  name="aptSuite"
                  value={formData.aptSuite}
                  onChange={handleChange}
                  onClick={() => setShowMap(true)} // Show map when input is clicked
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400 pr-10"
                  required
                />
                {/* Map Pin Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)} // Toggle map visibility
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  <MapPin className="h-5 w-5 text-orange-600" />
                </button>
              </div>
            </div>

            {showMap && isLoaded && (
              <div className="mt-4">
                <GoogleMap
                  mapContainerStyle={{ height: "300px", width: "100%" }}
                  zoom={15}
                  center={currentLocation || { lat: 0, lng: 0 }}
                  onClick={handleMapClick}
                >
                  {selectedLocation && (
                    <Marker
                      position={selectedLocation}
                      draggable={true}
                      onDragEnd={handleMarkerDragEnd}
                    />
                  )}
                </GoogleMap>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="streetAddress" className="text-orange-800">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-orange-800">
                  City/Town <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="text-orange-800">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="zipCode" className="text-orange-800">
                  Zip/Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-orange-800">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes */}
        <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
          <div className="bg-orange-50 border-b border-orange-100 p-4">
            <h2 className="text-orange-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
                3
              </span>
              Special Notes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <textarea
                id="specialNotes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleChange}
                className="w-full form-control border-orange-200 focus:border-orange-400 min-h-[100px]"
                placeholder="Any special requirements for your pooja..."
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 border-orange-200 shadow-sm">
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
                className="text-orange-600 border-orange-300"
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                I agree to the{" "}
                <Link to="#" className="text-orange-600 hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="offers"
                checked={isOffersChecked}
                onChange={(e) => setIsOffersChecked(e.target.checked)}
                className="text-orange-600 border-orange-300"
              />
              <label htmlFor="offers" className="text-sm cursor-pointer">
                I would like to receive offers and updates
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 text-lg"
          disabled={!isTermsChecked}
        >
          Place Order
        </button>
      </form>
    </>
  );
};

export default UserOrderDetails;