"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "./Breadcrumb";
import WelcomeSection from "./WelcomeSection";
import { getUserByEmail } from "./GetUserDetails";
import { OmSymbol, Lotus } from "./DevotionalIcons";
import UserProfileForm from "./UserProfileForm";

const UserSetting = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [initialUserData, setInitialUserData] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const imgURL = 'http://34.131.41.101:3000/'
  const breadcrumbLinks = [
    { label: "Home", url: "/" },
    { label: "User", url: "/user/dashboard" },
    { pagename: "Settings" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getUserByEmail(navigate);
        if (data) {
          setUserData(data);
          setInitialUserData(data);
          if (data.image) {
            setImagePreview(data.image);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsvrX6D9H25sj_3k3ZVcaOVy2F0L3TodY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [navigate]);

  const toggleEdit = () => {
    if (isEditing) {
      // If we're currently editing, cancel the edit
      setUserData(initialUserData);
      setImagePreview(initialUserData.image || null);
      setImage(null);
      setFormErrors({});
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Basic validation
    if (!userData.username) errors.username = "Name is required";
    if (!userData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email)) errors.email = "Email is invalid";

    if (!userData.mobile) errors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(userData.mobile)) errors.mobile = "Mobile number must be 10 digits";

    if (!userData.address) errors.address = "Address is required";
    if (!userData.city) errors.city = "City is required";
    if (!userData.state) errors.state = "State is required";
    if (!userData.country) errors.country = "Country is required";
    if (!userData.pincode) errors.pincode = "Pincode is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateUserData = async (updatedData) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  
      if (!token) {
        throw new Error("Authentication token not found");
      }
  
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
  
      // Append all other data
      Object.keys(updatedData).forEach(key => {
        if (updatedData[key] !== undefined && updatedData[key] !== null) {
          formData.append(key, updatedData[key]);
        }
      });
  
      const response = await fetch(`http://34.131.41.101:3000/api/user/update-user/${userData._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }
  
      if (!data.status) {
        throw new Error(data.message || "Update failed");
      }
  
      toast.success("Profile updated successfully!");
      
      // Update user data with the response
      const updatedUser = data.data.user || data.data; // Handle both response formats
      setUserData(updatedUser);
      setInitialUserData(updatedUser);
      setIsEditing(false);
      
      // Update image preview
      if (updatedUser.image) {
        setImagePreview(`http://34.131.41.101:3000/${updatedUser.image}`);
      } else {
        setImagePreview(null);
      }
      setImage(null);
      
      return true;
    } catch (err) {
      setError(err.message || "Failed to update user");
      toast.error(err.message || "Failed to update user");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare the data to send
    const updatedData = {
      username: userData.username,
      email: userData.email,
      mobile: userData.mobile,
      alternate_no: userData.alternate_no,
      gender: userData.gender,
      dob: userData.dob,
      aadhar_no: userData.aadhar_no,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      country: userData.country,
      pincode: userData.pincode,
      landmark: userData.landmark,
      longitude: userData.longitude,
      latitude: userData.latitude,
      socialType: userData.socialType
    };

    await updateUserData(updatedData);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsFetchingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Google Maps Geocoding API to get address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsvrX6D9H25sj_3k3ZVcaOVy2F0L3TodY`
          );
          
          const data = await response.json();
          
          if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const formattedAddress = data.results[0].formatted_address;
            
            // Extract address components
            let streetNumber = "";
            let route = "";
            let locality = "";
            let administrativeArea = "";
            let country = "";
            let postalCode = "";
            
            addressComponents.forEach(component => {
              if (component.types.includes("street_number")) {
                streetNumber = component.long_name;
              } else if (component.types.includes("route")) {
                route = component.long_name;
              } else if (component.types.includes("locality")) {
                locality = component.long_name;
              } else if (component.types.includes("administrative_area_level_1")) {
                administrativeArea = component.long_name;
              } else if (component.types.includes("country")) {
                country = component.long_name;
              } else if (component.types.includes("postal_code")) {
                postalCode = component.long_name;
              }
            });
            
            const streetAddress = `${streetNumber} ${route}`.trim();
            
            // Update the form fields
            setUserData(prev => ({
              ...prev,
              address: streetAddress || formattedAddress,
              city: locality || "",
              state: administrativeArea || "",
              country: country || "",
              pincode: postalCode || "",
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              landmark: formattedAddress
            }));

            toast.success("Location fetched successfully!");
          } else {
            setError("Could not fetch address details");
            toast.error("Could not fetch address details");
          }
        } catch (err) {
          setError("Failed to fetch address details");
          toast.error("Failed to fetch address details");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location: " + error.message);
        toast.error("Unable to retrieve your location: " + error.message);
        setIsFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-orange-600 border-orange-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-orange-800">Loading your spiritual journey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <ToastContainer />
      
      {/* Cosmic Header Banner */}
      <div className="relative bg-gradient-to-r from-orange-700 to-red-800 py-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/space-background-with-stars-vector-illustration_97886-319.jpg?w=1380&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <OmSymbol className="h-12 w-12 mx-auto text-amber-200 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50">Settings</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Breadcrumb links={breadcrumbLinks} />

        <div className="mx-auto mt-5 w-full max-w-7xl">
          {/* Welcome Section */}
          <WelcomeSection user={userData} />

          {/* User Profile Form */}
          <UserProfileForm
            userData={userData}
            isEditing={isEditing}
            formErrors={formErrors}
            imagePreview={imagePreview}
            isUpdating={isUpdating}
            isFetchingLocation={isFetchingLocation}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            getCurrentLocation={getCurrentLocation}
            handleSubmit={handleSubmit}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;