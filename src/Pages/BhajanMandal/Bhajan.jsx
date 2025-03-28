import React, { useEffect, useState, useContext } from "react";
import { fetchCategories, fetchBhajanByCategory } from "./BhajanService";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Shop/Pagination";
import PoojaTopBanner from "../PoojaBooking/PoojaTopBanner";
import { useMobile } from "../../hooks/use-mobile";
import BhajanCategory from "./BhajanCategory";
import BhajanFilterLeft from "./BhajanFilterLeft";
import BhajanFilterRight from "./BhajanFilterRight";
import { AppContext } from "../../context/AppContext";

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
  const { filtercategoryID, setFilterCategoryID } = useContext(AppContext);
  const isMobile = useMobile();
  const currencySymbol = "₹";
  const imgUrl = "http://34.131.41.101:3000";

  // State for filters
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [productStatus, setProductStatus] = useState([]);

  // Handlers for filters
  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleProductStatusChange = (status) => {
    setProductStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const applyFilters = () => {
    console.log("Applying Filters:", { priceRange, selectedRatings, productStatus });
  };

  // Fetch Bhajan Categories
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
        const data = await fetchBhajanByCategory(filtercategoryID === "All" ? null : filtercategoryID);
        setBhajans(data?.data || []);
      } catch (error) {
        setError("Failed to load bhajans");
        console.error("Failed to load bhajans", error);
      } finally {
        setLoading(false);
      }
    };
    loadBhajans();
  }, [filtercategoryID]);

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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BhajanFilterLeft
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            handleRatingChange={handleRatingChange}
            productStatus={productStatus}
            handleProductStatusChange={handleProductStatusChange}
            applyFilters={applyFilters}
          />
        </div>

        {/* Right Side Filters and Bhajan Listing */}
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
            <div className="flex flex-col items-center justify-center mt-12 space-y-6">
              <img
                src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?resize=400x0"
                alt="No Data Found"
                className="w-72 max-w-full"
              />
              <h2 className="text-2xl font-semibold text-gray-700">Hey, No Bhajan Mandal Found!</h2>
              <p className="text-center text-gray-500">
                Please try selecting a different category or come back later.
              </p>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid gap-4 grid-cols-1"
              }
            >
              {paginatedBhajans.map((bhajan) => (
                <div
                  key={bhajan.id}
                  className={
                    view === "list"
                      ? "border rounded-lg overflow-hidden flex flex-col md:flex-row bg-white shadow-md"
                      : "border rounded-lg overflow-hidden bg-white shadow-md"
                  }
                >
                  <div className={view === "list" ? "relative w-full md:w-1/3" : "relative"}>
                    <img
                      src={`${imgUrl}${bhajan.bhajan_image}`}
                      alt={bhajan.bhajan_name}
                      width={300}
                      height={300}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>

                  <div className={view === "list" ? "p-4 flex flex-col md:w-2/3" : "p-4 flex flex-col"}>
                    <div className="text-sm text-gray-500 mb-1">{bhajan.category}</div>
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
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Bhajan;