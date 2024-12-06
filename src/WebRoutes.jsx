import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import PoojaBooking from './Pages/PoojaBooking/PoojaBooking';
import PanditRegister from './Pages/Pandit/PanditRegister';
import EStore from './Pages/EStore/EStore';
import Profile from "./Pages/Pandit/Profile";

const WebRoutes = () => {
    return(
        <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pooja-booking" element={<PoojaBooking />} />
          <Route path="/register-pandit" element={<PanditRegister/>}/>
          <Route path="/pandit/profile" element={<Profile/>}/>
          <Route path="/e-store" element={<EStore/>}/>
        </Routes>
        </>
    );
}
export default WebRoutes;