import {
  ShoppingBag,
  Calendar,
  Download,
  Eye,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  X,
} from "lucide-react"

const OrderDetailsModal = ({ 
  selectedOrder, 
  onClose, 
  onDownloadInvoice,
  getStatusClass,
  getStatusIcon,
  getStatusDisplayText
}) => {
  if (!selectedOrder) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-orange-100 p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-orange-800">Order Details</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-orange-100 text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{selectedOrder.name}</h2>
              <p className="text-gray-600">Order #{selectedOrder.id}</p>
              <p className="text-gray-600">Placed on {selectedOrder.formattedDate}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedOrder.status)} flex items-center`}
              >
                {getStatusIcon(selectedOrder.status)}
                <span className="ml-1">{getStatusDisplayText(selectedOrder.status)}</span>
              </span>
              <button
                onClick={() => onDownloadInvoice(selectedOrder.id)}
                className="mt-2 flex items-center text-sm text-orange-600 hover:text-orange-800"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Invoice
              </button>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-orange-800 mb-6">Order Timeline</h3>
            
            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-orange-200"></div>
              
              {/* Timeline Items */}
              <div className="relative flex">
                {selectedOrder.timeline.map((event, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    {/* Timeline Dot with Icon */}
                    <div className={`
                      relative w-8 h-8 rounded-full flex items-center justify-center mb-2
                      ${event.completed ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"}
                    `}>
                      {event.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    
                    {/* Status and Date */}
                    <div className="text-center px-2">
                      <p className={`font-medium ${event.completed ? "text-orange-800" : "text-gray-500"}`}>
                        {event.status}
                      </p>
                      {event.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {event.date}
                        </p>
                      )}
                    </div>
                    
                    {/* Connector Line (except last item) */}
                    {index < selectedOrder.timeline.length - 1 && (
                      <div className="absolute top-4 left-3/4 right-0 h-0.5 bg-orange-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-orange-800 mb-4">Order Items</h3>
            <div className="border border-orange-200 rounded-lg overflow-hidden">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="p-4 border-b border-orange-100 flex items-center">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-orange-50 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-medium text-orange-700">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-orange-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>₹{selectedOrder.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-orange-800">
                  <span>Total:</span>
                  <span>₹{selectedOrder.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-orange-800 mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                <p className="text-gray-600">
                  {selectedOrder.shipping.address}
                  <br />
                  {selectedOrder.shipping.city}, {selectedOrder.shipping.state}
                  <br />
                  {selectedOrder.shipping.pincode}, {selectedOrder.shipping.country}
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-medium text-gray-700 mb-2">Payment Information</h4>
                <p className="text-gray-600">
                  Method: {selectedOrder.payment.method}
                  <br />
                  {selectedOrder.payment.method === "Credit Card" &&
                    `Card ending in ${selectedOrder.payment.last4}`}
                  <br />
                  Status: {selectedOrder.payment.status}
                </p>
              </div>
            </div>
          </div>

          {/* Pooja/Bhajan Details */}
          {(selectedOrder.type === 'pooja' || selectedOrder.type === 'bhajan') && (
            <div>
              <h3 className="text-lg font-medium text-orange-800 mb-4">
                {selectedOrder.type === 'pooja' ? 'Pooja' : 'Bhajan'} Details
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-orange-500" />
                      {selectedOrder.date.toLocaleDateString()} at {selectedOrder.type === 'pooja' ? '10:00 AM' : '07:00 PM'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                      {selectedOrder.type === 'pooja' ? 'Shri Kashi Vishwanath Temple' : 'Local Temple'}
                    </p>
                  </div>

                  {selectedOrder.type === 'pooja' ? (
                    <div>
                      <p className="text-sm text-gray-600">Priest</p>
                      <p className="font-medium">Pandit Sharma Ji</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">Organizer</p>
                      <p className="font-medium">Mandali Group</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">
                      {selectedOrder.type === 'pooja' ? '2 hours' : '1 hour'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-200">
                  <p className="text-sm text-gray-600">Special Instructions</p>
                  <p className="font-medium">
                    {selectedOrder.type === 'pooja' 
                      ? 'Please bring flowers and fruits' 
                      : 'Please arrive 15 minutes early'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-orange-100 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsModal