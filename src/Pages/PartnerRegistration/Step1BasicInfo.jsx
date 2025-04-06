import React from 'react';
import {
  User,
  Mail,
  Phone,
  Users,
  Lock,
  Eye,
  EyeOff,
  CheckCircle
} from "lucide-react";

const Step1BasicInfo = ({
  formData,
  formErrors,
  onChange,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  genderOptions
}) => {
  const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = () => {
        if (!password) return 0;
        
        let strength = 0;
        if (password.length <= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
        
        return Math.min(strength, 4);
      };
  
    const strength = getStrength();
    const strengthText = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][strength];
    const strengthColor = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-green-600'][strength];
    
    return (
      <div className="mt-1">
        <div className="flex items-center text-xs">
          <span className="mr-2">Password strength:</span>
          <span className={`font-medium ${strengthColor}`}>{strengthText}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div 
            className={`h-1.5 rounded-full ${strengthColor.replace('text', 'bg')}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
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
          onClick={() => onChange({ target: { name: 'partnerType', value: 'pandit' }})}
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
              src="/image/Updates/pandit.webp"
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
          onClick={() => onChange({ target: { name: 'partnerType', value: 'mandali' } })}
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
              src="/image/Updates/bhajan.webp"
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
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
          <PasswordStrengthIndicator password={formData.password} />
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
              onChange={onChange}
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
  );
}

export default Step1BasicInfo