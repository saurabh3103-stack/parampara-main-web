import React,{useEffect,useState} from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import UserHeader from "./UserHeader";
import { getUserByEmail } from "./GetUserDetails";
import { useNavigate } from "react-router-dom";
import ShippingInfo from "./ShippingInfo";

const ShippingAddress = () => {
    const breadcrumbLinks = [
        { label: "Home", url: "/" },
        { label: "User", url: "/user/profile" },
        { label: "Shipping & Billing", url: "javascript:void(0)" },
        { pagename: "Shipping & Billing" },
    ];
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
      useEffect(() => {
        const fetchUser = async () => {
          setLoading(true);
          const { data, error } = await getUserByEmail(navigate);
          if (data) {
            setUserData(data);
          } else {
            setError(error);
          }
          setLoading(false);
        };
        fetchUser();
      }, [navigate]);
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }
    return(
        <>
            <Breadcrumb links={breadcrumbLinks}/>
            <div class="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                <UserHeader userData={userData}/>
                <div id="accShippingBilling" className="animate-nk-acc-tab block space-y-12">
                    <ShippingInfo/>
                </div>
            </div>
        
        </>
    );
}

export default ShippingAddress;