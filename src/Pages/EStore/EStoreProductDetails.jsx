import React, { useState, useEffect } from "react";
import { useParams, Link , useNavigate } from "react-router-dom";
import { fetchProductDetails } from "./EStoreService";
import { ToastContainer, toast } from "react-toastify";
import { getUserByEmail } from "../PoojaBooking/getUserByEmail";
import CustomerReview from "../../Component/Data/CustomerReview";
import RelatedProduct from "./RelatedProduct";
import axios from "axios";
import { Calendar, ChevronRight, Clock, Home, MapPin, Truck, Info, Star } from "lucide-react";
import StringToHTML from "../../Component/StringtoHtml";
import TranscationSecurity from "../../Component/TranscationSecurity";

const EStoreProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currencySymbol = "₹";
  const imgUrl = "http://192.168.1.36:3000/";
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductDetails(id);
        console.log("Product data:", data?.data);  // Properly log the object
        setProduct(data?.data || {});
      } catch (error) {
        console.error("Failed to load product", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);
  
  console.log(product);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await getUserByEmail();

      if (data) {
        setUserData(data);
      } else {
        setUserData(null);
        setError(error || "No user data found.");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!userData || !product) {
      toast.error("User or product data is missing.");
      return;
    }
    const cartData = {
      user_id: userData._id,
      username: userData.username,
      userphone: userData.mobile,
      product_id: product._id,
      product_name: product.name,
      product_image: product.featuredImage[0], // Assuming the first image is the main image
      product_amount: product.sellingPrice,
      quantity: quantity, // Use the selected quantity
      productType: "Product", // Assuming the product type is "Product"
    };

    try {
      const response = await axios.post(
        "http://192.168.1.36:3000/api/product/add-cart",
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`, // Assuming the token is stored in localStorage
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product added to cart successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => setTimeout(() => navigate("/e-store/cart"), 100),
        });
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to cart.");
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer />
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link to="/e-store" className="text-gray-500 hover:text-gray-700">
          E-Store
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Product Details Section */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={imgUrl + product.featuredImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Information Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product?.rating || 4)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">({product?.rating || 4.9})</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-600">{product?.reviews || 123} Reviews</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold">{currencySymbol}{product.sellingPrice}</span>
            <span className="bg-green-700 px-3 py-1 text-base font-semibold text-white">Save $30</span>
          </div>
          <div className="flex items-center space-x-2">
            <p>
              <span className="font-semibold">Model: </span>NKS1234LS
            </p>
            <p>
              <span className="ml-5 font-semibold sm:ml-10">SKU: </span>0123456789
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-500">In Stock</span>
            </p>
          </div>
          <div>
            <span className="mr-5 mb-6">
              <select
                className="w-24 rounded border border-gray-400 py-1 px-2 outline-none mt-5 mb-5"
                id="select-qty-product"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty {i + 1}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <form onSubmit={handleAddToCart}>
              {userData && (
                <>
                  <input type="hidden" name="user_id" value={userData._id} id="user_id" />
                  <input type="hidden" name="username" value={userData.username} id="username" />
                  <input type="hidden" name="userphone" value={userData.mobile} id="userphone" />
                  <input type="hidden" name="useremail" value={userData.email} id="useremail" />
                </>
              )}
              <input type="hidden" name="productType" value="Product" id="productType" />
              <input type="hidden" name="product_name" value={product.name} id="product_name" />
              <input type="hidden" name="quantity" value={quantity} id="quantity" />
              <input type="hidden" name="product_id" value={product._id} id="product_id" />
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                >
                  Add to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                >
                  Book Now
                </button>
              </div>
          </form>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-medium mb-4">Get it in 7 days</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Store Pickup */}
              <div className="flex items-start p-3 bg-white rounded-md border border-gray-100">
                <MapPin className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Store Pickup</p>
                  <p className="text-sm text-gray-600 mb-1">Pickup on Wed, Jul 7</p>
                  <Link href="#" className="text-xs text-blue-600 hover:underline">
                    View locations
                  </Link>
                </div>
              </div>

              {/* Shipping */}
              <div className="flex items-start p-3 bg-white rounded-md border border-gray-100">
                <Truck className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Shipping</p>
                  <p className="text-sm text-gray-600 mb-1">Available in your area</p>
                  <Link href="#" className="text-xs text-blue-600 hover:underline">
                    Enter location
                  </Link>
                </div>
              </div>

              {/* Returns */}
              <div className="flex items-start p-3 bg-white rounded-md border border-gray-100">
                <Info className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-600 mb-1">Until Jul 22</p>
                  <Link href="#" className="text-xs text-blue-600 hover:underline">
                    Return policy
                  </Link>
                </div>
              </div>
            </div>
          </div>

            <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
                <img src="/image/trust-symbols_a.webp" className="img-fluid w-fullmax-w-full h-auto" alt="transcation" />
            </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Product Overview</h2>
        <div className="border rounded-lg divide-y">
          <details className="px-4">
            <summary className="py-4 font-medium cursor-pointer">Description</summary>
            <div className="pb-4 text-gray-700">
              <StringToHTML htmlString={product.description} />
            </div>
          </details>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <RelatedProduct currentPoojaData={product} />
      </div>
    </div>
  );
};

export default EStoreProductDetails;