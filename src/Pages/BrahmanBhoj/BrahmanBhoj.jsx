import React from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import BrahmanBhojForm from "./BrahmanBhojForm";

const BrahmanBhoj = () => {
    const breadcrumbLinks = [
        { label: 'Home', url: '/' },
        { label: 'Brahman Bhoj', url: '/brahman-bhoj' },
        { pagename: 'Brahman Bhoj' },
    ];
    return(
        <>
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100  pb-5">
                <Breadcrumb links={breadcrumbLinks} />
                <BrahmanBhojForm/>
            </div>
        </>
    );
}

export default BrahmanBhoj;