import React,{useState} from "react";
import CustomerReview from "../../Component/Data/CustomerReview";

const ProductDiscription = ({ poojaDetails }) => { 
    const poojaData = poojaDetails;
    console.log(poojaData);
    const imgUrl= 'http://34.131.10.8:5173/';
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);  
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false)

    return (
        <>
        <div id="itemInformation">
            
            <div className="mt-5">
                <h1 className="border-b border-gray-400 py-2 text-2xl font-bold">Product Overview</h1>
                    <div className="border-b border-gray-400">
                        <div className="nk-item-accordion flex cursor-pointer items-center justify-between py-4 px-2 transition duration-75 hover:bg-gray-100"
                        onClick={() => setIsOpen5(!isOpen5)}>
                        <h1 className="font-semibold">Item &amp; Description</h1>
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
                                <h1 className="font-semibold">Product Description</h1>
                                <p className="w-3/4">
                                    Originally released in 1982, the Nike Air Force 1 was the first Nike model to feature "Air" technology. 
                                    This legendary basketball sneaker wa designed by Bruce Kilgore, and named after the aircraft carries, 
                                    the Air Force One. The Air Force 1 is Nike's most popular sneaker to date, has been produced in nearly 
                                    2,000 different colorways, and available in low, mid, and high-top models.
                                </p>
                                <div class="mt-8">
                                    <h1 class="font-semibold">Product details</h1>
                                    <div>
                                        <p><span class="font-semibold">Package Dimensions: </span>15.83 x 9.61 inches; 3.17 Pounds</p>
                                        <p><span class="font-semibold">Departments: </span>Mens, Shoes & Accessories</p>
                                        <p><span class="font-semibold">Date First Available: </span>August 9, 2021</p>
                                        <p><span class="font-semibold">Manufacture: </span>Nike</p>
                                        <p><span class="font-semibold">SKU: </span>NIK123456790</p>
                                        <p><span class="font-semibold">MODEL: </span>NK01234567890</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        onClick={() => setIsOpen3(!isOpen3)}>
                        <h1 className="font-semibold">Questions &amp; Answers</h1>
                        <span
                            className={`nk-chevron-icon transition-transform duration-200 ease-in ${
                            isOpen3 ? "rotate-180" : "rotate-0"
                            }`}>
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        </div>
                        <div
                        className="nk-item-info overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxHeight: isOpen3 ? "300px" : "0",
                            opacity: isOpen3 ? 1 : 0,
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
        </>
    );
}   

export default ProductDiscription;