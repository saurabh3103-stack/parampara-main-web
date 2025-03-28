import {
  ShoppingBag,
  Search,
  ChevronDown,
  Download,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const OrdersTable = ({
  activeTab,
  filteredOrders,
  searchTerm,
  filterStatus,
  filterYear,
  yearOptions,
  sortBy,
  sortDirection,
  onSearchChange,
  onFilterStatusChange,
  onFilterYearChange,
  onSortChange,
  onViewOrder,
  onDownloadInvoice,
  getStatusClass,
  getStatusIcon,
  getStatusDisplayText,
  setActiveTab,
  setSearchTerm,
  setFilterStatus,
  setFilterYear
}) => {
  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 text-orange-600" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 text-orange-600" />
    )
  }

  return (
    <div className="bg-white rounded-xl border border-orange-200 shadow-md overflow-hidden mt-8">
      <div className="p-6 border-b border-orange-100">
        <h2 className="text-xl font-semibold text-orange-800 flex items-center">
          <ShoppingBag className="h-5 w-5 text-orange-600 mr-2" />
          My Orders
        </h2>
        <p className="text-gray-600 mt-1">View and track all your orders and bookings in one place.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-orange-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab("ecommerce")}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "ecommerce" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Ecommerce Orders
          </button>
          <button
            onClick={() => setActiveTab("pooja")}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "pooja" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Pooja Bookings
          </button>
          <button
            onClick={() => setActiveTab("bhajan")}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "bhajan" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Bhajan Bookings
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-orange-50 border-b border-orange-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'ecommerce' ? 'orders' : 'bookings'} by ID or name...`}
              className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                value={filterStatus}
                onChange={(e) => onFilterStatusChange(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="accepted">Accepted</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                value={filterYear}
                onChange={(e) => onFilterYearChange(e.target.value)}
              >
                <option value="all">All Years</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange("name")}
                >
                  {activeTab === 'ecommerce' ? 'Order' : 'Booking'} Details
                  {getSortIcon("name")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange("date")}
                >
                  Date
                  {getSortIcon("date")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange("status")}
                >
                  Status
                  {getSortIcon("status")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange("price")}
                >
                  Total
                  {getSortIcon("price")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 mr-4 bg-orange-50 rounded-md overflow-hidden">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{order.name}</div>
                        <div className="text-sm text-gray-500">{order.id}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {activeTab === 'ecommerce' ? 'Product' : 
                           activeTab === 'pooja' ? 'Pooja' : 'Bhajan'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.formattedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)} inline-flex items-center`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusDisplayText(order.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-orange-700">₹{order.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="text-orange-600 hover:text-orange-800 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <ShoppingBag className="h-12 w-12 text-orange-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      No {activeTab === 'ecommerce' ? 'orders' : 'bookings'} found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm || filterStatus !== "all" || filterYear !== "all"
                        ? "Try adjusting your filters to see more results"
                        : `You haven't placed any ${activeTab === 'ecommerce' ? 'orders' : 'bookings'} yet`}
                    </p>
                    {(searchTerm || filterStatus !== "all" || filterYear !== "all") && (
                      <button
                        onClick={() => {
                          setSearchTerm("")
                          setFilterStatus("all")
                          setFilterYear("all")
                        }}
                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
                      >
                        Clear Filters
                      </button>
                    )}
                    {!searchTerm && filterStatus === "all" && filterYear === "all" && (
                      <a
                        href={activeTab === 'ecommerce' ? "/shop" : "/poojas"}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        Browse {activeTab === 'ecommerce' ? 'Products' : 'Poojas'}
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (simplified) */}
      {filteredOrders.length > 0 && (
        <div className="px-6 py-4 bg-orange-50 border-t border-orange-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1-{filteredOrders.length}</span> of <span className="font-medium">{filteredOrders.length}</span> {activeTab === 'ecommerce' ? 'orders' : 'bookings'}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-orange-200 rounded bg-white text-gray-600 hover:bg-orange-100">
              Previous
            </button>
            <button className="px-3 py-1 border border-orange-200 rounded bg-orange-600 text-white">1</button>
            <button className="px-3 py-1 border border-orange-200 rounded bg-white text-gray-600 hover:bg-orange-100">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersTable