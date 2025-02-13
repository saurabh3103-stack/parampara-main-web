import React from "react";

const UserMenu = () => {
    return(
        <>
        <div class="block xl:hidden">
            <button id="account-dropdown-id" data-dropdown-toggle="account-dropdown-toggle" data-dropdown-placement="left-start" class="bg-primary hover:bg-primary-800 focus:ring-primary-300 inline-flex items-center rounded-md px-4 py-2.5 text-center text-sm font-medium text-white focus:ring-4" type="button">
                <i class="fas fa-list-dots"></i>
            </button>
            <div id="account-dropdown-toggle" class="z-10 hidden h-48 w-56 list-none divide-y divide-gray-100 overflow-y-auto rounded border border-gray-400 bg-white p-1 text-base shadow-md">
                <ul class="py-1" aria-labelledby="account-dropdown-id">
                    <li><a class="nk-dropdown-menu" href="account-overview.html">Account Overview</a></li>
                    <li><a class="nk-dropdown-menu" href="account-settings.html">Settings</a></li>
                    <li><a class="nk-dropdown-menu" href="account-orders-purchase.html">Orders & Purchase</a></li>
                    <li><a class="nk-dropdown-menu" href="account-shipping-billing.html">Shipping & Billing</a></li>
                    <li><a class="nk-dropdown-menu" href="account-buy-it-again.html">Buy It Again</a></li>
                    <li><a class="nk-dropdown-menu" href="account-wishlist.html">Wishlist & Saved Items</a></li>
                    <li><a class="nk-dropdown-menu" href="account-gift-registry.html">Gift Registry</a></li>
                    <li><a class="nk-dropdown-menu" href="account-offers-deals.html">Offers & Deals</a></li>
                    <li><a class="nk-dropdown-menu" href="account-submit-return.html">Submit Return</a></li>
                    <li><a class="nk-dropdown-menu" href="signin.html">Sign out</a></li>
                </ul>
            </div>
        </div>
        </>
    );
}

export default UserMenu;