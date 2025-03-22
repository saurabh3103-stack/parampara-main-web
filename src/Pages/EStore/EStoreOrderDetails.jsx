import React from "react";
import { NotebookIcon as Lotus, Info } from "lucide-react";

const EStoreOrderDetails = ({ previewData, deliveryAddress }) => {
    console.log(previewData.order);
    // const previewData = previewData.order;
  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <div className="bg-white border border-orange-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 p-4">
          <h2 className="text-orange-800 flex items-center gap-2 font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
              1
            </span>
            Customer Details
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-600 block">Name</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {previewData.order?.userDetails?.username}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 block">Contact Number</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {previewData.order?.userDetails?.contactNumber}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-600 block">Email Address</label>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
              {previewData.order?.userDetails?.email}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white border border-orange-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 p-4">
          <h2 className="text-orange-800 flex items-center gap-2 font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-sm">
              2
            </span>
            Delivery Address
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-gray-600 block">Address</label>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
              {deliveryAddress?.DeliveryAddress?.AddressLine1}{" "}
              {deliveryAddress?.DeliveryAddress?.AddressLine2}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-600 block">City</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {deliveryAddress?.DeliveryAddress?.City}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 block">State</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {deliveryAddress?.DeliveryAddress?.State}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-600 block">Postal Code</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {deliveryAddress?.DeliveryAddress?.PostalCode}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 block">Country</label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {deliveryAddress?.DeliveryAddress?.Country}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Information */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-5 w-5 text-orange-600" />
          <h3 className="font-medium text-orange-800">Booking Information</h3>
        </div>
        <p className="text-gray-700 mb-2">
          BookMypooja Team will contact you soon to confirm the auspicious dates for your ceremony.
        </p>
        <p className="text-gray-700">
          For any queries, please contact our customer support at{" "}
          <span className="text-orange-700">support@bookpooja.com</span>
        </p>
      </div>
    </div>
  );
};

export default EStoreOrderDetails;