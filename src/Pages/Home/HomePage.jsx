import React from "react";
import AboutDetails from "../../Component/Data/AboutDetails";
import Service from "../../Component/Data/Service";
import VirtualService from "../../Component/Data/VirtualService";
import PoojaEssential from "../../Component/Data/PoojaEssential";
import TopDeals from "../../Component/Data/TopDeals";
import PromotionalBanner from "../../Component/PromotionalBanner";
import Achievement from "../../Component/Achievement";
import HeroSlider from "./hero-slider";
import AvailableCities from "../../Component/Data/AvailableCities";
import FeaturedPoojas from "./FeaturedPoojas";
import WhyChooseUs from "../../Component/WhyChooseUs";
import Horoscope from "./Horoscope";
import SahityaSangrah from "../../Component/Data/SahityaSangrah";

const HomePage = () => {
    return(
        <>
            <div className="relative">
                <HeroSlider />
            </div>
            <AboutDetails/>
            <AvailableCities/>
            <Service/>
            <Achievement/>
            <FeaturedPoojas/>
            <VirtualService/>
            <PoojaEssential/>
            <PromotionalBanner/>
            <Horoscope/>
            <TopDeals/>
            <WhyChooseUs/>
            <SahityaSangrah/>
        </>
    );
}
export default HomePage;