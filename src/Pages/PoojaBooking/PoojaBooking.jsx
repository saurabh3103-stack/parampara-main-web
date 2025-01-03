import React, { useState, useEffect } from "react";
import Breadcrumb from '../../Component/Breadcrumb';
import Filter from "../../Component/Shop/Filter";
import FilterSection from "../../Component/Shop/FilterSection";
import PoojaCategory from "./PoojaCategory";
import SortPooja from "./SortPooja";
import Pagination from "../../Component/Shop/Pagination";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

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

    console.log(currentItems)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const { filtercategoryID } = useContext(AppContext);
   const currrentItems= [
        {
            _id: "675ac650ecc0c42f54d2d717",
            pooja_name: "Diwali Pooja",
            slug_url: "diwali-pooja",
            pooja_category: "675aabdbbb222746bde245d8",
            pooja_Samegristatus: "1",
            price_withSamagri: "1100",
            price_withoutSamagri: "501",
            pooja_image: "/uploads/pooja_images/1734002256325-diwali-pooja.jpg",
            short_discription: "Diwali is the festival of Laxmi, the Goddess of prosperity and wealth.",
            long_discription: "<p>Diwali is the festival of Laxmi...</p>",
            status: "active",
            updated_at: "2024-12-12T11:17:36.352Z",
            created_at: "2024-12-12T11:17:36.352Z",
            __v: 0,
        },
        {
            _id: "675fcddb56850032fe1a5334",
            pooja_name: "Holi Pooja",
            slug_url: "holi-pooja",
            pooja_category: "675aac04bb222746bde245db",
            pooja_Samegristatus: "0",
            price_withSamagri: "",
            price_withoutSamagri: "",
            pooja_image: "/uploads/pooja_images/1734331867183-Screenshot.png",
            short_discription: "Celebrate the festival of colors with prayers and rituals.",
            long_discription: "<p>Holi is a festival of joy...</p>",
            status: "active",
            updated_at: "2024-12-16T06:51:07.207Z",
            created_at: "2024-12-16T06:51:07.207Z",
            __v: 0,
        },
        {
            _id: "675ac650ecc0c42f54d2d718",
            pooja_name: "Navratri Pooja",
            slug_url: "navratri-pooja",
            pooja_category: "675aac1ebb222746bde245de",
            pooja_Samegristatus: "1",
            price_withSamagri: "2100",
            price_withoutSamagri: "1500",
            pooja_image: "/uploads/pooja_images/navratri-pooja.jpg",
            short_discription: "Dedicated to Goddess Durga, performed for 9 days.",
            long_discription: "<p>Navratri celebrates...</p>",
            status: "active",
            updated_at: "2024-12-15T08:17:36.352Z",
            created_at: "2024-12-15T08:17:36.352Z",
            __v: 0,
        },
        {
            _id: "675fcddb56850032fe1a5335",
            pooja_name: "Ganesh Chaturthi Pooja",
            slug_url: "ganesh-chaturthi-pooja",
            pooja_category: "675aabdbbb222746bde245d8",
            pooja_Samegristatus: "1",
            price_withSamagri: "1200",
            price_withoutSamagri: "800",
            pooja_image: "/uploads/pooja_images/ganesh-chaturthi.jpg",
            short_discription: "Worship Lord Ganesha for blessings.",
            long_discription: "<p>Ganesh Chaturthi is...</p>",
            status: "active",
            updated_at: "2024-12-14T07:50:07.207Z",
            created_at: "2024-12-14T07:50:07.207Z",
            __v: 0,
        },
        {
            _id: "675ac650ecc0c42f54d2d719",
            pooja_name: "Raksha Bandhan Pooja",
            slug_url: "raksha-bandhan-pooja",
            pooja_category: "675aac04bb222746bde245db",
            pooja_Samegristatus: "0",
            price_withSamagri: "",
            price_withoutSamagri: "",
            pooja_image: "/uploads/pooja_images/raksha-bandhan.jpg",
            short_discription: "Celebrate sibling bond with rituals.",
            long_discription: "<p>Raksha Bandhan is...</p>",
            status: "active",
            updated_at: "2024-12-14T07:17:36.352Z",
            created_at: "2024-12-14T07:17:36.352Z",
            __v: 0,
        },
        {
            _id: "675ac650ecc0c42f54d2d720",
            pooja_name: "Makar Sankranti Pooja",
            slug_url: "makar-sankranti-pooja",
            pooja_category: "675aac1ebb222746bde245de",
            pooja_Samegristatus: "1",
            price_withSamagri: "1000",
            price_withoutSamagri: "700",
            pooja_image: "/uploads/pooja_images/makar-sankranti.jpg",
            short_discription: "Dedicated to the Sun God.",
            long_discription: "<p>Makar Sankranti is...</p>",
            status: "active",
            updated_at: "2024-12-13T11:17:36.352Z",
            created_at: "2024-12-13T11:17:36.352Z",
            __v: 0,
        },
        {
            _id: "675ac650ecc0c42f54d2d721",
            pooja_name: "Shivratri Pooja",
            slug_url: "shivratri-pooja",
            pooja_category: "675aabdbbb222746bde245d8",
            pooja_Samegristatus: "1",
            price_withSamagri: "900",
            price_withoutSamagri: "500",
            pooja_image: "/uploads/pooja_images/shivratri.jpg",
            short_discription: "Worship Lord Shiva on this auspicious day.",
            long_discription: "<p>Shivratri celebrates...</p>",
            status: "active",
            updated_at: "2024-12-13T10:50:07.207Z",
            created_at: "2024-12-13T10:50:07.207Z",
            __v: 0,
        },
        {
            _id: "675fcddb56850032fe1a5336",
            pooja_name: "Janmashtami Pooja",
            slug_url: "janmashtami-pooja",
            pooja_category: "675aac04bb222746bde245db",
            pooja_Samegristatus: "1",
            price_withSamagri: "1300",
            price_withoutSamagri: "900",
            pooja_image: "/uploads/pooja_images/janmashtami.jpg",
            short_discription: "Celebrate the birth of Lord Krishna.",
            long_discription: "<p>Janmashtami is...</p>",
            status: "active",
            updated_at: "2024-12-12T09:50:07.207Z",
            created_at: "2024-12-12T09:50:07.207Z",
            __v: 0,
        },
    ]

    const filteredPoojas =
    filtercategoryID === null
      ? currentItems
      : currentItems.filter(
          (pooja) => pooja.pooja_category === filtercategoryID
        );


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
                                {filteredPoojas.length > 0 ? (
    <div className="w-full border border-gray-400 bg-white">
        <SortPooja handleSearchChange={handleSearchChange} />
        <div className="w-full border-b border-gray-400">
            <div className="p-5">
                {filteredPoojas.map((item, index) => (
                    <div
                        key={index}
                        className="group flex flex-col space-x-0 py-3 sm:flex-row sm:space-x-6"
                    >
                        <div className="relative mx-auto w-full sm:h-52 sm:w-2/6 lg:w-1/4">
                            <img
                                className="h-full w-full object-contain"
                                src={imgUrl + item.pooja_image}
                                alt={item.pooja_name || "Pooja Image"}
                            />
                        </div>
                        <div className="w-full space-y-1 sm:w-4/6 sm:space-y-2 lg:w-3/4">
                            <Link to={`/pooja/pooja-details/${item._id}`}>
                                <span className="line-clamp-1 cursor-pointer text-sm text-blue-900">
                                    {item.pooja_name}
                                </span>
                            </Link>
                            <div className="font-semibold">
                                <span className="price-value text-lg text-gray-900">
                                    {currencySymbol}
                                    {item.price_withoutSamagri} -{" "}
                                </span>
                                <span className="price-value text-lg text-gray-900">
                                    {currencySymbol}
                                    {item.price_withSamagri}
                                </span>
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
) : (
    <div className="flex flex-col items-center justify-center mt-12 space-y-6">
        <img
            src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?resize=400x0"
            alt="No Data Found"
            className="w-72 max-w-full"
        />
        <h2 className="text-2xl font-semibold text-gray-700">Hey, No Pooja Found!</h2>
        <p className="text-center text-gray-500">
            Please try selecting a different category or come back later.
        </p>
    </div>
)}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PoojaBooking;
