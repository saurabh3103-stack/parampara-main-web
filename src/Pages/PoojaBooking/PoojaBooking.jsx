// PoojaBooking.jsx
import { useState, useEffect } from "react";
import { useMobile } from "../../hooks/use-mobile";
import PoojaCategory from "./PoojaCategory";
import PoojaTopBanner from './PoojaTopBanner';
import PoojaFilterLeft from "./PoojaFilterLeft";
import PoojaRightFilter from "./PoojaRightFilter";
import Pagination from "../../Component/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

const getCategoryNameFromData = (categoryId, categories) => {
  if (!categories || !Array.isArray(categories)) return "Category";
  const category = categories.find(cat => cat._id === categoryId);
  return category ? category.category || "Category" : "Uncategorized";
};

export default function PoojaBooking() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [itemsPerPage, setItemsPerPage] = useState("12");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMobile();
  const currencySymbol = "₹";
  const imgUrl = "http://192.168.1.36:3000";
  const ApiUrl = "http://192.168.1.36:3000/api";
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get(`${ApiUrl}/pooja/category/web`, {
            headers: { Authorization: token },
          }),
          axios.get(`${ApiUrl}/pooja/all-poojaUser`, {
            headers: { Authorization: token },
          })
        ]);

        if (categoriesResponse.data?.status === 1) {
          setCategoryData(categoriesResponse.data.data || []);
        }

        if (productsResponse.data?.status === 1) {
          setProducts(productsResponse.data.data || []);
          setFilteredProducts(productsResponse.data.data || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.pooja_category === selectedCategory);
    }

    if (priceRange.min && priceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.price_withoutSamagri || product.price_withSamagri || 0;
        return price >= Number(priceRange.min) && price <= Number(priceRange.max);
      });
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => 
        selectedRatings.includes(Math.floor(product.rating || 0))
      );
    }

    if (productStatus.length > 0) {
      filtered = filtered.filter(product => {
        if (productStatus.includes("In stock") && product.inStock) return true;
        if (productStatus.includes("Out of stock") && !product.inStock) return true;
        if (productStatus.includes("On sale") && product.onSale) return true;
        return false;
      });
    }

    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => (a.price_withoutSamagri || 0) - (b.price_withoutSamagri || 0));
        break;
      case "price-high-low":
        filtered.sort((a, b) => (b.price_withoutSamagri || 0) - (a.price_withoutSamagri || 0));
        break;
      case "name-a-z":
        filtered.sort((a, b) => (a.pooja_name || "").localeCompare(b.pooja_name || ""));
        break;
      case "name-z-a":
        filtered.sort((a, b) => (b.pooja_name || "").localeCompare(a.pooja_name || ""));
        break;
      default:
        filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedRatings, productStatus, selectedBrands, sortBy, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / Number(itemsPerPage)) || 1);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * Number(itemsPerPage),
    currentPage * Number(itemsPerPage)
  );

  const formatPrice = (price) => {
    try {
      return `${currencySymbol}${Math.round(Number(price) || 0)}`;
    } catch {
      return `${currencySymbol}0`;
    }
  };

  const renderSkeleton = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden bg-white shadow-md animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <PoojaTopBanner />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">×</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className={`w-full md:w-64 ${isMobile && !showFilters ? "hidden" : "block"}`}>
          <PoojaCategory 
            categoryData={categoryData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <PoojaFilterLeft
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            handleRatingChange={(rating) =>
              setSelectedRatings(prev =>
                prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
              )
            }
            productStatus={productStatus}
            handleProductStatusChange={(status) =>
              setProductStatus(prev =>
                prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
              )
            }
            selectedBrands={selectedBrands}
            handleBrandChange={(brand) =>
              setSelectedBrands(prev =>
                prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
              )
            }
          />
        </div>

        <div className="flex-1">
          <PoojaRightFilter
            view={view}
            setView={setView}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobile={isMobile}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            productCount={filteredProducts.length}
          />

          {loading ? renderSkeleton() : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <>
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Pooja Found Yet</h2>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Start your spiritual journey by exploring a different category of bhajans
      </p>
      <button
         onClick={() => {
          setSelectedCategory(null);
          setPriceRange({ min: "", max: "" });
          setSelectedRatings([]);
          setProductStatus([]);
          setSelectedBrands([]);
        }}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
      >
        Browse All Pooja
      </button>
    </div>
            </>
          ) : (
            <>
              <div className={view === "grid" ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid gap-4 grid-cols-1"}>
                {paginatedProducts.map((product) => (
                  <div key={product.id} className={view === "list" ? "border rounded-lg overflow-hidden flex flex-col md:flex-row bg-white shadow-md" : "border rounded-lg overflow-hidden bg-white shadow-md"}>
                    <div className={view === "list" ? "relative w-full md:w-1/3" : "relative"}>
                      <img
                        src={`${imgUrl}${product.pooja_image}`}
                        alt={product.pooja_name}
                        className="w-full h-auto aspect-square object-cover"
                        onError={(e) => e.target.src = "https://via.placeholder.com/300"}
                      />
                      {product.onSale && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          SALE!
                        </div>
                      )}
                    </div>

                    <div className={view === "list" ? "p-4 flex flex-col md:w-2/3" : "p-4 flex flex-col"}>
                      <div className="text-sm text-gray-500 mb-1">
                        {getCategoryNameFromData(product.pooja_category, categoryData)}
                      </div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        <Link to={`/pooja/pooja-details/${product.slug_url || product.id}`} className="hover:text-blue-600">
                          {product.pooja_name}
                        </Link>
                      </h3>
                      <div className="flex items-center mb-4">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-red-600">{formatPrice(product.price_withoutSamagri)}</span>
                            <span className="ml-2 text-gray-500 line-through">{formatPrice(product.price_withSamagri)}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">{formatPrice(product.price_withoutSamagri)}</span>
                        )}
                      </div>
                      <button className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors" disabled={!product.inStock}>
                        {product.inStock ? "SELECT DATE(S)" : "OUT OF STOCK"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}