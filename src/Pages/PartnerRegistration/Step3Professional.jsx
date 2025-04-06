import React from 'react';
import {
  Star,
  Calendar,
  Globe,
  Book,
  Music,
  Users,
  CreditCard,
  PlusCircle,
  MinusCircle
} from "lucide-react";

const Step3Professional = ({
  formData,
  formErrors,
  onChange,
  onMultiSelectChange,
  onAddMandaliMember,
  onRemoveMandaliMember,
  onMandaliMemberChange
}) => {
  // Options for select fields
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
  ];
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
  ];
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
  ];
  const availabilityOptions = ["Weekdays", "Weekends", "Mornings", "Evenings", "Full Day", "Specific Hours", "On Call"];
  const mandaliCategoryOptions = [
    "Bhajan",
    "Kirtan",
    "Devotional Songs",
    "Spiritual Music",
    "Folk Devotional",
    "Classical Devotional",
    "Instrumental",
    "Mixed",
  ];

  return (
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
                    onChange={() => onMultiSelectChange("specialization", option)}
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
              onChange={onChange}
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
                    onChange={() => onMultiSelectChange("languages", option)}
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
                    onChange={() => onMultiSelectChange("poojaTypes", option)}
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
                    onChange={() => onMultiSelectChange("availability", option)}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
                onClick={onAddMandaliMember}
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
                      onClick={() => onRemoveMandaliMember(index)}
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
                      onChange={(e) => onMandaliMemberChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Member name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => onMandaliMemberChange(index, "role", e.target.value)}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Singer, Tabla, Harmonium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Experience (Years)</label>
                    <input
                      type="number"
                      value={member.experience}
                      onChange={(e) => onMandaliMemberChange(index, "experience", e.target.value)}
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
  );
};

export default Step3Professional;