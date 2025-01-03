import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../Component/Breadcrumb";
import UserHeader from "./UserHeader";
import { getUserByEmail } from "./GetUserDetails";

const UserSetting = () => {
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
        { label: "User", url: "/user/profile" },
        { label: "Edit Profile", url: "javascript:void(0)" },
        { pagename: "Edit Profile" },
    ];
    
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return (
        <>
        <Breadcrumb links={breadcrumbLinks}/>
                <div class="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                    <UserHeader userData={userData}/>
                </div>    
        </>
    );
}
export default UserSetting;