import React from "react";
import Breadcrumb from "../../Component/Breadcrumb";

const PanditRegister = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Register Pandit', url: '/register-pandit' },
        { pagename : 'Register Pandit'},
      ];
    return(
        <>  
        <section>
            <Breadcrumb links={breadcrumbLinks}/>
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                    <div>
                        <h1 className="text-xl font-extrabold sm:text-3xl">Pandit Registration</h1>
                    </div>
                </div>
                <div id="accSettings" className="accTabContent block space-y-12">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div className="flex flex-auto items-center justify-between px-4">
                            <div className="text-base font-semibold sm:text-lg">Pandit Registration</div>
                        </div>
                        <div className="w-full border-b border-gray-400"></div>
                        <div className="w-full space-y-4 px-4 lg:w-2/3">
                            <div className="flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0">
                            <div className="w-full text-sm sm:w-1/3">Profile Picture <span className="text-red-500">*</span></div>
                            <div className="flex w-full space-x-2 sm:w-2/3 sm:space-x-4">
                                <div
                                className="flex-grow-1 h-14 w-14 flex-shrink-0 space-y-3 sm:h-24 sm:w-24 sm:flex-shrink sm:flex-grow-0">
                                <img className="h-full w-full rounded-full" src="assets/img/user-profile/avatar-7.jpg" alt="" />
                                </div>
                                <div className="space-y-3 text-xs text-gray-500 sm:text-sm">
                                <p className="text-red-500">Allowed format: PNG or JPEG. Max size of 1MB</p>
                                <p className="text-red-500">Size format: 1:1 or 500 x 500 px</p>
                                <div className="space-y-2">
                                    <div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input
                                        type="file"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"/>
                                    </label>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="w-full space-y-6">
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Full Name <span className="text-red-500">*</span></div>
                                <div
                                className="flex w-full flex-col items-center space-x-0 space-y-4 sm:w-2/3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <div className="w-full rounded bg-gray-100">
                                    <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="fullname"
                                   />
                                </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Date of Birth <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerDOB"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Company (<span className="italic">Optional</span>)</div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerCompany"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Phone <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerPhone"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Email address <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerEmail"/>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">City <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerCity"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">State/Province <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerSelectCity"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div className="w-full sm:w-1/3">Country <span className="text-red-500">*</span></div>
                                <div className="w-full rounded bg-gray-100 sm:w-2/3">
                                <input
                                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                                    type="text"
                                    id="customerSelectCountry"
                                    />
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="w-full border-b border-gray-400"></div>
                        <div className="flex flex-auto items-center space-x-6 px-4 text-xs">
                            <button className="btn-gradient w-44 sm:w-40">Save Changes</button>
                            <button className="w-32 rounded border border-gray-400 py-3 hover:bg-gray-200 hover:shadow-md sm:w-40">
                            Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}  

export default PanditRegister;