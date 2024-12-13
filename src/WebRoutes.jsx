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
          <Route path="/sign-in" element={<UserSignIn/>}/>
          <Route path="/sign-up" element={<UserSignUp/>}/>
          <Route path="/user/profile" element={<UserProfile/>}/>
          <Route path="/location" element={<LocationFetcher/>}/>
        </Routes>
        </>
    );
}
export default WebRoutes;