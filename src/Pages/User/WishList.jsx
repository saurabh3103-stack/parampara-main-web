import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb";
import UserHeader from "./UserHeader";
import { getUserByEmail } from "./GetUserDetails";

const WishList = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchUser = async () => {
          setLoading(true);
          const { data, error } = await getUserByEmail(navigate);
          if (data) {
            setUserData(data);
          } else {
            setError(error);
          }
          setLoading(false);
        };
    
        fetchUser();
      }, [navigate]);
    
    const breadcrumbLinks = [
        { label: "Home", url: "/" },
        { label: "User", url: "/user/profile" },
        { label: "Wishlist & Saved Items", url: "javascript:void(0)" },
        { pagename: "Wishlist & Saved Items" },
    ];
    
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return(
        <>
        <Breadcrumb links={breadcrumbLinks}/>
          <div class="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
            <UserHeader userData={userData}/>
            <div id="accOverview" className="animate-nk-acc-tab block space-y-12">   
                <div id="accWishlist" class="accTabContent block">
                    <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                    <div class="flex flex-col items-center justify-between space-y-2 px-4 sm:flex-row sm:space-y-0">
                        <div class="w-full text-base font-semibold sm:w-1/2 sm:text-lg">Wishlist &amp; Saved Items</div>
                        <div class="flex w-full flex-row items-center space-x-4 text-sm sm:w-1/2">
                        <div class="w-3/4 rounded">
                            <input
                            class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900"
                            type="text"
                            placeholder="Search by product name ..."/>
                        </div>
                        <button
                            class="from-primary-600 to-primary-800 hover:from-primary-600 hover:to-primary-800 focus:ring-primary-300 w-12 rounded bg-gradient-to-b py-[10px] text-sm leading-5 text-gray-50 transition duration-300 ease-in-out focus:outline-none focus:ring sm:w-40">
                            <span class="block sm:hidden"> <i class="fas fa-magnifying-glass"></i> </span><span class="hidden sm:block">Search Items</span>
                        </button>
                        </div>
                    </div>
                    <div class="w-full border-b border-gray-400"></div>
                    <div class="space-y-2 px-4">
                        <h1 class="text-left text-base font-semibold">Total Saved items: 3</h1>
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="mx-auto inline-flex w-full space-x-2 overflow-x-auto whitespace-nowrap pb-3">
                            <div class="flex-grow-1 flex-shrink-0 space-y-3 xl:w-full xl:flex-shrink xl:flex-grow-0">
                            <div class="grid grid-cols-12 items-center gap-4 px-4 font-semibold">
                                <div class="col-span-1">
                                <div class="flex items-center py-1">
                                    <input
                                    id="wishlist-check-all"
                                    aria-describedby="wishlist-check-all"
                                    type="checkbox"
                                    class="nk-checkbox-input"
                                    />
                                </div>
                                </div>
                                <div class="col-span-6 grid">Product</div>
                                <div class="col-span-1 grid">Price</div>
                                <div class="col-span-1 grid">Quantity</div>
                                <div class="col-span-1 grid">Status</div>
                                <div class="col-span-1 grid">Action</div>
                                <div class="col-span-1 grid">
                                <div class="text-right">Remove</div>
                                </div>
                            </div>
                            <div class="w-full border-b border-gray-400"></div>
                            <div class="grid grid-cols-12 items-center gap-4 px-4">
                                <div class="col-span-1">
                                <div class="flex items-center">
                                    <input type="checkbox" class="nk-checkbox-input" />
                                </div>
                                </div>
                                <div class="col-span-6 grid">
                                <a href="./shop-product.html">
                                    <div class="flex items-center space-x-2">
                                    <div class="h-12 w-12">
                                        <img
                                        class="mx-auto h-full w-full object-contain"
                                        src="./assets/img/products/fashion/women/15.jpg"
                                        alt="wishlist 1"
                                        />
                                    </div>
                                    <div>
                                        <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                        This is first fashion cloth long sleeve
                                        </div>
                                        <div class="cursor-pointer text-xs">
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                        <span class="hover:underline">(123)</span>
                                        </div>
                                    </div>
                                    </div>
                                </a>
                                </div>
                                <div class="col-span-1 grid">$139</div>
                                <div class="col-span-1 grid">
                                <select
                                    class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none">
                                    <option>Qty 1</option>
                                    <option>Qty 2</option>
                                    <option>Qty 3</option>
                                    <option>Qty 4</option>
                                    <option>Qty 5</option>
                                </select>
                                </div>
                                <div class="col-span-1 grid">
                                <div
                                    class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600">
                                    In Stock
                                </div>
                                </div>
                                <div class="col-span-1 grid">
                                <button onclick="location.href = './cart.html'" class="btn btn-full btn-outline">
                                    Add to Cart
                                </button>
                                </div>
                                <div class="col-span-1 grid">
                                <div class="hover:text-primary cursor-pointer text-right text-xs">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                </div>
                                <div class="col-span-1">
                                <div class="flex items-center">
                                    <input type="checkbox" class="nk-checkbox-input" />
                                </div>
                                </div>
                                <div class="col-span-6 grid">
                                <a href="./shop-product.html">
                                    <div class="flex items-center space-x-2">
                                    <div class="h-12 w-12">
                                        <img
                                        class="mx-auto h-full w-full object-contain"
                                        src="./assets/img/products/fashion/women/19.jpg"
                                        alt="wishlist 1"/>
                                    </div>
                                    <div>
                                        <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                        This is first fashion cloth long sleeve
                                        </div>
                                        <div class="cursor-pointer text-xs">
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                        <span class="hover:underline">(13)</span>
                                        </div>
                                    </div>
                                    </div>
                                </a>
                                </div>
                                <div class="col-span-1 grid">$39</div>
                                <div class="col-span-1 grid">
                                <select
                                    class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none">
                                    <option>Qty 1</option>
                                    <option>Qty 2</option>
                                    <option>Qty 3</option>
                                    <option>Qty 4</option>
                                    <option>Qty 5</option>
                                </select>
                                </div>
                                <div class="col-span-1 grid">
                                <div
                                    class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600">
                                    In Stock
                                </div>
                                </div>
                                <div class="col-span-1 grid">
                                <button onclick="location.href = './cart.html'" class="btn btn-full btn-outline">
                                    Add to Cart
                                </button>
                                </div>
                                <div class="col-span-1 grid">
                                <div class="hover:text-primary cursor-pointer text-right text-xs">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                </div>
                                <div class="col-span-1">
                                <div class="flex items-center">
                                    <input type="checkbox" class="nk-checkbox-input" />
                                </div>
                                </div>
                                <div class="col-span-6 grid">
                                <a href="./shop-product.html">
                                    <div class="flex items-center space-x-2">
                                    <div class="h-12 w-12">
                                        <img
                                        class="mx-auto h-full w-full object-contain"
                                        src="./assets/img/products/fashion/women/1.jpg"
                                        alt="wishlist 1"
                                        />
                                    </div>
                                    <div>
                                        <div class="line-clamp-1 cursor-pointer text-sm text-blue-700 hover:underline">
                                        This is first fashion cloth long sleeve
                                        </div>
                                        <div class="cursor-pointer text-xs">
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star"></i></span>
                                        <span class="text-yellow-400"><i class="fas fa-star-half"></i></span>
                                        <span class="hover:underline">(3)</span>
                                        </div>
                                    </div>
                                    </div>
                                </a>
                                </div>
                                <div class="col-span-1 grid">$19</div>
                                <div class="col-span-1 grid">
                                <select
                                    class="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-400 py-1 px-2 outline-none">
                                    <option>Qty 1</option>
                                    <option>Qty 2</option>
                                    <option>Qty 3</option>
                                    <option>Qty 4</option>
                                    <option>Qty 5</option>
                                </select>
                                </div>
                                <div class="col-span-1 grid">
                                <div
                                    class="col-span-1 grid rounded bg-green-200 px-3 py-[6px] text-center text-xs text-green-600">
                                    In Stock
                                </div>
                                </div>
                                <div class="col-span-1 grid">
                                <button onclick="location.href = './cart.html'" class="btn btn-full btn-outline">
                                    Add to Cart
                                </button>
                                </div>
                                <div class="col-span-1 grid">
                                <div class="hover:text-primary cursor-pointer text-right text-xs">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </div>      
        </>
    );
}

export default WishList;