import React from "react";
import { Link } from "react-router-dom";
import UserMenu from './UserMenu';
const UserHeader =({userData}) =>{

    return(
        <>
        <div>
                        <h1 class="text-xl font-extrabold sm:text-3xl">My Account</h1>
                    </div>
                    <div class="space-y-3 rounded-lg border border-gray-400 bg-white pt-3 shadow">
                    <div class="flex flex-row justify-between px-4 pb-4 xl:pb-0">
                        <div class="flex flex-auto space-x-1.5 sm:space-x-3">
                            <div class="h-11 w-11 sm:h-20 sm:w-20">
                                <img
                                    className="border-primary-500 h-full w-full rounded-full border-2 p-[3px]"
                                    src={userData.image ? userData.image : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'}
                                    alt=""
                                    />
                            </div>
                            <div>
                            <div class="flex flex-row items-center space-x-1 py-1">
                                <span class="text-sm font-extrabold sm:text-lg sm:font-bold">{userData.username}</span>
                                <span><img src="assets/icons/verified.svg" alt="" /></span>
                            </div>
                            <div class="space-y-2 text-xs font-semibold text-gray-400">
                                <p>AccountID: #ECX12345</p>
                                <div class="flex flex-col space-y-2 space-x-0 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
                                <div>
                                    <span><i class="fas fa-user"></i></span> Customer
                                </div>
                                {userData.city && (
                                    <div>
                                        <span><i class="fas fa-map-marker-alt"></i></span> {userData.city}
                                    </div>
                                )}
                                
                                <div class="whitespace-nowrap">
                                    <span><i class="far fa-envelope"></i></span> {userData.email}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    <UserMenu/>
                    </div>
                    <div class="hidden w-full border-b border-gray-400 xl:block"></div>
                    <div
                    id="accountTabs"
                    class="mx-auto hidden w-full items-center space-x-2 overflow-x-auto whitespace-nowrap px-4 pb-3 text-sm font-semibold xl:inline-flex xl:flex-row xl:flex-nowrap xl:justify-between xl:overflow-x-hidden">
                    <Link to={'/user/profile'} class="nk-acc-active-tab">
                        <div>Dashboard</div>
                    </Link>
                    <Link to={'/user/edit'} class="nk-account-tab">
                        <div>Edit Profile</div>
                    </Link>
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
                    </div>
        </>
    );
}
export default UserHeader;