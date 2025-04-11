import React from "react"; 
import { useState,useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Flag,
  Globe,
  ImageIcon,
  Users,
  Navigation,
} from "lucide-react";
import { OmSymbol } from "./DevotionalIcons";

const UserProfileForm = ({
  userData,
  isEditing,
  formErrors,
  imagePreview,
  isUpdating,
  isFetchingLocation,
  handleChange,
  handleImageChange,
  getCurrentLocation,
  handleSubmit,
  toggleEdit,
}) => {
  const renderField = (label, value, icon, name, type = "text", required = false) => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {isEditing ? (
          <>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={value || ""}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors[name] ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                rows="3"
                required={required}
              />
            ) : type === "select" ? (
              <select
                name={name}
                value={value || ""}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors[name] ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                required={required}
              >
                <option value="">Select {label}</option>
                {name === "gender" && (
                  <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {name === "socialType" && (
                  <>
                    <option value="google">Google</option>
                    <option value="facebook">Facebook</option>
                    <option value="apple">Apple</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={value || ""}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${formErrors[name] ? "border-red-500" : "border-orange-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                required={required}
              />
            )}
            {formErrors[name] && <p className="mt-1 text-sm text-red-500">{formErrors[name]}</p>}
          </>
        ) : (
          <div className="px-4 py-3 bg-orange-50 rounded-lg border border-orange-100">
            {value ? (
              <span>{value}</span>
            ) : (
              <span className="text-gray-400">Not provided</span>
            )}
          </div>
        )}
      </div>
    );
  };
  const imgURL = 'http://192.168.1.36:3000/'

  return (
    <div className="bg-white rounded-xl border border-orange-200 shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-orange-100 bg-orange-50">
        <div className="flex items-center">
          <OmSymbol className="h-6 w-6 text-orange-600 mr-2" />
          <h2 className="text-xl font-semibold text-orange-800">Profile Information</h2>
        </div>
        <button
          onClick={toggleEdit}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
            isEditing
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          } transition-colors`}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-orange-400 mb-3">
              {imagePreview || userData.image ? (
                <img
                  src={imgURL+imagePreview || userData.image}
                  alt={userData.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-orange-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-orange-300" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-orange-100 p-1.5 rounded-full border border-orange-300 cursor-pointer">
                <ImageIcon className="h-4 w-4 text-orange-600" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-800">{userData.username || "User"}</h3>
          <p className="text-sm text-gray-500">{userData.email || "user@example.com"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-orange-800 mb-4 flex items-center">
              <User className="h-5 w-5 text-orange-600 mr-2" />
              Personal Information
            </h3>

            {renderField(
              "Full Name",
              userData.username,
              <User className="h-4 w-4 text-orange-500" />,
              "username",
              "text",
              true,
            )}
            {renderField(
              "Email Address",
              userData.email,
              <Mail className="h-4 w-4 text-orange-500" />,
              "email",
              "email",
              true,
            )}
            {renderField(
              "Mobile Number",
              userData.mobile,
              <Phone className="h-4 w-4 text-orange-500" />,
              "mobile",
              "tel",
              true,
            )}
            {renderField(
              "Alternate Number",
              userData.alternate_no,
              <Phone className="h-4 w-4 text-orange-500" />,
              "alternate_no",
            )}
            {renderField(
              "Gender",
              userData.gender,
              <Users className="h-4 w-4 text-orange-500" />,
              "gender",
              "select",
            )}
            {renderField(
              "Date of Birth",
              userData.dob,
              <Calendar className="h-4 w-4 text-orange-500" />,
              "dob",
              "date",
            )}
            {renderField(
              "Aadhar Number",
              userData.aadhar_no,
              <CreditCard className="h-4 w-4 text-orange-500" />,
              "aadhar_no",
            )}
          </div>

          {/* Address Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-orange-800 flex items-center">
                <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                Address Information
              </h3>
              {isEditing && (
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isFetchingLocation}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  {isFetchingLocation ? "Fetching..." : "Use Current Location"}
                </button>
              )}
            </div>

            {renderField(
              "Address",
              userData.address,
              <MapPin className="h-4 w-4 text-orange-500" />,
              "address",
              "textarea",
              true,
            )}
            {renderField(
              "City",
              userData.city,
              <MapPin className="h-4 w-4 text-orange-500" />,
              "city",
              "text",
              true,
            )}
            {renderField(
              "State",
              userData.state,
              <MapPin className="h-4 w-4 text-orange-500" />,
              "state",
              "text",
              true,
            )}
            {renderField(
              "Country",
              userData.country,
              <Flag className="h-4 w-4 text-orange-500" />,
              "country",
              "text",
              true,
            )}
            {renderField(
              "Pincode",
              userData.pincode,
              <MapPin className="h-4 w-4 text-orange-500" />,
              "pincode",
              "text",
              true,
            )}
            {renderField(
              "Landmark",
              userData.landmark,
              <MapPin className="h-4 w-4 text-orange-500" />,
              "landmark",
            )}
            {renderField(
              "Social Type",
              userData.socialType,
              <Globe className="h-4 w-4 text-orange-500" />,
              "socialType",
              "select",
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={toggleEdit}
              className="px-6 py-2 mr-4 border border-orange-200 rounded-lg text-orange-700 hover:bg-orange-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfileForm;