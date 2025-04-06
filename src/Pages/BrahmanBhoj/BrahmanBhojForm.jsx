import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Gift, Bell, Sun, Moon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BrahmanBhojForm() {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    date: "",
    attendees: "",
    notes: "",
    mealType: "lunch",
    occasion: "",
    latitude: "",
    longitude: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          alert("Error fetching location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = "AIzaSyDsvrX6D9H25sj_3k3ZVcaOVy2F0L3TodY"; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const street = addressComponents.find((component) =>
          component.types.includes("route")
        )?.long_name;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        )?.long_name;
        const state = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;
        const zip_code = addressComponents.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        setAddress({
          street: street || "",
          city: city || "",
          state: state || "",
          zip_code: zip_code || "",
        });

        // Update the location input with the formatted address
        setLocation(data.results[0].formatted_address);
      } else {
        alert("Unable to fetch address. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Error fetching address. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the payload for the API
    const payload = {
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      attendees: formData.attendees,
      mealType: formData.mealType,
      occasion: formData.occasion,
      address: location, // Formatted address
      street: address.street,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      longitude: formData.longitude,
      latitude: formData.latitude,
      notes: formData.notes,
    };

    try {
      // Make the API call
      const response = await fetch(
        "http://localhost:3000/api/brahman-bhoj/create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Show success toast
      toast.success("Booking successful! Our team will contact you shortly.");

      // Show "Thank You" message
      setShowSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          user_name: "",
          email: "",
          phone: "",
          date: "",
          attendees: "",
          notes: "",
          mealType: "lunch",
          occasion: "",
          latitude: "",
          longitude: "",
        });
        setLocation("");
        setAddress({ street: "", city: "", state: "", zip_code: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error toast
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl">
        {/* Decorative header */}
        <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-8 px-6 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/indian-mandala-background_1035-8460.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "overlay",
              }}
            ></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-amber-50 mb-2">
              श्री ब्राह्मण भोज
            </h1>
            <p className="text-amber-100 max-w-2xl mx-auto">
              Offering food to Brahmins is considered one of the most auspicious
              acts in Hindu tradition, bringing blessings and positive karma.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden md:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 rounded-full border-2 border-amber-300 opacity-60"></div>
            </motion.div>
          </div>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 rounded-full border-2 border-amber-300 opacity-60"></div>
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-5">
          {/* Left side - Image and Info */}
          <div className="md:col-span-2 bg-gradient-to-b from-amber-100 to-orange-100 p-6 flex flex-col items-center justify-between">
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/pandit-ji-giving-blessings-illustration-download-in-svg-png-gif-file-formats--male-indian-blessing-well-wish-pack-people-illustrations-2319309.png?f=webp"
                  alt="Brahmin Priest"
                  className="w-48 h-48 mx-auto"
                />
              </motion.div>

              <h3 className="text-orange-800 font-semibold text-lg mb-2">
                Why Brahman Bhoj?
              </h3>
              <p className="text-orange-900/70 text-sm">
                Feeding Brahmins is believed to bring prosperity, remove
                obstacles, and fulfill wishes. It's often performed during
                special occasions or as part of religious ceremonies.
              </p>
            </div>

            <div className="w-full space-y-4 mt-4">
              <div className="flex items-center p-3 bg-white/60 rounded-lg shadow-sm">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <Sun className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-orange-800">Morning Ceremony</h4>
                  <p className="text-xs text-orange-700/70">
                    Ideal for Satvik breakfast offerings
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-white/60 rounded-lg shadow-sm">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <Moon className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-orange-800">Evening Ceremony</h4>
                  <p className="text-xs text-orange-700/70">
                    Traditional dinner with proper rituals
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-white/60 rounded-lg shadow-sm">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <Bell className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-orange-800">Special Occasions</h4>
                  <p className="text-xs text-orange-700/70">
                    Birthdays, anniversaries, memorials
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:col-span-3 bg-white p-6 md:p-8">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your Brahman Bhoj has been scheduled successfully.
                </p>
                <p className="text-orange-600 font-medium">
                  Our team will contact you shortly to confirm the details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-orange-700 mb-1">
                    Brahman Bhoj Booking
                  </h2>
                  <p className="text-orange-600/80 text-sm">
                    Fill the form below to schedule your auspicious ceremony
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="user_name"
                    className="block text-sm font-medium text-orange-800 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="attendees"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Number of Brahmins <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="attendees"
                        name="attendees"
                        type="number"
                        min="1"
                        value={formData.attendees}
                        onChange={handleChange}
                        placeholder="Number of Brahmins to feed"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                      />
                      <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-orange-800 mb-1">
                      Meal Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer transition-all ${
                          formData.mealType === "lunch"
                            ? "bg-orange-100 border-orange-400"
                            : "border-orange-200 bg-orange-50/50 hover:bg-orange-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="mealType"
                          value="lunch"
                          checked={formData.mealType === "lunch"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Sun className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="text-orange-800">Lunch</span>
                      </label>
                      <label
                        className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer transition-all ${
                          formData.mealType === "dinner"
                            ? "bg-orange-100 border-orange-400"
                            : "border-orange-200 bg-orange-50/50 hover:bg-orange-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="mealType"
                          value="dinner"
                          checked={formData.mealType === "dinner"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Moon className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="text-orange-800">Dinner</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="occasion"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Occasion
                    </label>
                    <div className="relative">
                      <select
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 appearance-none"
                      >
                        <option value="">Select occasion (optional)</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="memorial">Memorial/Shraddha</option>
                        <option value="festival">Festival</option>
                        <option value="graha-shanti">Graha Shanti</option>
                        <option value="other">Other</option>
                      </select>
                      <Gift className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-orange-800 mb-1"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-lg overflow-hidden">
                    <input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location or use location button"
                      required
                      className="flex-grow px-4 py-2.5 border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300 rounded-l-lg"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="flex items-center justify-center px-4 bg-orange-100 border border-l-0 border-orange-200 text-orange-600 hover:bg-orange-200 transition-colors rounded-r-lg"
                    >
                      <MapPin className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-orange-600/70">
                    Where the ceremony will take place
                  </p>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Street Address
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={address.street}
                      onChange={handleAddressChange}
                      placeholder="Enter street address"
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="Enter city"
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="Enter state"
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip_code"
                      className="block text-sm font-medium text-orange-800 mb-1"
                    >
                      Pin Code
                    </label>
                    <input
                      id="zip_code"
                      name="zip_code"
                      type="text"
                      value={address.zip_code}
                      onChange={handleAddressChange}
                      placeholder="Enter pin code"
                      className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                    />
                  </div>
                </div>

                {/* Hidden fields for latitude and longitude */}
                <input
                  type="hidden"
                  name="latitude"
                  value={formData.latitude}
                />
                <input
                  type="hidden"
                  name="longitude"
                  value={formData.longitude}
                />

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-orange-800 mb-1"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any dietary requirements, specific rituals, or special requests?"
                    className="w-full px-4 py-2.5 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-orange-50/50 placeholder-orange-300"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
                      isSubmitting ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"
                    } shadow-lg shadow-orange-200 flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Book Brahman Bhoj"
                    )}
                  </motion.button>
                </div>

                <div className="text-center text-xs text-orange-600/70 pt-2">
                  By booking, you agree to our terms and conditions for Brahman
                  Bhoj ceremonies
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}