import React from "react";


const PersonalDetails = ({userData}) => {
    return(
        <>
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                            <div class="flex flex-auto items-center justify-between px-4">
                                <div class="text-base font-semibold sm:text-lg">Personal Details</div>
                                <div>
                                <a href="account-settings.html">
                                    <div class="btn-gradient w-28 sm:w-40">Edit Profile</div>
                                </a>
                                </div>
                            </div>
                            <div class="w-full border-b border-gray-400"></div>
                            <div class="space-y-2 px-4">
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <div class="w-52 text-sm">Full Name:</div>
                                <span class="font-semibold">{userData.username}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <div class="w-52 text-sm">Date of Birth:</div>
                                <span class="font-semibold">{userData.dob}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Phone:</span><span class="font-semibold">{userData.mobile}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Alternate Phone:</span><span class="font-semibold">{userData.alternate_no}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Email address:</span><span class="font-semibold">{userData.email}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Gender:</span><span class="font-semibold">{userData.gender}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Addhar Number:</span><span class="font-semibold">{userData.aadhar_no}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Address:</span><span class="font-semibold">{userData.address}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">City:</span><span class="font-semibold">{userData.city}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">State:</span><span class="font-semibold">{userData.state}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Postal Code:</span><span class="font-semibold">{userData.pincode}</span>
                                </div>
                                <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                                <span class="w-52 text-sm">Country:</span><span class="font-semibold">{userData.country}</span>
                                </div>
                            </div>
                        </div>  
        </>
    );
}
export default PersonalDetails;