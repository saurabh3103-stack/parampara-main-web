import React from "react";
import { Calendar, Clock, CheckCircle } from "lucide-react";

const ReceiptDetails = ({ orderData, currencySymbol }) => {
  const isBhajanMandali = orderData?.bookingDetails?.Type === "Bhajan Mandali";
  const isPooja = orderData?.bookingDetails?.Type === "Pooja";

  const calculateSubtotal = () => orderData?.paymentDetails?.amount || 0;
  const calculateShipping = () => 0;
  const calculateTax = () => 0;
  const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax();

  return (
    <div className="border border-orange-200 bg-amber-50 rounded-lg shadow-sm p-8 relative">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-6xl font-bold text-amber-100 opacity-30 rotate-45">
          BhajanMandali.com
        </div>
      </div>
      
      {/* Company Header */}
      <div className="flex flex-col items-center mb-6">
        <img src={'/image/logo/final-logo.png'} alt="Company Logo" className="h-16 mb-4" />
        <h1 className="text-2xl font-bold text-orange-800">Booking Confirmation</h1>
        <p className="text-sm text-gray-600">Receipt ID: {orderData?.bookingId}</p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SectionHeading title="Booking Information" />
            <DetailItem label="Receipt ID" value={orderData?.bookingId} />
            <DetailItem label="Booking Date" value={new Date(orderData?.createdAt).toLocaleDateString()} />
            <DetailItem label="Payment Method" value="Online Payment" />
            <DetailItem 
              label="Payment Status" 
              value={orderData?.transactionDetails?.transactionStatus || 'Paid'} 
              highlight 
            />
          </div>
          
          <div className="space-y-4">
            <SectionHeading title="Customer Details" />
            <DetailItem label="Name" value={orderData?.userDetails?.username} />
            <DetailItem label="Contact Number" value={orderData?.userDetails?.contactNumber} />
            <DetailItem label="Email Address" value={orderData?.userDetails?.email} />
          </div>
        </div>

        <hr className="border-orange-200" />

        {/* Booking Summary */}
        <div>
          <SectionHeading title="Booking Summary" />
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded overflow-hidden border border-orange-200">
                <img
                  src="/placeholder.svg"
                  alt={isBhajanMandali ? "Bhajan Mandali" : "Pooja"}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-orange-800">
                  {isBhajanMandali 
                    ? orderData?.bookingDetails?.mandaliName 
                    : orderData?.bookingDetails?.poojaName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(orderData?.schedule?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{orderData?.schedule?.time}</span>
                </div>
                {isPooja && orderData?.bookingDetails?.isSamagriIncluded && (
                  <div className="text-sm text-green-600 mt-1">
                    ✓ Includes Samagri
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Qty: {orderData?.paymentDetails?.quantity || 1}</div>
                <div className="font-medium text-orange-800 mt-1">
                  {currencySymbol}
                  {(orderData?.paymentDetails?.amount || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>{currencySymbol}{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span>{currencySymbol}{calculateShipping().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span>{currencySymbol}{calculateTax().toFixed(2)}</span>
            </div>
            <hr className="my-2 border-orange-100" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-orange-800">Total:</span>
              <span className="text-orange-800">
                {currencySymbol}{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <SectionHeading title="Payment Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Transaction ID" value={orderData?.transactionDetails?.transactionId} />
            <DetailItem 
              label="Transaction Date" 
              value={new Date(orderData?.transactionDetails?.transactionDate).toLocaleString()} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Thank you for your booking!</p>
          <p>For any queries, please contact support@bhajanmandali.com</p>
          <p className="mt-2">© {new Date().getFullYear()} BhajanMandali.com. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Helper components for ReceiptDetails
const SectionHeading = ({ title }) => (
  <h3 className="text-lg font-semibold text-orange-800 mb-2">{title}</h3>
);

const DetailItem = ({ label, value, highlight = false }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className={`font-medium ${highlight ? "text-green-600 bg-green-50 px-2 py-1 rounded inline-block" : ""}`}>
      {value}
    </p>
  </div>
);

export default ReceiptDetails;