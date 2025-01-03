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
    const tokken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

    const [categoryData, setCategoryData] = useState([]);
    const [poojaData, setPoojaData] = useState([]); 
    const [filterPoojaData, setFilteredPoojaData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const itemsPerPage = 12;

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
                    console.log(response.data.data);
                    setPoojaData(response.data.data);
                    setFilteredPoojaData(response.data.data); 
                } else {
                    setError('No Pooja Found');
                    setPoojaData([]); 
                    setFilteredPoojaData([]); 
                }
            } catch (err) {
                setError(err.message);
                setPoojaData([]); 
                setFilteredPoojaData([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchPooja();
    }, []);

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        setLoading(true);
        try {
            // Check if categoryId is null, then fetch general pooja data, else fetch pooja data by category
            const url = categoryId === null
                ? `${ApiUrl}/pooja/all-poojaUser`
                : `${ApiUrl}/pooja/all-poojaUser/${categoryId}`;

            const response = await axios.get(url, {
                headers: { Authorization: tokken },
            });
            setPoojaData(response.data.data); 
            setFilteredPoojaData(response.data.data); 
        } catch (err) {
            setFilteredPoojaData([]);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Safe filtering: Check if poojaData is an array before applying .filter()
    const filteredPoojaData = Array.isArray(poojaData)
        ? poojaData.filter(item =>
            item.pooja_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.short_discription.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPoojaData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPoojaData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                        <FilterSection categoryData={categoryData} />
                        <div className="w-full space-y-3 sm:ml-0 md:w-3/4">
                            <PoojaCategory categoryData={categoryData} selectedCategory={selectedCategory} 
                                onCategoryChange={handleCategoryChange} />
                            <div className="w-full border border-gray-400 bg-white">
                                <SortPooja handleSearchChange={handleSearchChange} />
                                <div className="w-full border-b border-gray-400">
                                    <div className="p-5">
                                        {currentItems.map((item, index) => (
                                            <div key={index} className="group flex flex-col space-x-0 py-3 sm:flex-row sm:space-x-6">
                                                <div className="relative mx-auto w-full sm:h-52 sm:w-2/6 lg:w-1/4">
                                                    <img className="h-full w-full object-contain" src={imgUrl + item.pooja_image} alt="" />
                                                </div>
                                                <div className="w-full space-y-1 sm:w-4/6 sm:space-y-2 lg:w-3/4">
                                                    <Link to={`/pooja/pooja-details/${item._id}`}>
                                                        <span className="line-clamp-1 cursor-pointer text-sm text-blue-900 ">{item.pooja_name}</span>
                                                    </Link>
                                                    <div className="font-semibold">
                                                        <span className="price-value text-lg text-gray-900">{currencySymbol}{item.price_withoutSamagri} - </span>
                                                        <span className="price-value text-lg text-gray-900 ">{currencySymbol}{item.price_withSamagri}</span>
                                                    </div>
                                                    <div className="xs:flex hidden items-center space-x-2 text-xs sm:space-x-5 sm:text-sm">
                                                        <p>{item.short_discription}</p>
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
