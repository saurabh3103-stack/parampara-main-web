import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Breadcrumb from "../../Component/Breadcrumb";
import '../../../src/Pages/PoojaBooking/poojaDetails.css';
import RelatedPooja from "../../../src/Pages/PoojaBooking/RelatedPooja";
import ProductImageSlider from "./ProductImageSlider";
import ProductDiscription from "./ProductDiscription";
import PoojaSamagri from '../../Pages/PoojaBooking/PoojaSamagri';
import axios from 'axios';
import CustomerReview from "../../Component/Data/CustomerReview";
import TranscationSecurity from "../../Component/TranscationSecurity";
import StringToHTML from "../../Component/StringtoHtml";

const PoojaDetails = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);  
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false)
    const { id } = useParams();
    const currencySymbol = "₹";
    const imgUrl = 'http://localhost:5173/';
    const ApiUrl = 'http://localhost:3000/api';
    const tokken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
    const [error, setError] = useState(null);
    const [poojaDetails, setPoojaDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPooja = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/pooja/pooja/${id}`, {
                    headers: { Authorization: tokken },
                });
                setPoojaDetails(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPooja();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!poojaDetails) {
        return <p>No Pooja found</p>;
    }
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Pooja', url: '/pooja' },
        { label: poojaDetails.pooja_name },
        { pagename: poojaDetails.pooja_name },
    ];
    const poojaDiscription = JSON.stringify(poojaDetails)
    const generateTimeOptions = () => {
        const times = [];
        const startHour = 4; 
        const endHour = 22; 
        for (let hour = startHour; hour <= endHour; hour++) {
          const ampm = hour < 12 ? "AM" : "PM";
          const formattedHour = hour % 12 === 0 ? 12 : hour % 12;   
          const time = `${formattedHour}:00 ${ampm}`;
          times.push(time);
        }
        return times;
      };
      const timeOptions = generateTimeOptions();
      const today = new Date().toISOString().split("T")[0]; 
    return (
        <>
            <Breadcrumb links={breadcrumbLinks} />
            <section className="content mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                <div className="space-y-3 text-sm">
                    <div id="topItemdiv">
                        <div className="mt-0 flex flex-col space-y-3 space-x-0 sm:mt-6 sm:flex-row sm:space-y-0 sm:space-x-5">
                            <div className="w-full sm:w-1/2">
                                <div className="flex flex-col-reverse items-center space-x-0 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3">
                                    <ProductImageSlider  slider={poojaDetails.pooja_image}/>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="space-y-3">
                                    <h1 className="text-xl font-medium sm:text-3xl">{poojaDetails.pooja_name}</h1>
                                    <div>
                                        <span className="text-sm font-semibold sm:text-2xl">{currencySymbol}&nbsp;{poojaDetails.price_withoutSamagri}</span> - 
                                        &nbsp;<span className="text-sm font-semibold sm:text-2xl">{currencySymbol}&nbsp;{poojaDetails.price_withSamagri}</span>
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
                                    <div>
                                        <p><span className="font-semibold">Status:</span> <span className="text-green-500">Available</span></p>
                                    </div>
                                    <form>

                                        <div class="mb-3">
                                            <label for="el-email-one" class="mb-2 block text-sm font-medium text-gray-900">Choose Package :</label>
                                            {poojaDetails.pooja_Samegristatus === "1" ? 
                                                <div className="flex items-center space-x-2">
                                                    <p><span className="font-semibold">With Samagri: </span>{currencySymbol}&nbsp;{poojaDetails.price_withSamagri}&nbsp;<input type="radio" name="poojaSamagri" checked/></p>
                                                    <p><span className="ml-5 font-semibold sm:ml-10">Without Samagri: </span>{currencySymbol}&nbsp;{poojaDetails.price_withoutSamagri}&nbsp;<input type="radio" name="poojaSamagri"/></p>
                                                </div>
                                                :
                                                <div className="flex items-center space-x-2">
                                                    <p><span className="font-semibold">Without Samagri: </span>{currencySymbol}&nbsp;{poojaDetails.price_withoutSamagri}&nbsp;<input type="radio" name="poojaSamagri" checked/></p>
                                                </div>
                                            } 
                                        </div>
                                        <div class="mb-3">
                                            <label for="password1" class="mb-2 block text-sm font-medium text-gray-900">Pooja Date :</label>
                                            <input type="date" id="booking_date"  min={today}  class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" required=""/>
                                        </div>
                                        <div class="mb-3">
                                            <label for="password1" class="mb-2 block text-sm font-medium text-gray-900">Prefered Time :</label>
                                            <select id="booking_time" class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" required="" >
                                                <option>--Choose Time--</option>
                                                {timeOptions.map((time, index) => (
                                                    <option key={index} value={time}>
                                                    {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-4 w-3/4">
                                            <input type="hidden" name="poojaId" value={poojaDetails._id} id="poojaId"/>
                                            <button onclick="location.href = 'cart.html'" className="bg-green-800 w-3/4 rounded px-3 py-2 text-sm font-semibold text-gray-50 transition duration-300 ease-in-out">
                                                Add to Cart
                                            </button>
                                            <button
                                                onclick="location.href = 'checkout.html'"
                                                className="border-green text-green hover:bg-green-800 w-3/4 rounded border-2 px-3 py-2 text-sm font-semibold transition duration-300 ease-in-out hover:text-gray-50">
                                                Book Now
                                            </button>
                                        </div>
                                    </form>
                                    <TranscationSecurity/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product Description */}
                    <div id="itemInformation">
            
            <div className="mt-5">
                <h1 className="border-b border-gray-400 py-2 text-2xl font-bold">Product Overview</h1>
                    <div className="border-b border-gray-400">
                        <div className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                        onClick={() => setIsOpen5(!isOpen5)}>
                        <h1 className="font-semibold">Pooja &amp; Description</h1>
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
                                    <StringToHTML htmlString={poojaDetails.long_discription}/>
                                </p>
                            </div>
                        </div>
                    </div>
                    {
                    poojaDetails.pooja_Samegristatus === "1" ? 
                    <div className="border-b border-gray-400">
                        <div
                        className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                        onClick={() => setIsOpen3(!isOpen3)}>
                        <h1 className="font-semibold">Pooja&nbsp;Samagri</h1>
                        <span
                            className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                            isOpen3 ? "rotate-180" : "rotate-0"
                            }`}>
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        </div>
                        <div className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxHeight: isOpen3 ? "300px" : "0",
                            opacity: isOpen3 ? 1 : 0,
                        }}>
                        <div className="p-4 bg-white">
                            <PoojaSamagri poojaId={poojaDetails._id}/>
                        </div>
                        </div>
                    </div>
                    :
                    <>
                    </>
                    }
                    <div className="border-b border-gray-400">
                        <div
                        className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                        onClick={() => setIsOpen6(!isOpen6)}>
                        <h1 className="font-semibold">Shipping &amp; Delivery Information</h1>
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
                            <h1 className="font-semibold">Product Description</h1>
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
                        <h1 className="font-semibold">Refund &amp; Return Information</h1>
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
                            <h1 className="font-semibold">Product Description</h1>
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
                        <h1 className="font-semibold">Your Protection Plan</h1>
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
                            <h1 className="font-semibold">Product Description</h1>
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
                    <h1 className="font-semibold">Customers Rating & &amp; Reviews</h1>
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

                    {/* Product Description */}
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
                <RelatedPooja />
            </section>
        </>
    );
};

export default PoojaDetails;
