import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginStatus from "./LoginStatus";
import { getUserByEmail } from "../Pages/User/GetUserDetails";

const Authentication = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(!!loggedInStatus);
    }, []);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await getUserByEmail();
                if (error) {
                    setError("Failed to fetch user details");
                    setUserData(null);
                } else {
                    setUserData(data);
                }
            } catch (err) {
                setError("An error occurred while fetching user details");
            } finally {
                setIsLoading(false);
            }
        };
        if (isLoggedIn) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="nk-flex-row-2">
            <div data-dropdown="#account" className="nk-dropdown-slide hover:text-primary-600">
                <div className="nk-dropdown-menu-link nk-main-nav">
                    <span><i className="fas fa-user"></i></span>
                </div>
                <div id="account" className="nk-dropdown-menu-animated nk-dropdown_menu w-52">
                    <div className="nk-dropdown-content">
                        {isLoggedIn ? (
                            userData && userData.username ? (
                                <ul>
                                    <li>
                                        <Link className="nk-account-link" to={'/user/profile'}>
                                            <span className="nk-account-link-span">Hi, {userData.username}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="nk-account-a" to={'/user/edit'}>
                                            <span className="nk-account-pl"><i className="fas fa-user"></i></span>
                                            <span>Account Setting</span>
                                        </Link>
                                        <Link className="nk-account-a" to={'/user/order-purchase'}>
                                            <span className="nk-account-pl"><i className="fas fa-shopping-bag"></i></span>
                                            <span>Orders & Purchase</span>
                                        </Link>
                                        <Link className="nk-account-a" to={'/user/profile'}>
                                            <span className="nk-account-pl"><i className="fas fa-truck"></i></span>
                                            <span>Track Order</span>
                                        </Link>
                                        <Link className="nk-account-a" to={'/user/wishlist'}>
                                            <span className="nk-account-pl"><i className="fas fa-heart"></i></span>
                                            <span>Wishlist & Saved Items</span>
                                        </Link>
                                        <button className="nk-account-a border-t" onClick={handleLogout}>
                                            <span className="nk-account-pl"><i className="fas fa-sign-out-alt"></i></span>
                                            <span className="text-base">Sign Out</span>
                                        </button>
                                    </li>
                                </ul>
                            ) : (
                                <div>No user details available</div>
                            )
                        ) : (
                            <LoginStatus />
                        )}
                        {error && <div className="error-message">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
