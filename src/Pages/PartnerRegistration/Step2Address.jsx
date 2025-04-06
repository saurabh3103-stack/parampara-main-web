import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Globe, Compass, Info, Loader } from "lucide-react";

export default function Step2Address({
  formData,
  formErrors,
  onChange,
  isGettingLocation,
  onGetCurrentLocation,
  mapRef
}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapContainerRef = useRef(null);
  const googleMapRef = useRef(null);

  // Load Google Maps API script
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (!window.google) {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsvrX6D9H25sj_3k3ZVcaOVy2F0L3TodY&libraries=places`;
        googleMapScript.async = true;
        googleMapScript.defer = true;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', initializeMap);
      } else {
        initializeMap();
      }
    };

    loadGoogleMapsAPI();

    return () => {
      if (googleMapRef.current) {
        window.google.maps.event.clearInstanceListeners(googleMapRef.current);
      }
    };
  }, []);

  // Initialize map once API is loaded
  const initializeMap = () => {
    if (!mapContainerRef.current) return;

    const defaultLocation = formData.latitude && formData.longitude 
      ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }
      : { lat: 20.5937, lng: 78.9629 }; // Default to India

    const mapOptions = {
      zoom: 12,
      center: defaultLocation,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true
    };

    googleMapRef.current = new window.google.maps.Map(mapContainerRef.current, mapOptions);
    setMap(googleMapRef.current);

    // Add marker if location exists
    if (formData.latitude && formData.longitude) {
      addMarker(defaultLocation);
    }

    // Add click listener to update location
    googleMapRef.current.addListener('click', (e) => {
      addMarker(e.latLng);
      updateFormLocation(e.latLng.lat(), e.latLng.lng());
    });
  };

  // Add or update marker
  const addMarker = (location) => {
    if (marker) {
      marker.setPosition(location);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        draggable: true,
        title: "Your Location"
      });

      // Update location when marker is dragged
      newMarker.addListener('dragend', (e) => {
        updateFormLocation(e.latLng.lat(), e.latLng.lng());
      });

      setMarker(newMarker);
    }
  };

  // Update form with new coordinates
  const updateFormLocation = (lat, lng) => {
    onChange({ target: { name: 'latitude', value: lat.toString() } });
    onChange({ target: { name: 'longitude', value: lng.toString() } });
  };

  // Get current location using browser geolocation
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      onChange({ target: { name: 'isGettingLocation', value: true } });
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // First update the latitude/longitude fields immediately
          updateFormLocation(latitude, longitude);
          
          const location = new window.google.maps.LatLng(latitude, longitude);
          
          if (googleMapRef.current) {
            googleMapRef.current.setCenter(location);
            googleMapRef.current.setZoom(15);
            addMarker(location);
            
            // Reverse geocode to get address details
            try {
              const geocoder = new window.google.maps.Geocoder();
              const response = await geocodeLatLng(geocoder, location);
              
              if (response && response.length > 0) {
                const addressComponents = response[0].address_components;
                const formattedAddress = response[0].formatted_address;
                
                // Extract address components
                const addressDetails = extractAddressComponents(addressComponents);
                
                // Update all form fields
                onChange({ target: { name: 'address', value: formattedAddress } });
                onChange({ target: { name: 'city', value: addressDetails.city || '' } });
                onChange({ target: { name: 'state', value: addressDetails.state || '' } });
                onChange({ target: { name: 'country', value: addressDetails.country || '' } });
                onChange({ target: { name: 'pincode', value: addressDetails.postalCode || '' } });
                
                // The latitude/longitude are already updated via updateFormLocation
              }
            } catch (error) {
              console.error("Geocoding error:", error);
            }
          }
          onChange({ target: { name: 'isGettingLocation', value: false } });
        },
        (error) => {
          console.error("Error getting location:", error);
          onChange({ target: { name: 'isGettingLocation', value: false } });
          alert("Could not get your location. Please try again or select manually on the map.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  
  // The updateFormLocation function remains the same
//   const updateFormLocation = (lat, lng) => {
//     onChange({ target: { name: 'latitude', value: lat.toString() } });
//     onChange({ target: { name: 'longitude', value: lng.toString() } });
//   };
  
  // Helper functions remain the same
  const geocodeLatLng = (geocoder, latlng) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };
  
  const extractAddressComponents = (addressComponents) => {
    const result = {};
    
    addressComponents.forEach(component => {
      const types = component.types;
      if (types.includes('locality')) {
        result.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        result.state = component.long_name;
      } else if (types.includes('country')) {
        result.country = component.long_name;
      } else if (types.includes('postal_code')) {
        result.postalCode = component.long_name;
      }
    });
    
    return result;
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-orange-800">Address & Location</h2>
        <p className="text-gray-600">Please provide your address and location details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            className={`w-full px-4 py-2 border ${formErrors.address ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your street address"
          />
          {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={onChange}
            className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter a nearby landmark (optional)"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            className={`w-full px-4 py-2 border ${formErrors.city ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your city"
          />
          {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            className={`w-full px-4 py-2 border ${formErrors.state ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your state"
          />
          {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 flex items-center">
            <Globe className="h-4 w-4 text-orange-500 mr-2" />
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={onChange}
            className={`w-full px-4 py-2 border ${formErrors.country ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your country"
          />
          {formErrors.country && <p className="text-red-500 text-sm">{formErrors.country}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            className={`w-full px-4 py-2 border ${formErrors.pincode ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your pincode"
          />
          {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            Pin Your Location <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="flex items-center text-sm text-orange-600 hover:text-orange-800"
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <>
                <Loader className="h-4 w-4 mr-1 animate-spin" />
                Getting location...
              </>
            ) : (
              <>
                <Compass className="h-4 w-4 mr-1" />
                Use my current location
              </>
            )}
          </button>
        </div>

        {/* Hidden latitude/longitude inputs */}
        <input
          type="hidden"
          name="latitude"
          value={formData.latitude || ''}
          onChange={onChange}
        />
        <input
          type="hidden"
          name="longitude"
          value={formData.longitude || ''}
          onChange={onChange}
        />

        {/* Map container */}
        <div 
          ref={mapContainerRef}
          className="w-full h-64 md:h-80 rounded-lg border border-orange-200 bg-gray-100"
        ></div>

        <p className="text-sm text-gray-600">
          <Info className="h-4 w-4 inline mr-1 text-orange-500" />
          Click on the map to set your exact location or use the "Use my current location" button
        </p>

        {formErrors.location && <p className="text-red-500 text-sm">{formErrors.location}</p>}
      </div>
    </div>
  );
}