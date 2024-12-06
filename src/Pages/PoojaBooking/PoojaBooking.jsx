import React,{useState, useEffect} from "react";
import Breadcrumb from '../../Component/Breadcrumb'
import Filter from "../../Component/Shop/Filter";
import FilterSection from "../../Component/Shop/FilterSection";
import PoojaCategory from "./PoojaCategory";
import SortPooja from "./SortPooja";
import Paginantion from "../../Component/Shop/Paginantion";
import axios from 'axios';

const PoojaBooking = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Pooja Serveice', url: '/pooja-booking' },
        { pagename : 'Pooja Serveice'},
      ];
    const ApiUrl ="http://localhost:3000/api";
    const tokken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
    const [categoryData ,setcatrgoryData]= useState([]);
    const [poojaData,setpoojaData]=useState([]);
    console.log(poojaData);
    const [loading,setloading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await axios.get(ApiUrl+"/pooja/category/web",{
                    headers: { Authorization: tokken },
                  });
                setcatrgoryData(response.data);
                setloading(false);
            }
            catch(err){
                setError(err.message);
                setloading(false);
            }
        };
        fetchData();
    },[])
    useEffect(()=>{
        const fetchPooja = async ()=>{
            try{
                const response = await axios.get(ApiUrl+"/pooja/all-pooja",{
                    headers:{Authorization:tokken},
                });
                if(response.data.status==1){
                    setpoojaData(response.data.data);
                    setloading(false);
                }
                else{
                    setError('No Pooja Found');
                    setloading(false);
                }
            }   
            catch(err){
                setError(err.message);
                setloading(false);
            }
        };
        fetchPooja();
    },[])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>  
            <section>
                <Breadcrumb links={breadcrumbLinks}/>
                    <div id="shop-grid-left" className="flex mx-auto w-full py-3 px-4 text-sm md:px-6 xl:max-w-7xl xl:px-4">
                        <Filter/>
                        <div class="mt-5 flex flex-col space-x-0 text-sm md:flex-row md:space-x-4">
                            <FilterSection/>
                            <div class="w-full space-y-3 sm:ml-0 md:w-3/4">
                                <PoojaCategory categoryData={categoryData}/>
                                {poojaData.map((item,index)=>(
                                <div class="w-full border border-gray-400 bg-white">
                                    <SortPooja/>
                                    <div class="w-full border-b border-gray-400"></div>
                                    <div>
                                    <div id="resultFilterGrid"  class="my-5 grid grid-cols-2 gap-y-8 gap-x-2.5 px-3 sm:grid-cols-3 md:grid-cols-3 lg:gap-x-5 xl:grid-cols-4">
                                        <div class="group rounded border-gray-400 pb-0 lg:pb-3">
                                        <div class="relative w-full cursor-pointer lg:h-[16.25rem]">
                                            <img class="mx-auto my-auto h-full w-full object-contain text-xs" src="assets/img/products/fashion/women/2.jpg" alt="Item 1"/>
                                            <div class="bg-primary/30 absolute inset-0 opacity-0 backdrop-blur-sm backdrop-filter transition duration-300 ease-in-out group-hover:opacity-100" >
                                            <div class="my-auto mx-auto flex h-full w-full flex-col items-center justify-center space-y-3 px-3">
                                                <div class="flex flex-row items-center justify-center space-x-2 px-2 text-center">
                                                <a href="account-wishlist.html">
                                                    <span class="hover:bg-primary inline-block h-10 w-10 bg-white p-2 hover:text-gray-50">
                                                    <i class="far fa-heart"></i>
                                                    </span>
                                                </a>
                                                <div  data-modal-toggle="nk-modal-quick-view" class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                                    <i class="fa-regular fa-eye"></i>
                                                </div>

                                                <a href="compare-items.html"><span class="hover:bg-primary h-10 w-10 bg-white p-2 hover:text-gray-50">
                                                    <i class="fas fa-exchange-alt"></i></span></a>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="xs:text-sm text-left text-xs">
                                            <div class="space-y-1">
                                                <div class="mt-2">
                                                <h6 class="line-clamp-1 cursor-pointer font-normal text-blue-700 hover:underline">
                                                    <a href="shop-product.html">Long multi-color dress event fashion</a>
                                                </h6>
                                                </div>
                                                <div class="font-semibold">
                                                <span class="text-lg text-gray-900">$199</span>
                                                <span class="text-xs text-gray-400 line-through">$299</span>
                                                </div>
                                                <div>
                                                <a class="flex items-center justify-between" href="shop-product.html#customers-rating-reviews">
                                                    <span class="text-yellow-400">
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    </span>
                                                    <span class="text-xs text-blue-700 hover:underline">(12)</span>
                                                </a>
                                                </div>
                                                <div class="text-xs font-semibold text-green-500">
                                                <p>Get it in 2 days</p>
                                                </div>
                                                <div>
                                                <p>
                                                    <span class="font-semibold">Shipping:</span> Free Shipping in 2 Days to
                                                    <span class="cursor-pointer font-semibold text-blue-900 hover:underline">Elkhart, IN</span>
                                                </p>
                                                </div>
                                                <div class="py-1">
                                                <a href="cart.html"><span class="btn btn-bg-slide btn-full inline-block text-center">Add to Cart</span>
                                                </a>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    
                                    </div>
                                    
                                    </div>
                                </div>
                                ))}
                                <Paginantion/>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}
export default PoojaBooking;