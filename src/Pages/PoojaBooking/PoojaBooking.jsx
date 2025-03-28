import { useState, useEffect } from "react";
import { useMobile } from "../../hooks/use-mobile";
import PoojaCategory from "./PoojaCategory";
import PoojaTopBanner from './PoojaTopBanner';
import PoojaFilterLeft from "./PoojaFilterLeft";
import PoojaRightFilter from "./PoojaRightFilter";
import Pagination from "../../Component/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

// Main PoojaBooking Component
export default function PoojaBooking() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Default to null for "All Categories"
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
  const imgUrl = "http://34.131.41.101:3000";
  const ApiUrl = "http://34.131.41.101:3000/api";
  const tokken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/pooja/category/web`, {
          headers: { Authorization: tokken },
        });
        setCategoryData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPooja = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/pooja/all-poojaUser`, {
          headers: { Authorization: tokken },
        });
        if (response.data.status === 1 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        } else {
          setError('No Pooja Found');
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPooja();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, priceRange, selectedRatings, productStatus, selectedBrands, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.pooja_category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min && priceRange.max) {
      filtered = filtered.filter((product) => {
        const price = product.price_withoutSamagri || product.price_withSamagri;
        return price >= Number(priceRange.min) && price <= Number(priceRange.max);
      });
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) => selectedRatings.includes(product.rating));
    }

    // Product status filter
    if (productStatus.length > 0) {
      filtered = filtered.filter((product) => {
        if (productStatus.includes("In stock") && product.inStock) return true;
        if (productStatus.includes("Out of stock") && !product.inStock) return true;
        if (productStatus.includes("On sale") && product.onSale) return true;
        return false;
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => (a.price_withoutSamagri || a.price_withSamagri) - (b.price_withoutSamagri || b.price_withSamagri));
        break;
      case "price-high-low":
        filtered.sort((a, b) => (b.price_withoutSamagri || b.price_withSamagri) - (a.price_withoutSamagri || a.price_withSamagri));
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.pooja_name.localeCompare(b.pooja_name));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.pooja_name.localeCompare(a.pooja_name));
        break;
      default:
        // Default sort by popularity (id in this case)
        filtered.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
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
          <PoojaCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <PoojaFilterLeft
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
            selectedBrands={selectedBrands}
            handleBrandChange={(brand) =>
              setSelectedBrands((prev) =>
                prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
              )
            }
            applyFilters={applyFilters}
          />
        </div>

        {/* Right Side Filters and Product Listing */}
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
          />

          {/* Product Grid */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
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
                      src={`${imgUrl}${product.pooja_image}`}
                      alt={product.pooja_name}
                      width={300}
                      height={300}
                      className="w-full h-auto aspect-square object-cover"
                    />
                    {product.onSale && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        SALE!
                      </div>
                    )}
                  </div>

                  <div className={view === "list" ? "p-4 flex flex-col md:w-2/3" : "p-4 flex flex-col"}>
                    <div className="text-sm text-gray-500 mb-1">{product.pooja_category}</div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-2">
                      <Link to={`/pooja/pooja-details/${product.slug_url}`}>{product.pooja_name}</Link>
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

                    <button className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
                      SELECT DATE(S)
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
}