import { useState, useEffect, useRef } from "react";
import {
  User,Mail,Phone,MapPin,Calendar,FileText,Image,
  CreditCard,Globe,Compass,Users,Music,Book,Star,
  Upload,Info,Lock,CheckCircle,AlertCircle,Loader,
  X,PlusCircle,MinusCircle,Eye,EyeOff } from "lucide-react";
import { OmSymbol } from "../User/DevotionalIcons";
import RegistrationSteps from "./RegistrationSteps";
import SuccessMessage from "./SuccessMessage";
import { registerPartner } from "./api";

const PartnerRegistration = () => {
  // Form state
  const [formData, setFormData] = useState({
    partnerType: "pandit",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    gender: "",
    dateOfBirth: "",
    aadharNumber: "",
    aadharImage: null,
    profileImage: null,
    latitude: "",
    longitude: "",
    specialization: [],
    experience: "",
    languages: [],
    poojaTypes: [],
    availability: [],
    priceRange: "",
    certificates: [],
    mandaliName: "",
    totalMembers: "",
    mandaliCategory: "",
    mandaliExperience: "",
    mandaliPrice: "",
    mandaliMembers: [{ name: "", role: "", experience: "" }],
    shortDescription: "",
    longDescription: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    termsAccepted: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    profileImage: null,
    aadharImage: null,
    certificates: [],
  });
  const [userId, setUserId] = useState(null);

  // Refs
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    setError(null);

    try {
      const userId = await registerPartner(formData);
      setUserId(userId);
      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else if (type === "file") {
      handleFileChange(name, files)
    } else if (name.includes(".")) {
      // Handle nested objects like socialMedia.facebook
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }
  // Handle multi-select changes
  const handleMultiSelectChange = (name, value) => {
    setFormData((prev) => {
      const currentValues = [...prev[name]]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value],
        }
      }
    })
  }
  // Handle file changes
  const handleFileChange = (name, files) => {
    if (!files || files.length === 0) return

    if (name === "certificates") {
      // Handle multiple files
      const newCertificates = Array.from(files)

      setFormData((prev) => ({
        ...prev,
        certificates: [...prev.certificates, ...newCertificates],
      }))

      // Create preview URLs
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file))

      setPreviewImages((prev) => ({
        ...prev,
        certificates: [...prev.certificates, ...newPreviews],
      }))
    } else {
      // Handle single file
      const file = files[0]

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }))

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)

      setPreviewImages((prev) => ({
        ...prev,
        [name]: previewUrl,
      }))
    }
  }

  // Handle mandali members
  const addMandaliMember = () => {
    setFormData((prev) => ({
      ...prev,
      mandaliMembers: [...prev.mandaliMembers, { name: "", role: "", experience: "" }],
    }))
  }
  const removeMandaliMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      mandaliMembers: prev.mandaliMembers.filter((_, i) => i !== index),
    }))
  }

  const handleMandaliMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedMembers = [...prev.mandaliMembers]
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      }

      return {
        ...prev,
        mandaliMembers: updatedMembers,
      }
    })
  }
  const getCurrentLocation = () => {
    setIsGettingLocation(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }))

          // Update map if initialized
          if (googleMapRef.current) {
            const newPosition = new window.google.maps.LatLng(latitude, longitude)
            googleMapRef.current.setCenter(newPosition)
            googleMapRef.current.setZoom(15)

            // Update marker position
            const markers = googleMapRef.current.markers || []
            if (markers.length > 0) {
              markers[0].setPosition(newPosition)
            } else {
              const marker = new window.google.maps.Marker({
                position: newPosition,
                map: googleMapRef.current,
                draggable: true,
                title: "Your Location",
              })

              googleMapRef.current.markers = [marker]

              // Update coordinates when marker is dragged
              window.google.maps.event.addListener(marker, "dragend", () => {
                const position = marker.getPosition()
                setFormData((prev) => ({
                  ...prev,
                  latitude: position.lat().toFixed(6),
                  longitude: position.lng().toFixed(6),
                }))
              })
            }
          }

          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Failed to get your current location. Please enter it manually.")
          setIsGettingLocation(false)
        },
        { enableHighAccuracy: true },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please enter your location manually.")
      setIsGettingLocation(false)
    }
  }
   const validateStep = (step) => {
          const errors = {}
          if (step === 1) {
            if (!formData.partnerType) errors.partnerType = "Please select partner type"
            if (!formData.fullName.trim()) errors.fullName = "Full name is required"
            if (!formData.email.trim()) {
              errors.email = "Email is required"
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
              errors.email = "Email is invalid"
            }
            if (!formData.mobile.trim()) {
              errors.mobile = "Mobile number is required"
            } else if (!/^\d{10}$/.test(formData.mobile)) {
              errors.mobile = "Mobile number must be 10 digits"
            }
            if (!formData.password) {
              errors.password = "Password is required"
            } else if (formData.password.length < 8) {
              errors.password = "Password must be at least 8 characters"
            } else if (!/(?=.*[a-z])/.test(formData.password)) {
              errors.password = "Password must contain at least one lowercase letter"
            } else if (!/(?=.*[A-Z])/.test(formData.password)) {
              errors.password = "Password must contain at least one uppercase letter"
            } else if (!/(?=.*\d)/.test(formData.password)) {
              errors.password = "Password must contain at least one number"
            } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
              errors.password = "Password must contain at least one special character"
            }
            if (formData.password !== formData.confirmPassword) {
              errors.confirmPassword = "Passwords do not match"
            }
          } else if (step === 2) {
            if (!formData.address.trim()) errors.address = "Address is required"
            if (!formData.city.trim()) errors.city = "City is required"
            if (!formData.state.trim()) errors.state = "State is required"
            if (!formData.country.trim()) errors.country = "Country is required"
            if (!formData.pincode.trim()) errors.pincode = "Pincode is required"
            if (!formData.latitude || !formData.longitude) {
              errors.location = "Please set your location on the map"
            }
          } else if (step === 3) {
            if (formData.partnerType === "pandit") {
              if (formData.specialization.length === 0) {
                errors.specialization = "Please select at least one specialization"
              }
              if (!formData.experience.trim()) {
                errors.experience = "Experience is required"
              }
              if (formData.languages.length === 0) {
                errors.languages = "Please select at least one language"
              }
              if (formData.poojaTypes.length === 0) {
                errors.poojaTypes = "Please select at least one pooja type"
              }
            } else {
              if (!formData.mandaliName.trim()) {
                errors.mandaliName = "Mandali name is required"
              }
              if (!formData.totalMembers.trim()) {
                errors.totalMembers = "Total members is required"
              }
              if (!formData.mandaliCategory) {
                errors.mandaliCategory = "Please select a category"
              }
              if (!formData.mandaliExperience.trim()) {
                errors.mandaliExperience = "Experience is required"
              }
              if (formData.mandaliMembers.length === 0) {
                errors.mandaliMembers = "Please add at least one member"
              } else {
                const invalidMembers = formData.mandaliMembers.some((member) => !member.name.trim() || !member.role.trim())
                if (invalidMembers) {
                  errors.mandaliMembers = "Please fill all member details"
                }
              }
            }
          } else if (step === 4) {
            if (!formData.shortDescription.trim()) {
              errors.shortDescription = "Short description is required"
            }
            if (!formData.aadharNumber.trim()) {
              errors.aadharNumber = "Aadhar number is required"
            } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
              errors.aadharNumber = "Aadhar number must be 12 digits"
            }
            if (!formData.aadharImage) {
              errors.aadharImage = "Please upload your Aadhar card image"
            }
            if (!formData.profileImage) {
              errors.profileImage = "Please upload your profile image"
            }
            if (!formData.termsAccepted) {
              errors.termsAccepted = "You must accept the terms and conditions"
            }
          }
      
          setFormErrors(errors)
          return Object.keys(errors).length === 0
        }
      
        // Handle next step
        const handleNextStep = () => {
          if (validateStep(currentStep)) {
            setCurrentStep((prev) => prev + 1)
            window.scrollTo(0, 0)
          }
        }
      
        // Handle previous step
        const handlePrevStep = () => {
          setCurrentStep((prev) => prev - 1)
          window.scrollTo(0, 0)
        }
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
          <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-orange-200 blur-md"></div>
              <div className="relative z-10 bg-orange-100 p-4 rounded-full">
                {formData.partnerType === "pandit" ? (
                  <OmSymbol className="h-12 w-12 text-orange-600" />
                ) : (
                  <Music className="h-12 w-12 text-orange-600" />
                )}
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">Partner Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our platform as a {formData.partnerType === "pandit" ? "Pandit" : "Bhajan Mandali"} partner and connect
            with devotees seeking your services.
          </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-orange-200">
            {success ? (
              <SuccessMessage 
                partnerType={formData.partnerType} 
                userId={userId} 
                onReset={() => {
                  setSuccess(false);
                  setCurrentStep(1);
                  // Reset form if needed
                }}
              />
            ) : (
              <RegistrationSteps
                currentStep={currentStep}
                formData={formData}
                formErrors={formErrors}
                previewImages={previewImages}
                isLoading={isLoading}
                error={error}
                isGettingLocation={isGettingLocation}
                mapRef={mapRef}
                onNextStep={() => {
                  if (validateStep(currentStep)) {
                    setCurrentStep(prev => prev + 1);
                    window.scrollTo(0, 0);
                  }
                }}
                onPrevStep={() => {
                  setCurrentStep(prev => prev - 1);
                  window.scrollTo(0, 0);
                }}
                onChange={handleChange}
                onMultiSelectChange={handleMultiSelectChange}
                onFileChange={handleFileChange}
                onAddMandaliMember={addMandaliMember}
                onRemoveMandaliMember={removeMandaliMember}
                onMandaliMemberChange={handleMandaliMemberChange}
                onGetCurrentLocation={getCurrentLocation}
                onSubmit={handleSubmit}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            )}
          </div>
      </div>
    </div>

    </>
  );
};

export default PartnerRegistration

