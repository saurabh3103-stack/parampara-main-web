import React, { useState } from "react";
import { submitOrder } from "./EStoreService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EStoeUserOrderDetails = ({ cartItems, currencySymbol }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOfferChecked, setIsOfferChecked] = useState(false);
  const isSubmitEnabled = isTermsChecked && isOfferChecked;

  const [formData, setFormData] = useState({
    cartId: cartItems[0]?._id,
    userId: cartItems[0]?.user_id || "",
    username: cartItems[0]?.username || "",
    contactNumber: cartItems[0]?.userphone || "",
    email: userEmail || "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    specialNote: "",
    poojaType: cartItems[0]?.productType || "",
    products: cartItems.map(item => ({
      product_id: item.product_id || "",
      product_name: item.product_name || "",
      amount: item.product_amount || "",
      quantity: item.quantity || "",
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (formData.poojaType !== "Pooja") {
      toast.error("Invalid product type. Only Pooja orders are supported.");
      return;
    }
    try {
      const response = await submitOrder(formData);
      if (response.success) {
        toast.success("Order submitted successfully!");
        const order_id = response.orderData.order.orderId;
        navigate("/e-store/order-preview/" + order_id);
      } else {
        toast.error(response.error || "Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="mt-7 space--8" method="post" onSubmit={handleSubmit} style={{ width: "100%" }}>
        {/* Personal Details Section */}
        <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
          <div className="w-full space-y-6">
            <div className="text-lg font-semibold">1. Customer details</div>
            {/* Full Name Fields */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Full Name <span className="text-red-500">*</span>
              </div>
              <div className="flex w-full flex-col items-center space-x-0 space-y-4 sm:w-2/3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="w-full rounded bg-gray-100">
                  <input
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Phone <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Email address <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Apt/Suite */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Apt/Suite/Building <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="aptSuite"
                  value={formData.aptSuite}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Street address <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* City/Town */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                City/Town <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* State/Province */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                State/Province <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Zip Code */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Zip code <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Country */}
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full sm:w-1/3">
                Country <span className="text-red-500">*</span>
              </div>
              <div className="w-full rounded bg-gray-100 sm:w-2/3">
                <input
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes Section */}
        <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
          <div className="w-full space-y-6">
            <div className="text-lg font-semibold">2. Special Notes</div>
            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
              <div className="w-full rounded bg-gray-100 ">
                <textarea
                  className="focus:border-primary-500 border-gray-500 focus:ring-primary-500 block w-full rounded border-transparent  p-2.5 text-sm text-gray-900"
                  name="specialNote"
                  value={formData.specialNote}
                  onChange={handleChange}
                  rows="5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
          <div className="w-full space-y-6">
            <div className="flex space-x-2 items-center">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={isTermsChecked}
                onChange={() => setIsTermsChecked(!isTermsChecked)}
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            <div className="flex space-x-2 items-center">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                checked={isOfferChecked}
                onChange={() => setIsOfferChecked(!isOfferChecked)}
              />
              <label htmlFor="offer">I would like to receive offers and updates</label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-3">
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className="disabled:opacity-50 w-full py-3 bg-primary text-white rounded text-sm"
          >
            Place Order
          </button>
        </div>
      </form>
    </>
  );
};

export default EStoeUserOrderDetails;