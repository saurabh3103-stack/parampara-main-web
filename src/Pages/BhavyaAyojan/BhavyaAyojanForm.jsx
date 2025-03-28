"use client"

import  React from "react"
import { useState } from "react"
import { Calendar, MapPin, Users, Clock, FileText } from "lucide-react"

export default function BhavyaAyojanForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    eventType: "",
    occasion: "",
    location: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    numberOfGuests: "",
    specialRequirements: "",
  })

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("आपका अनुरोध सफलतापूर्वक प्राप्त हुआ है। हम जल्द ही आपसे संपर्क करेंगे।");
  };


  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header with pattern background */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">श्री भव्य अयोजन</h1>
        <p className="text-amber-100 max-w-2xl mx-auto">
          अपने विशेष अवसरों के लिए पारंपरिक और धार्मिक समारोह का आयोजन करें। हमारी सेवाएँ आपके घर या किसी भी स्थान पर उपलब्ध हैं।
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 rounded-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-orange-700 mb-4">भव्य अयोजन क्यों?</h2>
                <p className="text-gray-700 mb-6">
                  भव्य अयोजन पारंपरिक धार्मिक समारोहों का आयोजन है जो सदियों से हमारी संस्कृति का हिस्सा रहा है। यह मान्यता है कि इससे
                  घर में सकारात्मक ऊर्जा आती है और सभी बाधाएं दूर होती हैं।
                </p>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex items-center text-orange-700 font-semibold mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-orange-600" />
                      </div>
                      प्रातः अनुष्ठान
                    </div>
                    <p className="text-sm text-gray-600">शुभ मुहूर्त में पारंपरिक विधि से आयोजित</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex items-center text-orange-700 font-semibold mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-orange-600" />
                      </div>
                      सायं अनुष्ठान
                    </div>
                    <p className="text-sm text-gray-600">विशेष पूजा और प्रसाद के साथ संध्या समारोह</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex items-center text-orange-700 font-semibold mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-orange-600" />
                      </div>
                      विशेष अवसर
                    </div>
                    <p className="text-sm text-gray-600">जन्मदिन, विवाह, गृहप्रवेश, और अन्य महत्वपूर्ण अवसर</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-center text-orange-700 mb-6">भव्य अयोजन बुकिंग</h2>
              <p className="text-center text-gray-600 mb-8">अपने समारोह की जानकारी भरें और हम आपसे संपर्क करेंगे</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-orange-800 block">
                      पूरा नाम <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="अपना पूरा नाम दर्ज करें"
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-orange-800 block">
                      ईमेल <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="आपका ईमेल पता"
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-orange-800 block">
                      फोन नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="आपका संपर्क नंबर"
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-orange-800 block">
                      तिथि <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                    </div>
                  </div>

                  {/* Event Type */}
                  <div className="space-y-2">
                    <label className="text-orange-800 block">
                      अयोजन प्रकार <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="eventType"
                          value="satvik"
                          id="satvik"
                          checked={formData.eventType === "satvik"}
                          onChange={() => handleRadioChange("eventType", "satvik")}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <label htmlFor="satvik" className="cursor-pointer">
                          सात्विक
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="eventType"
                          value="traditional"
                          id="traditional"
                          checked={formData.eventType === "traditional"}
                          onChange={() => handleRadioChange("eventType", "traditional")}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <label htmlFor="traditional" className="cursor-pointer">
                          पारंपरिक
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="eventType"
                          value="special"
                          id="special"
                          checked={formData.eventType === "special"}
                          onChange={() => handleRadioChange("eventType", "special")}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <label htmlFor="special" className="cursor-pointer">
                          विशेष
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="space-y-2">
                    <label htmlFor="occasion" className="text-orange-800 block">
                      अवसर <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      required
                    >
                      <option value="" disabled>
                        अवसर चुनें
                      </option>
                      <option value="griha-pravesh">गृह प्रवेश</option>
                      <option value="janmotsav">जन्मोत्सव</option>
                      <option value="vivah">विवाह</option>
                      <option value="mundan">मुंडन संस्कार</option>
                      <option value="upanayana">उपनयन संस्कार</option>
                      <option value="shradh">श्राद्ध</option>
                      <option value="other">अन्य</option>
                    </select>
                  </div>

                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <label htmlFor="numberOfGuests" className="text-orange-800 block">
                      अतिथियों की संख्या <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="numberOfGuests"
                        name="numberOfGuests"
                        type="number"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        placeholder="अतिथियों की संख्या"
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                        required
                      />
                      <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                    </div>
                  </div>

                  {/* Location Type */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-orange-800 block">
                      स्थान <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="समारोह का स्थान"
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                        required
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="pt-4 border-t border-orange-100">
                  <h3 className="text-lg font-medium text-orange-800 mb-4">पूरा पता</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Street */}
                    <div className="space-y-2">
                      <label htmlFor="street" className="text-orange-800 block">
                        सड़क/गली <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="सड़क/गली का नाम"
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-orange-800 block">
                        शहर <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="शहर का नाम"
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-orange-800 block">
                        राज्य <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      >
                        <option value="" disabled>
                          राज्य चुनें
                        </option>
                        <option value="andhra-pradesh">आंध्र प्रदेश</option>
                        <option value="arunachal-pradesh">अरुणाचल प्रदेश</option>
                        <option value="assam">असम</option>
                        <option value="bihar">बिहार</option>
                        <option value="chhattisgarh">छत्तीसगढ़</option>
                        <option value="delhi">दिल्ली</option>
                        <option value="goa">गोवा</option>
                        <option value="gujarat">गुजरात</option>
                        <option value="haryana">हरियाणा</option>
                        <option value="himachal-pradesh">हिमाचल प्रदेश</option>
                        <option value="jharkhand">झारखंड</option>
                        <option value="karnataka">कर्नाटक</option>
                        <option value="kerala">केरल</option>
                        <option value="madhya-pradesh">मध्य प्रदेश</option>
                        <option value="maharashtra">महाराष्ट्र</option>
                        <option value="manipur">मणिपुर</option>
                        <option value="meghalaya">मेघालय</option>
                        <option value="mizoram">मिजोरम</option>
                        <option value="nagaland">नागालैंड</option>
                        <option value="odisha">ओडिशा</option>
                        <option value="punjab">पंजाब</option>
                        <option value="rajasthan">राजस्थान</option>
                        <option value="sikkim">सिक्किम</option>
                        <option value="tamil-nadu">तमिलनाडु</option>
                        <option value="telangana">तेलंगाना</option>
                        <option value="tripura">त्रिपुरा</option>
                        <option value="uttar-pradesh">उत्तर प्रदेश</option>
                        <option value="uttarakhand">उत्तराखंड</option>
                        <option value="west-bengal">पश्चिम बंगाल</option>
                      </select>
                    </div>

                    {/* Pin Code */}
                    <div className="space-y-2">
                      <label htmlFor="pinCode" className="text-orange-800 block">
                        पिन कोड <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="पिन कोड"
                        className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <label htmlFor="specialRequirements" className="text-orange-800 block">
                    विशेष आवश्यकताएँ
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="कोई विशेष आवश्यकता या निर्देश"
                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-md transition-all duration-300 text-lg font-medium"
                >
                  भव्य अयोजन बुक करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

