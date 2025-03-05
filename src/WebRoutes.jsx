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
// import CheckNotificationofSocket from "./Pages/CheckNotificationofSocket";
import Accordion from "./Pages/Accordion";
import OrderPreview from "./Pages/ShopPages/OrderPreview";
import BookingReceipt from "./Pages/ShopPages/BookingReceipt";
import Bhajan from "./Pages/BhajanMandal/Bhajan";
import SingleBhajanMandal from "./Pages/BhajanMandal/SingleBhajanMandal";
import BrahmanBhoj from "./Pages/BrahmanBhoj/BrahmanBhoj";
import ContactUs from "./Pages/Contact/ContactUs";
import EStoreProductDetails from "./Pages/EStore/EStoreProductDetails";

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
          <Route path="/order-preview/:id" element={<OrderPreview/>}/>
          <Route path="/order-receipt/:id" element={<BookingReceipt/>}/>
          <Route path="/product/:id" element={<EStoreProductDetails/>}/>
          <Route path="/location" element={<LocationFetcher/>}/>
          {/* Check notifiction */}
          {/* <Route path="/notification" element={<CheckNotificationofSocket/>}/> */}
          <Route path="/accordian" element={<Accordion/>}/>
          <Route path="/bhajan-mandal" element={<Bhajan/>}/>
          <Route path="/bhajan-mandal/:slug_url"element={<SingleBhajanMandal/>}/>
          <Route path="/brahman-bhoj" element={<BrahmanBhoj/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
        </Routes>
        </>
    );
}
export default WebRoutes;