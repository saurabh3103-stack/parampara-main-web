import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { submitOrder } from "./EStoreService";
import { toast } from "react-toastify";
import { MapPin, CreditCard, Info } from "lucide-react";

const EStoeUserOrderDetails = ({ formData, setFormData, cartItems, isTermsChecked, setIsTermsChecked, isOffersChecked, setIsOffersChecked, calculateSubtotal, calculateShipping, calculateTax, calculateTotal, currencySymbol }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTermsChecked) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await submitOrder(formData);
      if (response.success) {
        toast.success("Order submitted successfully!");
        navigate(`/e-store/order-preview/${response.orderData.order.orderId}`);
      } else {
        toast.error(response.error || "Failed to submit order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Customer Details */}
      <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 p-4">
          <h2 className="text-orange-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
              1
            </span>
            Customer Details
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-orange-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="text-orange-800">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-orange-800">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 p-4">
          <h2 className="text-orange-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
              2
            </span>
            Shipping Address
          </h2>
        </div>
        <div className="p-6 space-y-4">
        <div className="space-y-2">
            <label htmlFor="address" className="text-orange-800">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="streetAddress" className="text-orange-800">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="city" className="text-orange-800">
                City/Town <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-orange-800">
                State/Province <span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-orange-800">
                Zip/Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-orange-800">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Notes */}
      <div className="mb-6 border border-orange-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 p-4">
          <h2 className="text-orange-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
              3
            </span>
            Special Notes
          </h2>
        </div>
        <div className="p-6">
          <textarea
            id="specialNote"
            name="specialNote"
            value={formData.specialNote}
            onChange={handleChange}
            className="w-full border border-orange-200 rounded-md p-2 focus:border-orange-400 min-h-[100px]"
            placeholder="Any special requirements for your pooja..."
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6 border-orange-200 shadow-sm">
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
              className="text-orange-600 border-orange-300"
            />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{" "}
              <Link to="#" className="text-orange-600 hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="offers"
              checked={isOffersChecked}
              onChange={(e) => setIsOffersChecked(e.target.checked)}
              className="text-orange-600 border-orange-300"
            />
            <label htmlFor="offers" className="text-sm cursor-pointer">
              I would like to receive offers and updates
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 text-lg"
        disabled={!isTermsChecked}
      >
        Place Order
      </button>
    </form>
  );
};

export default EStoeUserOrderDetails;