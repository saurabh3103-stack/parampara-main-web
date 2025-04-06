import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gift, Download, Share2,CheckCircle  } from "lucide-react";
import { fetchOrderReceipt } from "./OrderPlace";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ReceiptDetails from "./ReceiptDetails";

const BookingReceipt = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currencySymbol = "₹";
  const receiptRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderReceipt(id);
        setOrderData(data.orderReceipt);
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError("Failed to fetch order data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const downloadReceiptAsPdf = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#fffaf0"
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5"
      });

      // Add watermark
      const watermarkText = "BhajanMandali.com";
      pdf.setFontSize(40);
      pdf.setTextColor(240, 240, 240);
      pdf.text(watermarkText, 30, 100, { angle: 45 });

      // Add receipt content
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      
      const fileName = `${orderData?.bookingDetails?.Type}_Receipt_${orderData?.bookingId}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF receipt");
    }
  };

  const handleShareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: `My ${orderData?.bookingDetails?.Type} Booking Receipt`,
        text: `Booking #${id} confirmation`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <SpecialOffersBanner />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HeaderSection isBhajanMandali={orderData?.bookingDetails?.Type === "Bhajan Mandali"} />
        
        {/* Receipt content */}
        <div ref={receiptRef}>
          <ReceiptDetails orderData={orderData} currencySymbol={currencySymbol} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={downloadReceiptAsPdf}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center shadow-md"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Receipt (PDF)
          </button>
          <button
            onClick={handleShareReceipt}
            className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg flex items-center shadow-md"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components (same as before)
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-orange-800">Loading your receipt...</p>
    </div>
  </div>
);

const ErrorDisplay = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
      <p className="text-red-600">{error}</p>
      <Link to="/">
        <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
          Return Home
        </button>
      </Link>
    </div>
  </div>
);

const SpecialOffersBanner = () => (
  <div className="w-full bg-orange-100 border-t-4 border-orange-500">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5 text-orange-600" />
        <p className="text-sm">
          <span className="font-semibold">Special Offers.</span> We found offers available for future bookings.
        </p>
      </div>
      <Link to="#" className="text-orange-700 hover:underline text-sm font-medium">
        See All Deals & Offers
      </Link>
    </div>
  </div>
);

const HeaderSection = ({ isBhajanMandali }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2">
      <CheckCircle className="h-6 w-6 text-orange-600" />
      <h1 className="text-2xl font-bold text-orange-800">
        {isBhajanMandali ? "Bhajan Mandal" : "Pooja"} Booking Receipt
      </h1>
    </div>
    <Link to="/">
      <button className="border border-orange-300 text-orange-700 hover:bg-orange-100 px-4 py-2 rounded flex items-center">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </button>
    </Link>
  </div>
);

export default BookingReceipt;