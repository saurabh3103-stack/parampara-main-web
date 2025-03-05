import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "./EStoreService";
import Breadcrumb from "../../Component/Breadcrumb";
import { ToastContainer } from "react-toastify";
import ProductImageGallery from "../PoojaBooking/ProductImageSlider";
import TranscationSecurity from "../../Component/TranscationSecurity";
import { getUserByEmail } from '../PoojaBooking/getUserByEmail';
import CustomerReview from "../../Component/Data/CustomerReview";
import RelatedPooja from "../PoojaBooking/RelatedPooja";

const EStoreProductDetails = () => {
    const { id } = useParams(); 
    const currencySymbol = "₹";
    const imgUrl = "http://localhost:3000";
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);  
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductDetails(id);
                setProduct(data?.data || {});
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
    };

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const breadcrumbLinks = [
        { label: "Home", url: "/" },
        { label: "E-Store", url: "/e-store" },
        { label: product?.name || "Unknown Product", url: `/product/${product?.slug || ""}` },
        { pagename: product?.name || "Unknown Product" },
    ];

    console.log(product);

    return (
        <>
            <ToastContainer/>
            <Breadcrumb links={breadcrumbLinks} />
            <section className="content mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <div className="space-y-3 text-sm">
                    <div id="topItemdiv">
                        <div className="mt-0 flex flex-col space-y-3 space-x-0 sm:mt-6 sm:flex-row sm:space-y-0 sm:space-x-5">
                            <div className="w-full sm:w-1/2">
                                <div className="flex flex-col-reverse items-center space-x-0 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3">
                                    <ProductImageGallery slider={product?.featuredImage || []} />
                                </div>
                            </div>
                            
                            <div className="w-full sm:w-1/2">
                                <div className="space-y-3">
                                    <h1 className="text-xl font-medium sm:text-3xl">{product.name}</h1>
                                    <div>
                                        <span className="text-sm font-semibold sm:text-2xl">{currencySymbol}&nbsp;{product.sellingPrice}</span> - 
                                        <span className="ml-10 bg-green-700 px-3 py-1 text-base font-semibold text-white">Save $30</span>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="inline-flex space-x-1">
                                            <span className="text-yellow-400"><i className="fas fa-star"></i> </span>
                                            <span>(4.9)</span>
                                        </div>
                                        <div className="ml-5 flex flex-auto items-center space-x-2 sm:ml-5">
                                            <span><a href="#customers-rating-reviews">123 Reviews</a></span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <p><span class="font-semibold">Model: </span>NKS1234LS</p>
                                        <p><span class="ml-5 font-semibold sm:ml-10">SKU: </span>0123456789</p>
                                    </div>
                                    <div>
                                        <p><span class="font-semibold">Status:</span> <span class="text-green-500">In Stock</span></p>
                                    </div>
                                    <div>
                                    <span class="mr-5">
                                        <select
                                        class="w-24 rounded border border-gray-400 py-1 px-2 outline-none"
                                        id="select-qty-product"
                                        required
                                        >
                                        <option value="">Qty 1</option>
                                        <option value="">Qty 2</option>
                                        <option value="">Qty 3</option>
                                        <option value="">Qty 4</option>
                                        <option value="">Qty 5</option>
                                        </select>
                                    </span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                       
                                        <div className="flex items-center space-x-4 w-3/4">
                                            {userData && (
                                                <>
                                                    <input type="hidden" name="user_id" value={userData._id} id="user_id" />
                                                    <input type="hidden" name="username" value={userData.username} id="username" />
                                                    <input type="hidden" name="userphone" value={userData.mobile} id="userphone" />
                                                    <input type="hidden" name="useremail" value={userData.email} id="useremail" />
                                                </>
                                            )}
                                            <input type="hidden" name="productType" value="Pooja" id="productType"/>
                                            <input type="hidden" name="product_name" value={product.pooja_name} id="product_name"/>
                                            <input type="hidden" name="quantity" value="1" id="quantity"/>
                                            <input type="hidden" name="product_id" value={product._id} id="product_id"/>
                                            <button type="submit" className="bg-green-600 w-3/4 rounded px-3 m-0 py-2 text-sm font-semibold text-gray-50 transition duration-300 ease-in-out hover:bg-green-700">
                                                Add to Cart
                                            </button>
                                            <button type="submit" className="bg-red-600 w-3/4 rounded px-3 py-2 text-sm font-semibold text-gray-50 transition duration-300 ease-in-out hover:bg-red-700">
                                                Book Now
                                            </button>
                                        </div>
                                    </form>
                                    <TranscationSecurity/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="itemInformation">
            
                        <div className="mt-5">
                            <h5 className="border-b border-gray-400 py-2 text-2xl font-bold">Product Overview</h5>
                                
                                <div className="border-b border-gray-400">
                                    <div className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                                    onClick={() => setIsOpen5(!isOpen5)}>
                                    <h5 className="font-semibold">Description</h5>
                                    <span
                                        className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                                        isOpen1 ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div
                                    className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isOpen5 ? "300px" : "0",
                                        opacity: isOpen5 ? 1 : 0,
                                    }}>
                                        <div className="p-4 bg-white">
                                            <p className="w-3/4">
                                                {/* <StringToHTML htmlString={poojaDetails.long_discription}/> */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-400">
                                    <div
                                    className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                                    onClick={() => setIsOpen6(!isOpen6)}>
                                    <h5 className="font-semibold">Shipping &amp; Delivery Information</h5>
                                    <span
                                        className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                                        isOpen6 ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div
                                    className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isOpen6 ? "300px" : "0",
                                        opacity: isOpen6 ? 1 : 0,
                                    }}>
                                    <div className="p-4 bg-white">
                                        <h5 className="font-semibold">Product Description</h5>
                                        <p className="w-3/4">
                                            Originally released in 1982, the Nike Air Force 1 was the first Nike model to feature "Air"
                                            technology. This legendary basketball sneaker wa designed by Bruce Kilgore, and named after
                                            the aircraft carries, the Air Force One. The Air Force 1 is Nike's most popular sneaker to
                                            date, has been produced in nearly 2,000 different colorways, and available in low, mid, and
                                            high-top models.
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-400">
                                    <div
                                    className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                                    onClick={() => setIsOpen1(!isOpen1)}>
                                    <h5 className="font-semibold">Refund &amp; Return Information</h5>
                                    <span
                                        className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                                        isOpen1 ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div
                                    className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isOpen1 ? "300px" : "0",
                                        opacity: isOpen1 ? 1 : 0,
                                    }}>
                                    <div className="p-4 bg-white">
                                        <h5 className="font-semibold">Product Description</h5>
                                        <p className="w-3/4">
                                        Originally released in 1982, the Nike Air Force 1 was the first
                                        Nike model to feature "Air" technology. This legendary basketball
                                        sneaker was designed by Bruce Kilgore and named after the
                                        aircraft carrier, the Air Force One. The Air Force 1 is Nike's
                                        most popular sneaker to date, with nearly 2,000 different
                                        colorways.
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-400">
                                    <div
                                    className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                                    onClick={() => setIsOpen2(!isOpen2)}>
                                    <h5 className="font-semibold">Your Protection Plan</h5>
                                    <span
                                        className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                                        isOpen2 ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div
                                    className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{
                                        maxHeight: isOpen2 ? "300px" : "0",
                                        opacity: isOpen2 ? 1 : 0,
                                    }}>
                                    <div className="p-4 bg-white">
                                        <h5 className="font-semibold">Product Description</h5>
                                        <p className="w-3/4">
                                        Originally released in 1982, the Nike Air Force 1 was the first
                                        Nike model to feature "Air" technology. This legendary basketball
                                        sneaker was designed by Bruce Kilgore and named after the
                                        aircraft carrier, the Air Force One. The Air Force 1 is Nike's
                                        most popular sneaker to date, with nearly 2,000 different
                                        colorways.
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                    
                                <div className="border-b border-gray-400">
                                    <div
                                    className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                                    onClick={() => setIsOpen4(!isOpen4)}>
                                    <h5 className="font-semibold">Customers Rating & &amp; Reviews</h5>
                                    <span
                                        className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                                        isOpen4 ? "rotate-180" : "rotate-0"
                                        }`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </span>
                                    </div>
                                    <div
                                        className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                                        style={{
                                            maxHeight: isOpen4 ? "100%" : "0",
                                            opacity: isOpen4 ? 1 : 0,
                                        }}>
                                        <div className="p-4 bg-white">
                                            <CustomerReview/>
                                        </div>
                                    </div>
                                </div>                  
                        </div>
                    </div>
                </div>
                <div id="sponsoredItems">
                    <div className="mt-7 space-y-1">
                        <h1 className="text-sm font-semibold sm:text-2xl">Related Items currently viewing</h1>
                        <p className="cursor-pointer text-xs hover:underline">
                            sponsored <span><i className="fas fa-info-circle"></i></span>
                        </p>
                        <div>
                            <a href="./shop-product.html"><img src={imgUrl + '/assets/img/banners/banner1.png'} alt="" /></a>
                        </div>
                    </div>
                </div>
                <RelatedPooja/>
            </section>
        </>
    );
};

export default EStoreProductDetails;
