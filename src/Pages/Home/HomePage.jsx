import React from "react";
import AboutDetails from "../../Component/Data/AboutDetails";
import Service from "../../Component/Data/Service";
import VirtualService from "../../Component/Data/VirtualService";
import LatestProduct from "../../Component/Data/LatestProduct";
import TopDeals from "../../Component/Data/TopDeals";
import PromotionalBanner from "../../Component/PromotionalBanner";
import Achievement from "../../Component/Achievement";
import HeroSlider from "./hero-slider";
import PanditBookingPage from "./PanditBookingPage";

const HomePage = () => {
    return(
        <>
            <div className="relative">
                <HeroSlider />
            </div>
            <PanditBookingPage/>
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