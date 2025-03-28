import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { fetchBhajanByCategory } from "./EStoreService";
import Pagination from "../../Component/Shop/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PoojaTopBanner from "../PoojaBooking/PoojaTopBanner";
import EStoreCategoryFilter from "../../Component/EStore/EStoreCategoryFilter";
import EStoreFilterLeft from "../../Component/EStore/EStoreFilterLeft";
import EStoreFilterRight from "../../Component/EStore/EStoreFilterRight"; // Import the renamed component
import { useMobile } from "../../hooks/use-mobile";

const EStore = () => {
  const currencySymbol = "₹";
  const imgUrl = "http://34.131.41.101:3000/";
  const ApiUrl = "http://34.131.41.101:3000/api";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { filtercategoryID, setFilterCategoryID, categoryData, setCategoryData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity"); // State for sorting
  const isMobile = useMobile();

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

  // Fetch Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/product/categories/active`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategoryData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [setCategoryData]);

  // Fetch Products based on selected category
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchBhajanByCategory(filtercategoryID === "All" ? null : filtercategoryID);
        setProducts(data?.data || []);
      } catch (error) {
        setError("Failed to load products");
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filtercategoryID]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
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
          <EStoreCategoryFilter
            filtercategoryID={filtercategoryID}
            setFilterCategoryID={setFilterCategoryID}
            categoryData={categoryData}
          />
          <EStoreFilterLeft
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            handleRatingChange={handleRatingChange}
            productStatus={productStatus}
            handleProductStatusChange={handleProductStatusChange}
            applyFilters={applyFilters}
          />
        </div>

        {/* Right Side Filters and Product Listing */}
        <div className="flex-1">
          {/* EStoreFilterRight Component */}
          <EStoreFilterRight
            view={view}
            setView={setView}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobile={isMobile}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 space-y-6">
              <img
                src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?resize=400x0"
                alt="No Data Found"
                className="w-72 max-w-full"
              />
              <h2 className="text-2xl font-semibold text-gray-700">No Products Found!</h2>
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
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className={
                    view === "list"
                      ? "border rounded-lg overflow-hidden flex flex-col md:flex-row bg-white shadow-md"
                      : "border rounded-lg overflow-hidden bg-white shadow-md"
                  }
                >
                  <div className={view === "list" ? "relative w-full md:w-1/3" : "relative"}>
                    <img
                      src={`${imgUrl}${product.featuredImage}`}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>

                  <div className={view === "list" ? "p-4 flex flex-col md:w-2/3" : "p-4 flex flex-col"}>
                    <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-2">
                      <Link to={`/e-store/product/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold">{formatPrice(product.sellingPrice)}</span>
                      <span className="text-xs text-gray-400 line-through ml-2">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
                      ADD TO CART
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

export default EStore;