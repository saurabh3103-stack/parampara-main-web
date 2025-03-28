import { useState, useEffect, useRef } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Image,
  CreditCard,
  Globe,
  Compass,
  Users,
  Music,
  Book,
  Star,
  Upload,
  Info,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader,
  X,
  PlusCircle,
  MinusCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { OmSymbol, Lotus } from "../User/DevotionalIcons"

const PartnerRegistration = () => {
  // Form state
  const [formData, setFormData] = useState({
    partnerType: "pandit", // Default to pandit
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "India", // Default to India
    pincode: "",
    landmark: "",
    gender: "",
    dateOfBirth: "",
    aadharNumber: "",
    aadharImage: null,
    profileImage: null,
    latitude: "",
    longitude: "",

    // Pandit specific fields
    specialization: [],
    experience: "",
    languages: [],
    poojaTypes: [],
    availability: [],
    priceRange: "",
    certificates: [],

    // Bhajan Mandali specific fields
    mandaliName: "",
    totalMembers: "",
    mandaliCategory: "",
    mandaliExperience: "",
    mandaliPrice: "",
    mandaliMembers: [{ name: "", role: "", experience: "" }],

    // Common fields
    shortDescription: "",
    longDescription: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    termsAccepted: false,
  })

  // UI state
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [previewImages, setPreviewImages] = useState({
    profileImage: null,
    aadharImage: null,
    certificates: [],
  })

  // Refs
  const mapRef = useRef(null)
  const googleMapRef = useRef(null)

  // Options for select fields
  const genderOptions = ["Male", "Female", "Other"]
  const specializationOptions = [
    "Vedic Rituals",
    "Vastu Shastra",
    "Astrology",
    "Marriage Ceremonies",
    "Funeral Rites",
    "Navgraha Shanti",
    "Satyanarayan Puja",
    "Griha Pravesh",
    "Katha & Pravachan",
    "Other",
  ]
  const languageOptions = [
    "Hindi",
    "Sanskrit",
    "English",
    "Bengali",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Odia",
    "Assamese",
    "Other",
  ]
  const poojaTypeOptions = [
    "Griha Pravesh",
    "Satyanarayan Katha",
    "Ganesh Puja",
    "Lakshmi Puja",
    "Durga Puja",
    "Navgraha Shanti",
    "Vastu Shanti",
    "Rudra Abhishek",
    "Maha Mrityunjaya Japa",
    "Kaal Sarp Dosh Nivaran",
    "Marriage Ceremonies",
    "Naming Ceremony",
    "Mundan Ceremony",
    "Funeral Rites",
    "Other",
  ]
  const availabilityOptions = ["Weekdays", "Weekends", "Mornings", "Evenings", "Full Day", "Specific Hours", "On Call"]
  const mandaliCategoryOptions = [
    "Bhajan",
    "Kirtan",
    "Devotional Songs",
    "Spiritual Music",
    "Folk Devotional",
    "Classical Devotional",
    "Instrumental",
    "Mixed",
  ]

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      const googleMapScript = document.createElement("script")
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
      googleMapScript.async = true
      googleMapScript.defer = true
      window.document.body.appendChild(googleMapScript)

      googleMapScript.addEventListener("load", initializeMap)

      return () => {
        googleMapScript.removeEventListener("load", initializeMap)
      }
    }

    loadGoogleMapsAPI()
  }, [])

  const initializeMap = () => {
    if (mapRef.current) {
      const defaultLocation = { lat: 20.5937, lng: 78.9629 } // Default to center of India

      const mapOptions = {
        zoom: 5,
        center: defaultLocation,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      }

      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions)

      // Add marker for selected location
      const marker = new window.google.maps.Marker({
        position: defaultLocation,
        map: googleMapRef.current,
        draggable: true,
        title: "Your Location",
      })

      // Update coordinates when marker is dragged
      window.google.maps.event.addListener(marker, "dragend", () => {
        const position = marker.getPosition()
        setFormData((prev) => ({
          ...prev,
          latitude: position.lat().toFixed(6),
          longitude: position.lng().toFixed(6),
        }))
      })

      // Add click event to map
      window.google.maps.event.addListener(googleMapRef.current, "click", (event) => {
        marker.setPosition(event.latLng)
        setFormData((prev) => ({
          ...prev,
          latitude: event.latLng.lat().toFixed(6),
          longitude: event.latLng.lng().toFixed(6),
        }))
      })
    }
  }

  // Get current location
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

  // Form validation
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create FormData object for file uploads
      const formDataToSend = new FormData()

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profileImage" || key === "aadharImage") {
          formDataToSend.append(key, value)
        } else if (key === "certificates") {
          value.forEach((file, index) => {
            formDataToSend.append(`certificate_${index}`, file)
          })
        } else if (key === "specialization" || key === "languages" || key === "poojaTypes" || key === "availability") {
          formDataToSend.append(key, JSON.stringify(value))
        } else if (key === "mandaliMembers") {
          formDataToSend.append(key, JSON.stringify(value))
        } else if (key === "socialMedia") {
          formDataToSend.append(key, JSON.stringify(value))
        } else {
          formDataToSend.append(key, value)
        }
      })

      // In a real app, you would send this to your API
      // const response = await fetch("/api/register-partner", {
      //   method: "POST",
      //   body: formDataToSend,
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to register. Please try again.");
      // }

      // const data = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)

      // Reset form after successful submission
      // setFormData({
      //   partnerType: "pandit",
      //   ...
      // });
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error.message || "Failed to register. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Render form steps
  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-orange-800">Basic Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      {/* Partner Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.partnerType === "pandit"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-orange-300"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, partnerType: "pandit" }))}
        >
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                formData.partnerType === "pandit" ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <User className={`h-5 w-5 ${formData.partnerType === "pandit" ? "text-white" : "text-gray-500"}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Register as Pandit</h3>
              <p className="text-sm text-gray-600">For individual priests offering pooja services</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <img
              src="https://img.freepik.com/free-photo/indian-priest-traditional-clothes_23-2149118545.jpg?w=740&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5"
              alt="Pandit"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Perform various types of poojas</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Get bookings from devotees</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Manage your schedule</span>
              </li>
            </ul>
          </div>

          {formData.partnerType === "pandit" && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-6 w-6 text-orange-500" />
            </div>
          )}
        </div>

        <div
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.partnerType === "mandali"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-orange-300"
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, partnerType: "mandali" }))}
        >
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                formData.partnerType === "mandali" ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <Users className={`h-5 w-5 ${formData.partnerType === "mandali" ? "text-white" : "text-gray-500"}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Register as Bhajan Mandali</h3>
              <p className="text-sm text-gray-600">For groups performing devotional music</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <img
              src="https://img.freepik.com/free-photo/group-people-playing-traditional-indian-music_23-2149068487.jpg?w=740&t=st=1711066235~exp=1711066835~hmac=e1e1f9d3a7f5e5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5"
              alt="Bhajan Mandali"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Perform at religious events</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Get group bookings</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Showcase your group's talents</span>
              </li>
            </ul>
          </div>

          {formData.partnerType === "mandali" && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-6 w-6 text-orange-500" />
            </div>
          )}
        </div>

        {formErrors.partnerType && <div className="md:col-span-2 text-red-500 text-sm">{formErrors.partnerType}</div>}
      </div>

      {/* Basic Information Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 flex items-center">
            <User className="h-4 w-4 text-orange-500 mr-2" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${formErrors.fullName ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder={formData.partnerType === "pandit" ? "Enter your full name" : "Enter mandali owner name"}
          />
          {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
            <Mail className="h-4 w-4 text-orange-500 mr-2" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${formErrors.email ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your email address"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 flex items-center">
            <Phone className="h-4 w-4 text-orange-500 mr-2" />
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${formErrors.mobile ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your 10-digit mobile number"
            maxLength={10}
          />
          {formErrors.mobile && <p className="text-red-500 text-sm">{formErrors.mobile}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 flex items-center">
            <Users className="h-4 w-4 text-orange-500 mr-2" />
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
            <Lock className="h-4 w-4 text-orange-500 mr-2" />
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${formErrors.password ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Create a password (min. 8 characters)"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 flex items-center">
            <Lock className="h-4 w-4 text-orange-500 mr-2" />
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${formErrors.confirmPassword ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
          {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${formErrors.pincode ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your pincode"
          />
          {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
        </div>
      </div>

      {/* Map Location */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
            Pin Your Location <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={getCurrentLocation}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Latitude"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Longitude"
              readOnly
            />
          </div>
        </div>

        <div ref={mapRef} className="w-full h-64 md:h-80 rounded-lg border border-orange-200 bg-gray-100"></div>

        <p className="text-sm text-gray-600">
          <Info className="h-4 w-4 inline mr-1 text-orange-500" />
          Click on the map to set your exact location or use the "Use my current location" button
        </p>

        {formErrors.location && <p className="text-red-500 text-sm">{formErrors.location}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-orange-800">
          {formData.partnerType === "pandit" ? "Professional Details" : "Mandali Details"}
        </h2>
        <p className="text-gray-600">
          {formData.partnerType === "pandit"
            ? "Tell us about your expertise and services"
            : "Tell us about your Bhajan Mandali"}
        </p>
      </div>

      {formData.partnerType === "pandit" ? (
        <div className="space-y-8">
          {/* Specialization */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Star className="h-4 w-4 text-orange-500 mr-2" />
              Specialization <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {specializationOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`specialization-${option}`}
                    checked={formData.specialization.includes(option)}
                    onChange={() => handleMultiSelectChange("specialization", option)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`specialization-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {formErrors.specialization && <p className="text-red-500 text-sm">{formErrors.specialization}</p>}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 text-orange-500 mr-2" />
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border ${formErrors.experience ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter years of experience"
            />
            {formErrors.experience && <p className="text-red-500 text-sm">{formErrors.experience}</p>}
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Globe className="h-4 w-4 text-orange-500 mr-2" />
              Languages <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {languageOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`language-${option}`}
                    checked={formData.languages.includes(option)}
                    onChange={() => handleMultiSelectChange("languages", option)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`language-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {formErrors.languages && <p className="text-red-500 text-sm">{formErrors.languages}</p>}
          </div>

          {/* Pooja Types */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Book className="h-4 w-4 text-orange-500 mr-2" />
              Pooja Types <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {poojaTypeOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`poojaType-${option}`}
                    checked={formData.poojaTypes.includes(option)}
                    onChange={() => handleMultiSelectChange("poojaTypes", option)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`poojaType-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {formErrors.poojaTypes && <p className="text-red-500 text-sm">{formErrors.poojaTypes}</p>}
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 text-orange-500 mr-2" />
              Availability
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`availability-${option}`}
                    checked={formData.availability.includes(option)}
                    onChange={() => handleMultiSelectChange("availability", option)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`availability-${option}`} className="ml-2 block text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Mandali Name */}
          <div className="space-y-2">
            <label htmlFor="mandaliName" className="block text-sm font-medium text-gray-700 flex items-center">
              <Music className="h-4 w-4 text-orange-500 mr-2" />
              Mandali Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mandaliName"
              name="mandaliName"
              value={formData.mandaliName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${formErrors.mandaliName ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter your Bhajan Mandali name"
            />
            {formErrors.mandaliName && <p className="text-red-500 text-sm">{formErrors.mandaliName}</p>}
          </div>

          {/* Total Members */}
          <div className="space-y-2">
            <label htmlFor="totalMembers" className="block text-sm font-medium text-gray-700 flex items-center">
              <Users className="h-4 w-4 text-orange-500 mr-2" />
              Total Members <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="totalMembers"
              name="totalMembers"
              value={formData.totalMembers}
              onChange={handleChange}
              min="1"
              className={`w-full px-4 py-2 border ${formErrors.totalMembers ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter total number of members"
            />
            {formErrors.totalMembers && <p className="text-red-500 text-sm">{formErrors.totalMembers}</p>}
          </div>

          {/* Mandali Category */}
          <div className="space-y-2">
            <label htmlFor="mandaliCategory" className="block text-sm font-medium text-gray-700 flex items-center">
              <Music className="h-4 w-4 text-orange-500 mr-2" />
              Mandali Category <span className="text-red-500">*</span>
            </label>
            <select
              id="mandaliCategory"
              name="mandaliCategory"
              value={formData.mandaliCategory}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${formErrors.mandaliCategory ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white`}
            >
              <option value="">Select Category</option>
              {mandaliCategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formErrors.mandaliCategory && <p className="text-red-500 text-sm">{formErrors.mandaliCategory}</p>}
          </div>

          {/* Mandali Experience */}
          <div className="space-y-2">
            <label htmlFor="mandaliExperience" className="block text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="h-4 w-4 text-orange-500 mr-2" />
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="mandaliExperience"
              name="mandaliExperience"
              value={formData.mandaliExperience}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-2 border ${formErrors.mandaliExperience ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter years of experience"
            />
            {formErrors.mandaliExperience && <p className="text-red-500 text-sm">{formErrors.mandaliExperience}</p>}
          </div>

          {/* Mandali Price */}
          <div className="space-y-2">
            <label htmlFor="mandaliPrice" className="block text-sm font-medium text-gray-700 flex items-center">
              <CreditCard className="h-4 w-4 text-orange-500 mr-2" />
              Price Range (₹)
            </label>
            <input
              type="text"
              id="mandaliPrice"
              name="mandaliPrice"
              value={formData.mandaliPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 5000-15000"
            />
          </div>

          {/* Mandali Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Users className="h-4 w-4 text-orange-500 mr-2" />
                Mandali Members <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addMandaliMember}
                className="flex items-center text-sm text-orange-600 hover:text-orange-800"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Member
              </button>
            </div>

            {formData.mandaliMembers.map((member, index) => (
              <div key={index} className="p-4 border border-orange-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Member #{index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeMandaliMember(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMandaliMemberChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Member name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleMandaliMemberChange(index, "role", e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Singer, Tabla, Harmonium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Experience (Years)</label>
                    <input
                      type="number"
                      value={member.experience}
                      onChange={(e) => handleMandaliMemberChange(index, "experience", e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Years of experience"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            ))}

            {formErrors.mandaliMembers && <p className="text-red-500 text-sm">{formErrors.mandaliMembers}</p>}
          </div>
        </div>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-orange-800">Additional Information</h2>
        <p className="text-gray-600">Almost done! Just a few more details to complete your registration</p>
      </div>

      {/* Description */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 flex items-center">
            <FileText className="h-4 w-4 text-orange-500 mr-2" />
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 border ${formErrors.shortDescription ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder={`Write a brief description about ${formData.partnerType === "pandit" ? "yourself and your services" : "your Bhajan Mandali"}`}
          ></textarea>
          {formErrors.shortDescription && <p className="text-red-500 text-sm">{formErrors.shortDescription}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 flex items-center">
            <FileText className="h-4 w-4 text-orange-500 mr-2" />
            Detailed Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder={`Write a detailed description about ${formData.partnerType === "pandit" ? "your expertise, experience, and services" : "your Bhajan Mandali, performances, and specialties"}`}
          ></textarea>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
          <Globe className="h-4 w-4 text-orange-500 mr-2" />
          Social Media (Optional)
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="facebook" className="block text-xs font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="socialMedia.facebook"
              value={formData.socialMedia.facebook}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Facebook profile URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="instagram" className="block text-xs font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              name="socialMedia.instagram"
              value={formData.socialMedia.instagram}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Instagram profile URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="youtube" className="block text-xs font-medium text-gray-700">
              YouTube
            </label>
            <input
              type="text"
              id="youtube"
              name="socialMedia.youtube"
              value={formData.socialMedia.youtube}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="YouTube channel URL"
            />
          </div>
        </div>
      </div>

      {/* Aadhar Details */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 flex items-center">
            <CreditCard className="h-4 w-4 text-orange-500 mr-2" />
            Aadhar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${formErrors.aadharNumber ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            placeholder="Enter your 12-digit Aadhar number"
            maxLength={12}
          />
          {formErrors.aadharNumber && <p className="text-red-500 text-sm">{formErrors.aadharNumber}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="aadharImage" className="block text-sm font-medium text-gray-700 flex items-center">
            <Image className="h-4 w-4 text-orange-500 mr-2" />
            Aadhar Card Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="aadharImage"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                formErrors.aadharImage ? "border-red-300 bg-red-50" : "border-orange-300 bg-orange-50"
              } hover:bg-orange-100`}
            >
              {previewImages.aadharImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImages.aadharImage || "/placeholder.svg"}
                    alt="Aadhar Card Preview"
                    className="h-full mx-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, aadharImage: null }))
                      setPreviewImages((prev) => ({ ...prev, aadharImage: null }))
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-orange-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or PDF (Max. 2MB)</p>
                </div>
              )}
              <input
                id="aadharImage"
                name="aadharImage"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, application/pdf"
                onChange={(e) => handleFileChange("aadharImage", e.target.files)}
              />
            </label>
          </div>
          {formErrors.aadharImage && <p className="text-red-500 text-sm">{formErrors.aadharImage}</p>}
        </div>
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 flex items-center">
          <Image className="h-4 w-4 text-orange-500 mr-2" />
          Profile Image <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="profileImage"
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer ${
              formErrors.profileImage ? "border-red-300 bg-red-50" : "border-orange-300 bg-orange-50"
            } hover:bg-orange-100`}
          >
            {previewImages.profileImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewImages.profileImage || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="h-full mx-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, profileImage: null }))
                    setPreviewImages((prev) => ({ ...prev, profileImage: null }))
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-orange-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG or JPG (Max. 2MB)</p>
              </div>
            )}
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={(e) => handleFileChange("profileImage", e.target.files)}
            />
          </label>
        </div>
        {formErrors.profileImage && <p className="text-red-500 text-sm">{formErrors.profileImage}</p>}
      </div>

      {/* Terms and Conditions */}
      <div className="mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="termsAccepted"
              className={`font-medium ${formErrors.termsAccepted ? "text-red-500" : "text-gray-700"}`}
            >
              I agree to the Terms and Conditions <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500">
              By registering, you agree to our{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            {formErrors.termsAccepted && <p className="text-red-500 text-sm mt-1">{formErrors.termsAccepted}</p>}
          </div>
        </div>
      </div>
    </div>
  )

  // Render success message
  const renderSuccess = () => (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-8">
        Thank you for registering as a {formData.partnerType === "pandit" ? "Pandit" : "Bhajan Mandali"} partner. Your
        application has been submitted and is under review.
      </p>
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto text-left">
        <h3 className="font-medium text-orange-800 mb-2 flex items-center">
          <Info className="h-5 w-5 mr-2 text-orange-600" />
          What happens next?
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-2">
          <li>Our team will review your application within 2-3 business days.</li>
          <li>You will receive an email notification once your account is approved.</li>
          <li>After approval, you can start receiving bookings through our platform.</li>
        </ol>
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => (window.location.href = "/dashboard")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-orange-200">
          {/* Progress Steps */}
          {!success && (
            <div className="px-6 py-4 bg-orange-50 border-b border-orange-100">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep >= step ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step ? <CheckCircle className="h-5 w-5" /> : <span>{step}</span>}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <p className={`text-sm font-medium ${currentStep >= step ? "text-orange-800" : "text-gray-500"}`}>
                        {step === 1 && "Basic Info"}
                        {step === 2 && "Location"}
                        {step === 3 && (formData.partnerType === "pandit" ? "Professional" : "Mandali")}
                        {step === 4 && "Documents"}
                      </p>
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-12 sm:w-24 h-1 mx-2 ${currentStep > step ? "bg-orange-600" : "bg-gray-200"}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Registration Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {success ? (
                renderSuccess()
              ) : (
                <>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-6 py-2 border border-orange-200 text-orange-700 rounded-lg hover:bg-orange-50"
                      >
                        Previous
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Registration"
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegistration

