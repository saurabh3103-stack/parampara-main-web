import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import PoojaBooking from './Pages/PoojaBooking/PoojaBooking';
import PanditRegister from './Pages/Pandit/PanditRegister';
import EStore from './Pages/EStore/EStore';
import Profile from "./Pages/Pandit/Profile";
import PoojaDetails from "./Pages/PoojaBooking/PoojaDetails";
import Cart from "./Pages/ShopPages/Cart";
import LocationFetcher from "./Pages/Locationfetch";
import UserSignIn from "./Pages/Login/UserSignIn";
import UserSignUp from "./Pages/Login/UserSignUp";
import UserProfile from "./Pages/User/UserProfile";
import UserSetting from "./Pages/User/UserSetting";
import ShippingAddress from "./Pages/User/ShippingAddress";
import WishList from "./Pages/User/WishList";
import OrderPurchase from "./Pages/User/OrderPurchase";
import Checkout from "./Pages/ShopPages/Checkout";
import CheckNotificationofSocket from "./Pages/CheckNotificationofSocket";
import Accordion from "./Pages/Accordion";

const WebRoutes = () => {
    return(
        <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pooja" element={<PoojaBooking />} />
          <Route path="/register-pandit" element={<PanditRegister/>}/>
          <Route path="/pandit/profile" element={<Profile/>}/>
          <Route path="/e-store" element={<EStore/>}/>
          <Route path="/pooja/pooja-details/:id" element={<PoojaDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/check-out" element={<Checkout/>}/>
          <Route path="/sign-in" element={<UserSignIn/>}/>
          <Route path="/sign-up" element={<UserSignUp/>}/>
          <Route path="/user/profile" element={<UserProfile/>}/>
          <Route path="/user/edit" element={<UserSetting/>}/>
          <Route path="/user/shipping-billing" element={<ShippingAddress/>}/>
          <Route path="/user/wishlist" element={<WishList/>}/>
          <Route path="/user/order-purchase" element={<OrderPurchase/>}/>
          <Route path="/location" element={<LocationFetcher/>}/>
          {/* Check notifiction */}
          <Route path="/notification" element={<CheckNotificationofSocket/>}/>
          <Route path="/accordian" element={<Accordion/>}/>
        </Routes>
        </>
    );
}
export default WebRoutes;