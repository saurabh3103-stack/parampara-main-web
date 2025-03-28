import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { submitOrder, submitBhajanBooking } from './OrderPlace';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowLeft, Gift, MapPin, CreditCard, NotebookIcon as Lotus, Info, Calendar, Clock } from "lucide-react";

const UserOrderDetails = ({ cartItems = [], currencySymbol }) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const userEmail = localStorage.getItem("userEmail");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOffersChecked, setIsOffersChecked] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

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

  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsvrX6D9H25sj_3k3ZVcaOVy2F0L3TodY",
    libraries: ["places", "geocoding"]
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
      if (response?.orderData?.poojaBooking) {
        toast.success("Order placed successfully!");
        navigate("/order-preview/" + response.orderData.poojaBooking.bookingId);
      } else {
        toast.error("Failed to submit order. Please try again.");
      }
    } else if (formData.poojaType === "Bhajan Mandali") {
      response = await submitBhajanBooking(formData);
      if (response?.orderData?.bhajanbooking) {
        toast.success("Order submitted successfully!");
        navigate("/order-preview/" + response.orderData.bhajanbooking.bookingId);
      } else {
        toast.error("Failed to submit order. Please try again.");
      }
    } else {
      toast.error("Invalid Pooja Type!");
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latLng.toJSON();
    await updateLocation(lat, lng);
  };

  const handleMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    await updateLocation(lat, lng);
  };

  const updateLocation = async (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));

    try {
      setAddressLoading(true);
      const address = await getAddressFromLatLng(lat, lng);
      if (address) {
        setFormData(prev => ({
          ...prev,
          streetAddress: address.street,
          aptSuite: address.suite,
          city: address.city,
          state: address.state,
          zipCode: address.zip,
          country: address.country,
        }));
      }
    } catch (error) {
      toast.error("Could not fetch address details");
    } finally {
      setAddressLoading(false);
    }
  };

  const getAddressFromLatLng = async (lat, lng) => {
    return new Promise((resolve) => {
      if (!window.google) return resolve(null);
      
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(lat, lng);
      
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = parseAddressComponents(results[0].address_components);
          resolve(address);
        } else {
          resolve(null);
        }
      });
    });
  };

  const parseAddressComponents = (components) => {
    const address = {
      street: "",
      suite: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    };

    components.forEach(component => {
      if (component.types.includes("street_number")) {
        address.street = component.long_name;
      }
      if (component.types.includes("route")) {
        address.street += ` ${component.long_name}`;
      }
      if (component.types.includes("sublocality")) {
        address.suite = component.long_name;
      }
      if (component.types.includes("locality")) {
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

    return address;
  };

  const handleGetCurrentLocation = () => {
    setMapLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setSelectedLocation({ lat: latitude, lng: longitude });
          await updateLocation(latitude, longitude);
          setMapLoading(false);
        },
        (error) => {
          toast.error("Could not get your location. Please enable location services.");
          setMapLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setMapLoading(false);
    }
  };

  const toggleMap = () => {
    if (!showMap && !selectedLocation) {
      handleGetCurrentLocation();
    }
    setShowMap(!showMap);
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
    if (selectedLocation) {
      map.panTo(selectedLocation);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} method="post">
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
                  id="contactNumber"
                  name="contactNumber"
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
                  className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={toggleMap}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  disabled={mapLoading}
                >
                  {mapLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                  ) : (
                    <MapPin className="h-5 w-5 text-orange-600" />
                  )}
                </button>
              </div>
            </div>

            {showMap && isLoaded && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-orange-600">
                    {selectedLocation ? 
                      "Click on the map or drag the marker to update location" : 
                      "Getting your current location..."}
                  </p>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    className="text-sm text-orange-600 hover:text-orange-800 flex items-center"
                    disabled={mapLoading}
                  >
                    {mapLoading ? "Locating..." : "Use Current Location"}
                  </button>
                </div>
                
                <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden border border-orange-200">
                  <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    zoom={15}
                    center={selectedLocation || { lat: 0, lng: 0 }}
                    onClick={handleMapClick}
                    onLoad={onMapLoad}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false
                    }}
                  >
                    {selectedLocation && (
                      <Marker
                        position={selectedLocation}
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                        icon={{
                          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                          scaledSize: new window.google.maps.Size(32, 32)
                        }}
                      />
                    )}
                  </GoogleMap>
                </div>
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
                id="specialNote"
                name="specialNote"
                value={formData.specialNote}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400 min-h-[100px]"
                placeholder="Any special requirements for your pooja..."
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6">
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
                className="text-orange-600 border-orange-300 rounded"
                required
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
                className="text-orange-600 border-orange-300 rounded"
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
          className={`w-full py-3 text-lg rounded-md font-medium ${
            isTermsChecked 
              ? "bg-orange-600 hover:bg-orange-700 text-white" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isTermsChecked || addressLoading}
        >
          {addressLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </>
  );
};

export default UserOrderDetails;