import React, { useEffect, useState } from "react";

const LocationFetcher = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("");

  const GOOGLE_MAPS_API_KEY = "AIzaSyCIBgZHeRcE_nXItBTGTM-eNdCNdZoBKPI"; // Replace with your API key

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch city name using reverse geocoding
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                // Extract city name
                const addressComponents = data.results[0].address_components;
                const cityComponent = addressComponents.find((component) =>
                  component.types.includes("locality")
                );
                setCity(cityComponent ? cityComponent.long_name : "Unknown City");
              }
            })
            .catch((error) => console.error("Error fetching geocoding data:", error));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Current Location</h1>
      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>City: {city || "Fetching city name..."}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationFetcher;
