import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Breadcrumb from "../../Component/Breadcrumb";
import Filter from "../../Component/Shop/Filter";
import FilterSection from "../../Component/EStore/FilterSection";
import { AppContext } from "../../context/AppContext";
import { fetchBhajanByCategory } from "./EStoreService";
import SortBhajan from "../BhajanMandal/SortBhajan";
import Pagination from "../../Component/Shop/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EStore = () => {
    const currencySymbol = "₹";
    const imgUrl = "http://34.131.10.8:3000/";
    const ApiUrl = "http://34.131.10.8:3000/api";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

    const breadcrumbLinks = [
        { label: "Home", url: "/" },
        { label: "E-Store", url: "/e-store" },
        { pagename: "E-Store" },
    ];

    const { categoryData, setCategoryData, filtercategoryID } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [productAmount, setProductAmount] = useState("");
    const [SamagriStatus, setSamagriStatus] = useState(false);

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

    useEffect(() => {
        if (!loading) {
            const loadProducts = async () => {
                try {
                    const data = await fetchBhajanByCategory(filtercategoryID === "All" ? null : filtercategoryID);
                    setProducts(data?.data || []);
                } catch (error) {
                    console.error("Failed to load products", error);
                }
            };
            loadProducts();
        }
    }, [filtercategoryID, loading]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            user_id: formData.get('user_id'),
            username: formData.get('username'),
            userphone: formData.get('userphone'),
            productType: formData.get('productType'),
            product_id: formData.get('product_id'),
            product_name: formData.get('product_name'),
            product_amount: formData.get('product_ammount'),
            isSamagri: SamagriStatus,
            quantity: formData.get('quantity'),
        };

        try {
            const response = await axios.post(`${ApiUrl}/cart/addCart`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                toast.success("Item added to cart!");
            } else {
                toast.error("Failed to add item to cart.");
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error("An error occurred while adding to cart.");
        }
    };

    const handleSearchChange = (searchTerm) => {
        console.log("Search term:", searchTerm);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <Breadcrumb links={breadcrumbLinks} />
            <div id="shop-grid-left" className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <Filter />
                <div className="mt-5 flex flex-col space-x-0 text-sm md:flex-row md:space-x-4">
                    <FilterSection categoryData={categoryData} />
                    <div className="w-full space-y-3 sm:ml-0 md:w-3/4">
                        {products.length > 0 ? (
                            <>
                            <div className="w-full flex flex-wrap border border-gray-400 bg-white">
                                <SortBhajan handleSearchChange={handleSearchChange} />
                                <div class="my-5 grid grid-cols-2 gap-y-8 gap-x-2.5 px-3 sm:grid-cols-3 md:grid-cols-3 lg:gap-x-5 xl:grid-cols-4">
                                {products.map((item, index) => (
                                    <div key={index} class="group rounded border-gray-400 pb-0 lg:pb-3">
                                    {console.log(item)}
                                    <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                      <img
                                        class="mx-auto my-auto h-full w-full object-contain text-xs"
                                        src={imgUrl+item.featuredImage}
                                        alt="Item 1"/>
                                      <div
                                        class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100">
                                        <div
                                          class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3">
                                          <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                            <a href="./account-wishlist.html">
                                              <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                                <i class="far fa-heart"></i>
                                              </span>
                                            </a>
                                            <div
                                              data-modal-toggle="nk-modal-quick-view"
                                              class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                              <i class="fa-regular fa-eye"></i>
                                            </div>
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="xs:text-sm text-left text-xs">
                                        <div class="space-y-1">
                                          <div class="mt-2">
                                            <h5 class="line-clamp-1 cursor-pointer font-normal text-blue-700 hover:underline">
                                              <Link to={'/e-store/product/'+item.slug}>
                                              {item.name}</Link>
                                            </h5>
                                          </div>
                                          <div class="font-semibold">
                                            <span class="text-lg text-gray-900">{currencySymbol}{item.sellingPrice}</span>&nbsp;
                                            <span class="text-xs text-gray-400 line-through">{currencySymbol}{item.price}</span>
                                          </div>
                                          <div>
                                            <a
                                              class="flex items-center justify-between"
                                              href="./shop-product.html#customers-rating-reviews">
                                              <span class="text-yellow-400">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                              </span>
                                              <span class="text-xs text-blue-700 hover:underline">(39)</span>
                                            </a>
                                          </div>
                                          <div class="text-xs font-semibold text-green-500">
                                            <p>Get it in 2 days</p>
                                          </div>
                                          <div>
                                            <p>
                                              <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days
                                            </p>
                                          </div>
                                          <div class="py-1">
                                            <a href="./cart.html"><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                </div>
                            </div>
                            <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                            
                        ) : (
                            <div className="w-full border border-gray-400 bg-white">
                                <SortBhajan handleSearchChange={handleSearchChange} />
                            <div className="flex flex-col items-center justify-center mt-12 space-y-6">
                                <img
                                    src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?resize=400x0"
                                    alt="No Data Found"
                                    className="w-72 max-w-full"
                                />
                                <h2 className="text-2xl font-semibold text-gray-700">No Product Found!</h2>
                                <p className="text-center text-gray-500">
                                    Please try selecting a different category or come back later.
                                </p>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EStore;
