import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import LoginStatus from "./LoginStatus";
const Authentication = () => {
    const navigate = useNavigate();
    const [isLoggedIn ,setIsLoggedIn] =useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token); 
      }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        navigate("/login");
      };
    return(
        <div class="nk-flex-row-2">
            <div data-dropdown="#account" class="nk-dropdown-slide hover:text-primary-600">
                    <div class="nk-dropdown-menu-link nk-main-nav">
                      <span><i class="fas fa-user"></i></span>
                    </div>
                    <div id="account" class="nk-dropdown-menu-animated nk-dropdown_menu w-52">
                      <div class="nk-dropdown-content">
                      {isLoggedIn ? (
                        <ul>
                          <li>
                            <a class="nk-account-link" href="./account-overview.html">
                              <span class="nk-account-link-span">Hi, John Doe</span>
                            </a>
                          </li>
                          <li>
                            <a class="nk-account-a" href="./account-settings.html">
                              <span class="nk-account-pl"><i class="fas fa-user"></i></span>
                              <span>Account Setting</span>
                            </a>
                            <a class="nk-account-a" href="./account-orders-purchase.html">
                              <span class="nk-account-pl"><i class="fas fa-shopping-bag"></i></span>
                              <span>Orders & Purchase</span>
                            </a>
                            <a class="nk-account-a" href="./account-orders-purchase.html">
                              <span class="nk-account-pl"><i class="fas fa-truck"></i></span>
                              <span>Track Order</span>
                            </a>
                            <a class="nk-account-a" href="./account-buy-it-again.html">
                              <span class="nk-account-pl"><i class="fas fa-redo"></i></span>
                              <span>Buy It Again</span>
                            </a>
                            <a class="nk-account-a" href="./account-wishlist.html">
                              <span class="nk-account-pl"><i class="fas fa-heart"></i></span>
                              <span>Wishlist & Saved Items</span>
                            </a>
                            <a class="nk-account-a" href="./account-gift-registry.html">
                              <span class="nk-account-pl"><i class="fas fa-gift"></i></span>
                              <span>Gifts Registry</span>
                            </a>
                            <a class="nk-account-a" href="./account-offers-deals.html">
                              <span class="nk-account-pl"><i class="fas fa-tags"></i></span>
                              <span>Offers & Deals</span>
                            </a>
                            <a class="nk-account-a" href="./shop-product.html#recently-viewed-items">
                              <span class="nk-account-pl"><i class="fas fa-file-alt"></i></span>
                              <span>Recently Viewed Items</span>
                            </a>
                            <a class="nk-account-a" href="./account-submit-return.html">
                              <span class="nk-account-pl"><i class="fas fa-file-upload"></i></span>
                              <span>Submit Items</span>
                            </a>
                            <a class="nk-account-a" href="./faqs.html">
                              <span class="nk-account-pl"><i class="fas fa-headset"></i></span>
                              <span>Get Help</span>
                            </a>
                            <button class="nk-account-a border-t" onClick={handleLogout}>
                              <span class="nk-account-pl"><i class="fas fa-sign-out-alt"></i></span>
                              <span class="text-base">Sign Out</span>
                            </button>
                          </li>
                        </ul>):(
                        <LoginStatus/>
                        )}
                      </div>
                     
                    </div>
            </div>
        </div>
    );
}
export default Authentication;