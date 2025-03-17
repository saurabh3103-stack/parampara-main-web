import React from "react";

const CustomerReview = () => {
    const imgUrl = 'http://34.131.10.8:5173/';
    return (
        <>
            <div>
                                <div className="flex w-full flex-col space-y-3 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4 pb-4">
                                    <div className="w-full space-y-2 border-gray-400 pr-4 sm:w-1/2 sm:border-r">
                                        <p>Overall Rating &amp; Review</p>
                                        <p>What other customer say!</p>
                                        <div className="flex flex-col-reverse space-y-3 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
                                        <div className="w-full space-y-1 sm:w-3/4">
                                            <div className="flex flex-row items-center">
                                            <div className="w-2/12">5 <span className="hidden xl:inline-block"> stars</span></div>
                                            <div className="w-8/12 rounded-full bg-gray-200">
                                                <div className="h-1 w-5/6 rounded-full bg-yellow-400"></div>
                                            </div>
                                            <div className="w-2/12 text-center">83%</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                            <div className="w-2/12">4 <span className="hidden xl:inline-block"> stars</span></div>
                                            <div className="w-8/12 rounded-full bg-gray-200">
                                                <div className="h-1 rounded-full bg-yellow-400" style={{width:"9%"}}></div>
                                            </div>
                                            <div className="w-2/12 text-center">9%</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                            <div className="w-2/12">3 <span className="hidden xl:inline-block"> stars</span></div>
                                            <div className="w-8/12 rounded-full bg-gray-200">
                                                <div className="h-1 rounded-full bg-yellow-400" style={{width:"5%"}}></div>
                                            </div>
                                            <div className="w-2/12 text-center">5%</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                            <div className="w-2/12">2 <span className="hidden xl:inline-block"> stars</span></div>
                                            <div className="w-8/12 rounded-full bg-gray-200">
                                                <div className="h-1 rounded-full bg-yellow-400" style={{width:"1%"}}></div>
                                            </div>
                                            <div className="w-2/12 text-center">1%</div>
                                            </div>
                                            <div className="flex flex-row items-center">
                                            <div className="w-2/12">1 <span className="hidden xl:inline-block"> stars</span></div>
                                            <div className="w-8/12 rounded-full bg-gray-200">
                                                <div className="h-1 rounded-full bg-yellow-400" style={{width:"2%"}}></div>
                                            </div>
                                            <div className="w-2/12 text-center">2%</div>
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col items-center justify-center space-y-1 sm:w-1/4">
                                            <h1 className="text-5xl font-bold">4.9</h1>
                                            <p className="text-xs">out of 5</p>
                                            <p>
                                            <span className="text-yellow-400"><i className="fas fa-star"></i></span>
                                            <span className="hidden text-yellow-400 lg:inline-block"><i className="fas fa-star"></i></span>
                                            <span className="hidden text-yellow-400 lg:inline-block"><i className="fas fa-star"></i></span>
                                            <span className="hidden text-yellow-400 lg:inline-block"><i className="fas fa-star"></i></span>
                                            <span className="hidden text-yellow-400 lg:inline-block"><i className="fas fa-star"></i></span>
                                            </p>
                                            <p>(<a className="hover:underline" href="#">123 Reviews</a>)</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-2 sm:w-1/2">
                                        <p className="font-semibold">Rate this product</p>
                                        <div className="flex flex-row items-center space-x-3">
                                        <div className="h-12 w-12">
                                            <img
                                            className="h-full w-full rounded-full"
                                            src={imgUrl+'assets/img/user-profile/avatar-1.jpg'}
                                            alt=""/>
                                        </div>
                                        <div>
                                            <p>John Doe Smith</p>
                                            <p className="text-xs">United States</p>
                                        </div>
                                        </div>
                                        <div className="text-xs">Please write your Review</div>
                                        <p>
                                        <span className="cursor-pointer text-gray-400"><i className="far fa-star"></i></span>
                                        <span className="cursor-pointer text-gray-400"><i className="far fa-star"></i></span>
                                        <span className="cursor-pointer text-gray-400"><i className="far fa-star"></i></span>
                                        <span className="cursor-pointer text-gray-400"><i className="far fa-star"></i></span>
                                        <span className="cursor-pointer text-gray-400"><i className="far fa-star"></i></span>
                                        </p>
                                        <p>
                                        <input
                                            className="focus:ring-3 focus:ring-primary focus:border-primary w-60 rounded border border-b border-gray-500 bg-gray-100 py-2 text-xs outline-none focus:outline-none focus:ring-1"
                                            type="text"
                                            placeholder="Write a customer review ..."/>
                                        </p>
                                        <div className="w-40">
                                        <button>
                                            <span className="nk-chevron-icon bg-primary-600 hover:bg-primary-800 w-full rounded py-2 px-4 text-center text-xs text-gray-50 transition duration-200 ease-in-out">
                                            Post Review
                                            </span>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded bg-gray-100 py-2 px-5">
                                <p className="space-x-2">
                                <span>Sort by: </span>
                                <span>
                                    <select className="w-48 rounded border border-gray-400 bg-transparent p-1 outline-none">
                                    <option value="">Most Recent</option>
                                    <option value="">Oldest</option>
                                    </select>
                                </span>
                                </p>
                            </div>
                            <div id="getUserReview" className="space-y-6 space-x-2 xl:space-x-0">
                                <div  className="flex flex-col items-center space-y-2 border border-gray-400 px-3 py-4 text-sm sm:flex-row sm:space-y-0 mt-2">
                                <div className="flex w-full flex-col items-center space-y-1 text-sm sm:w-2/12">
                                    <div className="h-12 w-12">
                                    <img
                                        className="h-full w-full rounded-full text-xs"
                                        src={imgUrl+'assets/img/user-profile/avatar-1.jpg'}
                                        alt="User"/>
                                    </div>
                                    <p className="font-semibold">George Smith</p>
                                    <p className="italic text-green-500">
                                    <span><i className="fas fa-check-circle"></i></span>
                                    <span>Verified Buyer </span>
                                    </p>
                                    <p className="underline"><a href="#">Report profile</a></p>
                                </div>
                                <div className="w-full space-y-2 sm:w-5/12">
                                    <div className="flex flex-auto items-center justify-between">
                                    <div className="flex flex-row items-center space-x-1 text-xs">
                                        <p>
                                        <span className="text-yellow-400"><i className="fas fa-star"></i></span>
                                        </p>
                                        <span>4.9</span>
                                        <span>|</span>
                                        <p className="flex flex-row space-x-2">
                                        <span className="hidden sm:whitespace-nowrap md:block">United States </span>
                                        <span><img className="h-4 w-4" src={imgUrl+'assets/icons/flags/USA%402x.svg'} alt="USS Flag"/></span>
                                        </p>
                                    </div>
                                    <div className="font-semibold sm:whitespace-nowrap">01 May, 2021</div>
                                    </div>

                                    <div>
                                    <p>
                                        This products is amazing, I bought this product. It is comfortable and looks great. Its
                                        perhaps one of the more serious best products so far this year I have received from this
                                        company.
                                    </p>
                                    </div>
                                    <div className="flex flex-row space-x-6 text-base">
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer"><i className="far fa-thumbs-up"></i></span>
                                        <span>12</span>
                                    </div>
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer"><i className="far fa-thumbs-down"></i></span>
                                        <span>0</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center space-y-2 sm:w-3/12">
                                    <div className="text-center font-semibold">Was this review helpful to you?</div>
                                    <div className="space-x-3">
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">Yes</span>
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">No</span>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center sm:w-2/12">
                                    <p className="underline"><a href="#">Report Review</a></p>
                                </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2 border border-gray-400 px-3 py-4 text-sm sm:flex-row sm:space-y-0">
                                <div className="flex w-full flex-col items-center space-y-1 text-sm sm:w-2/12">
                                    <div className="h-12 w-12">
                                    <img
                                        className="h-full w-full rounded-full text-xs"
                                        src={imgUrl+'assets/img/user-profile/avatar-3.jpg'}
                                        alt="User"/>
                                    </div>
                                    <p className="font-semibold">Smith John</p>
                                    <p className="italic text-green-500">
                                    <span><i className="fas fa-check-circle"></i></span>
                                    <span>Verified Buyer </span>
                                    </p>
                                    <p className="underline"><a href="#!">Report profile</a></p>
                                </div>
                                <div className="w-full space-y-2 sm:w-5/12">
                                    <div className="flex flex-auto items-center justify-between">
                                    <div className="flex flex-row items-center space-x-1 text-xs">
                                        <p>
                                        <span className="text-yellow-400"><i className="fas fa-star"></i></span>
                                        </p>
                                        <span>4.8</span>
                                        <span>|</span>
                                        <p className="flex flex-row space-x-2">
                                        <span className="hidden sm:whitespace-nowrap md:block">United States </span>
                                        <span><img className="h-4 w-4" src={imgUrl+'assets/icons/flags/USA%402x.svg'} alt="USS Flag"/></span>
                                        </p>
                                    </div>
                                    <div className="font-semibold sm:whitespace-nowrap">28 April 2021</div>
                                    </div>

                                    <div>
                                    <p>
                                        This products is amazing, I bought this product. It is comfortable and looks great. Its
                                        perhaps one of the more serious best products so far this year I have received from this
                                        company.
                                    </p>
                                    </div>
                                    <div className="flex flex-row space-x-6 text-base">
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer"><i className="far fa-thumbs-up"></i></span>
                                        <span>19</span>
                                    </div>
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer"><i className="far fa-thumbs-down"></i></span>
                                        <span>0</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center space-y-2 sm:w-3/12">
                                    <div className="text-center font-semibold">Was this review helpful to you?</div>
                                    <div className="space-x-3">
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">Yes</span>
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">No</span>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center sm:w-2/12">
                                    <p className="underline"><a href="#">Report Review</a></p>
                                </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2 border border-gray-400 px-3 py-4 text-sm sm:flex-row sm:space-y-0">
                                <div className="flex w-full flex-col items-center space-y-1 text-sm sm:w-2/12">
                                    <div className="h-12 w-12">
                                    <img
                                        className="h-full w-full rounded-full text-xs"
                                        src={imgUrl+'assets/img/user-profile/avatar-2.jpg'}
                                        alt="User"/>
                                    </div>
                                    <p className="font-semibold">Mary Doe John</p>
                                    <p className="italic text-green-500">
                                    <span><i className="fas fa-check-circle"></i></span>
                                    <span>Verified Buyer </span>
                                    </p>
                                    <p className="underline"><a href="#!">Report profile</a></p>
                                </div>
                                <div className="w-full space-y-2 sm:w-5/12">
                                    <div className="flex flex-auto items-center justify-between">
                                    <div className="flex flex-row items-center space-x-1 text-xs">
                                        <p>
                                        <span className="text-yellow-400"><i className="fas fa-star"></i></span>
                                        </p>
                                        <span>4.8</span>
                                        <span>|</span>
                                        <p className="flex flex-row space-x-2">
                                        <span className="hidden sm:whitespace-nowrap md:block">South Africa </span>
                                        <span><img className="h-4 w-4" src={imgUrl+'assets/icons/flags/south_africa%402x.svg'} alt="USS Flag"/></span>
                                        </p>
                                    </div>
                                    <div className="font-semibold sm:whitespace-nowrap">26 April 2021</div>
                                    </div>

                                    <div>
                                    <p>
                                        This products is amazing, I bought this product. It is comfortable and looks great. Its
                                        perhaps one of the more serious best products so far this year I have received from this
                                        company.
                                    </p>
                                    </div>
                                    <div className="flex flex-row space-x-6 text-base">
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer">
                                            <i className="far fa-thumbs-up"></i></span>
                                        <span>39</span>
                                    </div>
                                    <div>
                                        <span className="hover:text-primary-600 cursor-pointer">
                                        <i className="far fa-thumbs-down"></i></span>
                                        <span>1</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center space-y-2 sm:w-3/12">
                                    <div className="text-center font-semibold">Was this review helpful to you?</div>
                                    <div className="space-x-3">
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">Yes</span>
                                    <span className="cursor-pointer rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">No</span>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center sm:w-2/12">
                                    <p className="underline"><a href="#">Report Review</a></p>
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="ml-20 flex flex-auto items-center space-x-2">
                                <span className="flex">
                                    <img  className="z-30 h-7 w-7 rounded-full border-2 border-gray-50"
                                    src={imgUrl+'assets/img/user-profile/avatar-1.jpg'}
                                    alt=""/>
                                    <img className="z-20 -ml-3 h-7 w-7 rounded-full border-2 border-gray-50"
                                    src={imgUrl+'assets/img/user-profile/avatar-2.jpg'}
                                    alt=""/>
                                    <img className="z-10 -ml-3 h-7 w-7 rounded-full border-2 border-gray-50"
                                    src={imgUrl+'assets/img/user-profile/avatar-3.jpg'}
                                    alt=""/>
                                    <img className="z-0 -ml-3 h-7 w-7 rounded-full border-2 border-gray-50"
                                    src={imgUrl+'assets/img/user-profile/avatar-4.jpg'}
                                    alt=""/>
                                </span>
                                <span>
                                    <a href="#"><span className="mr-2">123 more Reviews</span>
                                    <span><i className="fas fa-chevron-down"></i></span> </a></span>
                                </div>
                            </div>
        </>
    );
}
export default CustomerReview;