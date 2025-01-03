// UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb";
import PersonalDetails from "./PersonalDetails";
import OrderDetails from "./OrderDetails";
import UserHeader from "./UserHeader";
import { getUserByEmail } from "./GetUserDetails";

const UserProfile = () => {
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


  const breadcrumbLinks = [
    { label: "Home", url: "/" },
    { label: "User", url: "javascript:void(0)" },
    { label: "Profile", url: "javascript:void(0)" },
    { pagename: "Profile" },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <div className="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
        <UserHeader userData={userData} />
        <div id="accOverview" className="animate-nk-acc-tab block space-y-12">
          <PersonalDetails userData={userData} />
          <OrderDetails />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
