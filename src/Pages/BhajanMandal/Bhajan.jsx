// Bhajan.jsx
import React, { useEffect, useState } from "react";
import { fetchCategories, fetchBhajanByCategory } from "./BhajanService";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Shop/Pagination";
import PoojaTopBanner from "../PoojaBooking/PoojaTopBanner";
import { useMobile } from "../../hooks/use-mobile";
import BhajanCategory from "./BhajanCategory";
import BhajanFilterLeft from "./BhajanFilterLeft";
import BhajanFilterRight from "./BhajanFilterRight";

const Bhajan = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMobile();
  const currencySymbol = "₹";
  const imgUrl = "http://192.168.1.36:3000";

  // State for filters
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [productStatus, setProductStatus] = useState([]);

  // Helper function to get category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.category : "Uncategorized";
  };

  // Fetch Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data?.data || []);
      } catch (error) {
        setError("Failed to load categories");
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);

  // Fetch Bhajans based on selected category
  useEffect(() => {
    const loadBhajans = async () => {
      try {
        setLoading(true);
        const data = await fetchBhajanByCategory(selectedCategory);
        setBhajans(data?.data || []);
      } catch (error) {
        setError("Failed to load bhajans");
        console.error("Failed to load bhajans", error);
      } finally {
        setLoading(false);
      }
    };
    loadBhajans();
  }, [selectedCategory]);

  // Apply filters
  const applyFilters = () => {
    console.log("Applying Filters:", { priceRange, selectedRatings, productStatus });
  };

  // Pagination logic
  const totalPages = Math.ceil(bhajans.length / itemsPerPage);
  const paginatedBhajans = bhajans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format price
  const formatPrice = (price) => {
    return `${currencySymbol}${price}`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PoojaTopBanner />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left Side Filters */}
        <div className={`w-full md:w-64 ${isMobile && !showFilters ? "hidden" : "block"}`}>
          <BhajanCategory
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <BhajanFilterLeft
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            handleRatingChange={(rating) =>
              setSelectedRatings((prev) =>
                prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
              )
            }
            productStatus={productStatus}
            handleProductStatusChange={(status) =>
              setProductStatus((prev) =>
                prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
              )
            }
            applyFilters={applyFilters}
          />
        </div>

        {/* Right Side Content */}
        <div className="flex-1">
          <BhajanFilterRight
            view={view}
            setView={setView}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            isMobile={isMobile}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Bhajan Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : bhajans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm border">
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bhajan Mandals Yet</h2>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Start your spiritual journey by exploring a different category of bhajans
      </p>
      <button
        onClick={() => setSelectedCategory(null)}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
      >
        Browse All Bhajans
      </button>
    </div>
          ) : (
            <>
              <div className={view === "grid" ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid gap-4 grid-cols-1"}>
                {paginatedBhajans.map((bhajan) => (
                  <div key={bhajan.id} className={view === "list" ? "border rounded-lg overflow-hidden flex flex-col md:flex-row bg-white shadow-md" : "border rounded-lg overflow-hidden bg-white shadow-md"}>
                    <div className={view === "list" ? "relative w-full md:w-1/3" : "relative"}>
                      <img
                        src={`${imgUrl}${bhajan.bhajan_image}`}
                        alt={bhajan.bhajan_name}
                        className="w-full h-auto aspect-square object-cover"
                      />
                    </div>
                    <div className={view === "list" ? "p-4 flex flex-col md:w-2/3" : "p-4 flex flex-col"}>
                      <div className="text-sm text-gray-500 mb-1">
                        {getCategoryName(bhajan.bhajan_category)}
                      </div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        <Link to={`/bhajan-mandal/${bhajan.slug_url}`}>{bhajan.bhajan_name}</Link>
                      </h3>
                      <div className="flex items-center mb-4">
                        <span className="text-lg font-bold">{formatPrice(bhajan.bhajan_price)}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <span className="text-sm text-gray-600">Experience: {bhajan.exp_year} years</span>
                      </div>
                      <button className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bhajan;