import React, { useState, useEffect } from "react";
import Breadcrumb from '../../Component/Breadcrumb';
import Filter from "../../Component/Shop/Filter";
import FilterSection from "../../Component/Shop/FilterSection";
import PoojaCategory from "./PoojaCategory";
import SortPooja from "./SortPooja";
import Pagination from "../../Component/Shop/Pagination";
import axios from 'axios';
import { Link } from 'react-router-dom';


const PoojaBooking = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Pooja Service', url: '/pooja' },
        { pagename: 'Pooja Service' },
    ];
    const currencySymbol = "₹";
    const imgUrl = "http://localhost:3000";
    const ApiUrl = "http://localhost:3000/api";
    const tokken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
    const [categoryData, setCategoryData] = useState([]);
    const [poojaData, setPoojaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/pooja/category/web`, {
                    headers: { Authorization: tokken },
                });
                setCategoryData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPooja = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/pooja/all-pooja`, {
                    headers: { Authorization: tokken },
                });
                if (response.data.status === 1) {
                    setPoojaData(response.data.data);
                    setLoading(false);
                } else {
                    setError('No Pooja Found');
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPooja();
    }, []);

    // Filtered Pooja Data based on Search Term
    const filteredPoojaData = poojaData.filter(item => 
        item.pooja_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.short_discription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPoojaData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPoojaData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term
    };
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === null) {
            // If no category is selected, display all pooja data
            setFilteredPoojaData(poojaData);
        } else {
            // Filter pooja data by category
            const filteredData = poojaData.filter(item => item.category_id === categoryId);
            setFilteredPoojaData(filteredData);
        }
        setCurrentPage(1); // Reset pagination to first page when category changes
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <section>
                <Breadcrumb links={breadcrumbLinks} />
                <div id="shop-grid-left" className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                    <Filter />
                    <div className="mt-5 flex flex-col space-x-0 text-sm md:flex-row md:space-x-4">
                        <FilterSection  categoryData={categoryData}/>
                        <div className="w-full space-y-3 sm:ml-0 md:w-3/4">
                            <PoojaCategory categoryData={categoryData} selectedCategory={selectedCategory} 
                                onCategoryChange={handleCategoryChange}  />
                            <div className="w-full border border-gray-400 bg-white">
                                <SortPooja handleSearchChange={handleSearchChange} />
                                <div className="w-full border-b border-gray-400">
                                    <div className="p-5">
                                        {currentItems.map((item, index) => (
                                            <div key={index} className="group flex flex-col space-x-0 py-3 sm:flex-row sm:space-x-6">
                                                <div className="relative mx-auto w-full sm:h-52 sm:w-2/6 lg:w-1/4">
                                                    <img className="h-full w-full object-contain" src={imgUrl + item.pooja_image} alt="" />
                                                    <div className="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100">
                                                        <div className="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3">
                                                            <div className="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                                                <a href="account-wishlist.html">
                                                                    <span className="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                                                        <i className="far fa-heart"></i>
                                                                    </span>
                                                                </a>
                                                                <div data-modal-toggle="nk-modal-quick-view" className="hover:bg-primary h-10 w-10 cursor-pointer bg-white p-2 hover:text-gray-50">
                                                                    <i className="fa-regular fa-eye"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full space-y-1 sm:w-4/6 sm:space-y-2 lg:w-3/4">
                                                    <Link to={`/pooja/pooja-details/${item._id}`}>
                                                        <span className="line-clamp-1 cursor-pointer text-sm text-blue-900 ">
                                                            {item.pooja_name}
                                                        </span>
                                                    </Link>
                                                    <div className="font-semibold">
                                                        <span className="price-value text-lg text-gray-900">{currencySymbol}{item.price_withoutSamagri} - </span>
                                                        <span className="price-value text-lg text-gray-900 ">{currencySymbol}{item.price_withSamagri}</span>
                                                    </div>
                                                    <div className="block">
                                                        <a className="flex items-center justify-between" href="javascript:void(0)#customers-rating-reviews">
                                                            <span className="text-yellow-300">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                            </span>
                                                            <span className="text-xs text-blue-900 ">(54)</span>
                                                        </a>
                                                    </div>
                                                    <div className="xs:flex hidden items-center space-x-2 text-xs sm:space-x-5 sm:text-sm">
                                                        <p>
                                                            {item.short_discription}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-center space-x-0 sm:flex-row sm:flex-nowrap sm:space-x-4">
                                                        <div className="w-full py-1 sm:w-1/2">
                                                            <a href="cart.html"><span className="btn btn-bg-slide btn-full">Add to Cart</span></a>
                                                        </div>
                                                        <div className="w-full py-1 sm:w-1/2">
                                                            <a href="checkout.html"><span className="btn btn-full btn-outline">Book Now</span></a>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PoojaBooking;
