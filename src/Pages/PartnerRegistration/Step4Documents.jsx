import React from 'react';
import { FileText, Globe, CreditCard, Image, Upload, X } from "lucide-react";

export default function Step4Documents({
  formData,
  formErrors,
  previewImages,
  onChange,
  onFileChange,
  setFormData,
  setPreviewImages
}) {
  const handleFileChange = (fieldName, files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPreviewImages(prev => ({ ...prev, [fieldName]: reader.result }));
      };
      
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  return (
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
            onChange={onChange}
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
            onChange={onChange}
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
              name="facebook"
              value={formData.socialMedia?.facebook || ''}
              onChange={(e) => onChange({
                target: {
                  name: 'socialMedia',
                  value: {
                    ...formData.socialMedia,
                    facebook: e.target.value
                  }
                }
              })}
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
              name="instagram"
              value={formData.socialMedia?.instagram || ''}
              onChange={(e) => onChange({
                target: {
                  name: 'socialMedia',
                  value: {
                    ...formData.socialMedia,
                    instagram: e.target.value
                  }
                }
              })}
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
              name="youtube"
              value={formData.socialMedia?.youtube || ''}
              onChange={(e) => onChange({
                target: {
                  name: 'socialMedia',
                  value: {
                    ...formData.socialMedia,
                    youtube: e.target.value
                  }
                }
              })}
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
            onChange={onChange}
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
                    src={previewImages.aadharImage}
                    alt="Aadhar Card Preview"
                    className="h-full mx-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, aadharImage: null }));
                      setPreviewImages(prev => ({ ...prev, aadharImage: null }));
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
                onChange={(e) => onFileChange("aadharImage", e.target.files)}
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
                  src={previewImages.profileImage}
                  alt="Profile Preview"
                  className="h-full mx-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, profileImage: null }));
                    setPreviewImages(prev => ({ ...prev, profileImage: null }));
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
              onChange={(e) => onFileChange("profileImage", e.target.files)}
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
              onChange={onChange}
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
  );
}