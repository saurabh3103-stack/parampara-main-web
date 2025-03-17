import React from "react";

const EStoreOrderDetails = ({ previewData ,deliveryAddress }) => {
    const userData = previewData.order.userDetails;
    return (
        <>
            <form className="mt-7 space--8" method="post" style={{ width: "100%" }}>
                <div className="mt-3 space-y-2 border border-gray-400 bg-white p-5 text-sm">
                    <div className="w-full space-y-6">
                        <div className="text-lg font-semibold">1. Customer details</div>
                        <div className="w-full space-y-6">
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Name <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={userData.username} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Email <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={userData.email} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Contact Number <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={userData.contactNumber} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Delivery Address <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.AddressLine1+" "+deliveryAddress.DeliveryAddress.AddressLine2} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">City <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.City} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">State <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.State} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Zip Code <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.PostalCode} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Country <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.Country} disabled/>
                                </div>
                            </div>
                            <div class="flex w-full flex-col items-center space-y-1 sm:flex-row sm:flex-nowrap sm:space-y-0">
                                <div class="w-full sm:w-1/3">Note <span class="text-red-500">*</span></div>
                                <div class="w-full rounded bg-gray-100 sm:w-2/3">
                                    <input class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900" type="text"  value={deliveryAddress.DeliveryAddress.AddressLine1} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EStoreOrderDetails;
