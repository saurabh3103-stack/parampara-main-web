import { Info } from "lucide-react";

const SuccessMessage = ({ partnerType, userId, onReset }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="max-w-md mx-auto">
        {/* Success animation placeholder */}
        <div className="h-64 flex items-center justify-center">
          <div className="text-6xl">🎉</div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-4">
        Thank you for registering as a {partnerType === "pandit" ? "Pandit" : "Bhajan Mandali"} partner.
      </p>
      
      {userId && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 inline-block">
          <p className="text-orange-800 font-medium">
            Your Partner ID: <span className="font-bold">{userId}</span>
          </p>
        </div>
      )}
      
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto text-left mb-8">
        <h3 className="font-medium text-orange-800 mb-2 flex items-center">
          <Info className="h-5 w-5 mr-2 text-orange-600" />
          What happens next?
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 pl-2">
          <li>Our team will review your application within 2-3 business days.</li>
          <li>You will receive an email notification once your account is approved.</li>
          <li>After approval, you can start receiving bookings through our platform.</li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          type="button"
          onClick={() => window.location.href = "/"}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Go to Home
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Register Another Partner
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;