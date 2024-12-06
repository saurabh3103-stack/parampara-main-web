import React from "react";
import Slider from "../../Component/Slider";
import AboutDetails from "../../Component/Data/AboutDetails";
import Service from "../../Component/Data/Service";
import VirtualService from "../../Component/Data/VirtualService";
import LatestProduct from "../../Component/Data/LatestProduct";
import TopDeals from "../../Component/Data/TopDeals";
import PromotionalBanner from "../../Component/PromotionalBanner";
import Achievement from "../../Component/Achievement";

const HomePage = () => {
    return(
        <>
            <Slider/>
            <AboutDetails/>
            <Service/>
            <Achievement/>
            <VirtualService/>
            <LatestProduct/>
            <PromotionalBanner/>
            <TopDeals/>
        </>
    );
}
export default HomePage;