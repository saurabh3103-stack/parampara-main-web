import React, { useEffect, useState, useContext } from "react";
import { fetchCategories, fetchBhajanByCategory } from "./BhajanService";
import FilterBhajan from "./FilterBhajan";
import Breadcrumb from "../../Component/Breadcrumb";
import Filter from "../../Component/Shop/Filter";
import { AppContext } from "../../context/AppContext";
import SortBhajan from "./SortBhajan";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Shop/Pagination";

const Bhajan = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Bhajan Mandal', url: '/bhajan-mandal' },
        { pagename: 'Bhajan Mandal' },
    ];
    const itemsPerPage = 12;
    const [categories, setCategories] = useState([]);
    const [bhajans, setBhajans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { filtercategoryID, setFilterCategoryID, categoryData, setCategoryData } = useContext(AppContext);

    const imgUrl = "http://localhost:3000"; // Define your image URL
    const currencySymbol = "₹"; // Define your currency symbol

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data?.data || []);
                setCategoryData(data?.data || []); // Update context with categories
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        loadCategories();
    }, [setCategoryData]);

    useEffect(() => {
        const loadBhajans = async () => {
            try {
                const data = await fetchBhajanByCategory(filtercategoryID === "All" ? null : filtercategoryID);
                setBhajans(data?.data || []);
            } catch (error) {
                console.error("Failed to load bhajans", error);
            }
        };
        loadBhajans();
    }, [filtercategoryID]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (searchTerm) => {
        // Implement search functionality if needed
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bhajans.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(bhajans.length / itemsPerPage);

    return (
        <section>
            <Breadcrumb links={breadcrumbLinks} />
            <div id="shop-grid-left" className="mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <Filter />
                <div className="mt-5 flex flex-col space-x-0 text-sm md:flex-row md:space-x-4">
                    <FilterBhajan
                        categoryData={categories}
                        selectedCategory={filtercategoryID}
                        onCategoryChange={setFilterCategoryID}
                    />
                    <div className="w-full space-y-3 sm:ml-0 md:w-3/4">
                        {bhajans.length === 0 ? ( // Check if no bhajans are found
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
                            <div className="w-full border border-gray-400 bg-white">
                                <SortBhajan handleSearchChange={handleSearchChange} />
                                <div className="w-full border-b border-gray-400">
                                    <div className="p-5">
                                        {currentItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group flex flex-col space-x-0 py-3 sm:flex-row sm:space-x-6"
                                            >
                                                <div className="relative mx-auto w-full sm:h-52 sm:w-2/6 lg:w-1/4">
                                                    <img
                                                        className="h-full w-full object-contain"
                                                        src={imgUrl + item.bhajan_image}
                                                        alt={item.bhajan_image || "Pooja Image"}
                                                    />
                                                </div>
                                                <div className="w-full space-y-1 sm:w-4/6 sm:space-y-2 lg:w-3/4">
                                                    <Link to={`/bhajan-mandal/${item.slug_url}`}>
                                                        <span className="line-clamp-1 cursor-pointer text-sm text-blue-900">
                                                            {item.bhajan_name}
                                                        </span>
                                                    </Link>
                                                    <div className="font-semibold">
                                                        <span className="price-value text-lg text-gray-900">
                                                            {currencySymbol}
                                                            {item.bhajan_price} 
                                                        </span>
                                                        <span className="line-clamp-1 text-sm text-blue-900">
                                                            Experience :&nbsp;{item.exp_year}
                                                        </span>    
                                                    </div>
                                                    <div className="xs:flex hidden items-center space-x-2 text-xs sm:space-x-5 sm:text-sm">
                                                        <p>{item.short_discription}</p>
                                                    </div>
                                                    <div className="flex flex-col items-center space-x-0 sm:flex-row sm:flex-nowrap sm:space-x-4">
                                                        <div className="w-full py-1 sm:w-1/2">
                                                            <Link to={`/bhajan-mandal/${item.slug_url}`}>
                                                                <span className="btn btn-bg-slide btn-full">View</span>
                                                            </Link>
                                                        </div>
                                                        <div className="w-full py-1 sm:w-1/2">
                                                            <Link to={'javascript:void(0)'}>
                                                                <span className="btn btn-full btn-outline">Book Now</span>
                                                            </Link>
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Bhajan;