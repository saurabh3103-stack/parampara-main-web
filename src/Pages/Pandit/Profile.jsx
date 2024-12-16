import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from '../../Component/Breadcrumb';
import ProfileMenu from '../Pandit/ProfileMenu';
import { fetchPanditDetails } from "./PanditApiServices";
import { Link } from "react-router-dom";
const Profile = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Pandit', url: 'javascript:void(0)' },
        { label: 'My Account', url: 'javascript:void(0)'},
        { pagename : 'My Account'},
      ];

       const [profileData,setProfileData]=useState([])
          
      
          useEffect(() => {
            const fetchDetails = async () => {
              const storedEmail = sessionStorage.getItem("storedEmail");
              if (!storedEmail) {
                console.error("No email found in sessionStorage");
                return;
              }
        
              try {
                const data = await fetchPanditDetails(storedEmail, import.meta.env.VITE_TOKEN); // Call service function
                setProfileData(data); // Update state with fetched data
                console.log("Fetched Pandit Details:", data);
              } catch (error) {
                console.error("Error fetching Pandit details:", error.message);
              }
            };
        
            fetchDetails();
          }, [import.meta.env.VITE_TOKEN]);
         
    return (
        <>
            <section>
                <Breadcrumb links={breadcrumbLinks}/>
                <div class="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                    <div>
                        <h1 class="text-xl font-extrabold sm:text-3xl">My Account</h1>
                    </div>
                    <div class="space-y-3 rounded-lg border border-gray-400 bg-white pt-3 shadow">
                    <div class="flex flex-row justify-between px-4 pb-4 xl:pb-0">
                    <div class="flex flex-auto space-x-1.5 sm:space-x-3">
                        <div class="h-11 w-11 sm:h-20 sm:w-20">
                        <img class="border-primary-500 h-full w-full rounded-full border-2 p-[3px]" src="assets/img/user-profile/avatar-7.jpg" alt=""/>
                        </div>
                        <div>
                        <div class="flex flex-row items-center space-x-1 py-1">
                            <span class="text-sm font-extrabold sm:text-lg sm:font-bold">{profileData?.username} </span>
                            <span><img src="assets/icons/verified.svg" alt="" /></span>
                        </div>
                        <div class="space-y-2 text-xs font-semibold text-gray-400">
                            <p>AccountID: #ECX12345</p>
                            <div class="flex flex-col space-y-2 space-x-0 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
                            <div>
                                <span><i class="fas fa-user"></i></span> Customer
                            </div>
                            <div>
                                <span><i class="fas fa-map-marker-alt"></i></span> United States
                            </div>
                            <div class="whitespace-nowrap">
                                <span><i class="far fa-envelope"></i></span> {profileData?.email}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                        <ProfileMenu/>
                    </div>
                    <div class="hidden w-full border-b border-gray-400 xl:block"></div>
                    <div
                    id="accountTabs"
                    class="mx-auto hidden w-full items-center space-x-2 overflow-x-auto whitespace-nowrap px-4 pb-3 text-sm font-semibold xl:inline-flex xl:flex-row xl:flex-nowrap xl:justify-between xl:overflow-x-hidden">
                    <a class="nk-acc-active-tab" href="account-overview.html">
                        <div>Account Overview</div>
                    </a>
                    <a class="nk-account-tab" href="account-settings.html">
                        <div>Settings</div>
                    </a>
                    <a class="nk-account-tab" href="account-orders-purchase.html">
                        <div>Orders &amp; Purchase</div>
                    </a>
                    <a class="nk-account-tab" href="account-shipping-billing.html">
                        <div>Shipping &amp; Billing</div>
                    </a>
                    <a class="nk-account-tab" href="account-buy-it-again.html">
                        <div>Buy It Again</div>
                    </a>
                    <a class="nk-account-tab" href="account-wishlist.html">
                        <div>Wishlist &amp; Saved Items</div>
                    </a>
                    <a class="nk-account-tab" href="account-gift-registry.html">
                        <div>Gifts Registry</div>
                    </a>
                    <a class="nk-account-tab" href="account-offers-deals.html">
                        <div>Offers &amp; Deals</div>
                    </a>
                    <a class="nk-account-tab" href="account-submit-return.html">
                        <div>Submit Return</div>
                    </a>
                    </div>
                    <div id="accOverview" class="animate-nk-acc-tab block space-y-12">
                        <div class="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                        <div class="flex flex-auto items-center justify-between px-4">
                            <div class="text-base font-semibold sm:text-lg">Personal Details</div>
                            <div>
                            <Link to="/pandit/edit-profile">
                                <div class="btn-gradient w-28 sm:w-40" >Edit Profile</div>
                            </Link>
                            </div>
                        </div>
                        <div class="w-full border-b border-gray-400"></div>
                        <div class="space-y-2 px-4">
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <div class="w-52 text-sm">Full Name:</div>
                            <span class="font-semibold">{profileData?.username}</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <div class="w-52 text-sm">Date of Birth:</div>
                            <span class="font-semibold">01/08/1987</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Company:</span><span class="font-semibold">Neykart Co.</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Phone:</span><span class="font-semibold">{profileData?.mobile}</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Email address:</span
                            ><span class="font-semibold">{profileData?.email}</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Web:</span><span class="font-semibold">Neykart.com</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">City:</span><span class="font-semibold">Elkhart</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">State/Province:</span><span class="font-semibold">INDIANA</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">ZIP/Postal Code:</span><span class="font-semibold">46514</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Country:</span><span class="font-semibold">United States</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Timezone:</span><span class="font-semibold">(GMT-07:00) Pacific Time (US & Canada)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Language:</span><span class="font-semibold">English (US)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Currency:</span><span class="font-semibold">US Dollar (USD)</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center">
                            <span class="w-52 text-sm">Communication:</span><span class="font-semibold">Phone, Email</span>
                            </div>
                        </div>
                        </div>
                       
                    </div>
                </div>  
                </div>              
            </section>
        </>
    );
}


export default Profile;