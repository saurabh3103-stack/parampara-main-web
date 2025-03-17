import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSignIn = () => {
    const navigate = useNavigate();
    const APIURL = "http://34.131.10.8:3000/api/";
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            method: "post",
            url: APIURL + "user/login",
            headers: {
                "Content-Type": "application/json",
                Authorization: TOKEN,
            },
            data: JSON.stringify(formData),
        };
        try {
            const { data } = await axios(config);
            if (data.status === 1) {
                const authToken = data.authToken;
                localStorage.setItem("userEmail", formData.email);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userPassword", formData.password);
                localStorage.setItem("authToken", authToken);
                console.log("AuthToken stored:", authToken); 
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate("/user/profile");
                }, 500);
            } else {
                setResponseMessage("Invalid credentials. Please try again.");
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login Failed:", error.response?.data || error.message);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <ToastContainer />
            <div class="mx-auto mt-12 flex w-full flex-col items-center justify-center px-4 sm:mt-16 sm:max-w-md">
                <div class="w-[290px] rounded border border-gray-300 bg-white shadow-lg sm:w-[350px]">
                    <div class="my-8 space-y-2 text-center">
                        <h1 class="old text-2xl">Sign In</h1>
                        <p class="text-sm">Welcome Back!</p>
                    </div>
                    <div class="space-y-8 px-3 pb-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full">
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    required/>
                                <label className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                                    Email address <span className="font-semibold text-red-600">*</span>
                                </label>
                            </div>

                            <div className="relative z-0 w-full">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    required/>
                                <span
                                    className="hover:text-primary-800 absolute inset-y-0 right-0 float-right flex cursor-pointer items-center p-1 pr-3 pl-3 text-xs"
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                                <label className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75">
                                    Password <span className="font-semibold text-red-600">*</span>
                                </label>
                            </div>

                            <div className="flex justify-between text-sm">
                                <div className="flex items-center">
                                    <input
                                        id="checkout-remember-me"
                                        type="checkbox"
                                        className="nk-checkbox-input"/>
                                    <label
                                        className="nk-checkbox-label">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <span>
                                        <a className="text-blue-500 hover:text-blue-700"
                                            href="forgetpassword-email.html">
                                            Forget Password?
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <button  type="submit" className="btn-gradient btn-full"  disabled={loading}>
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                            <div className="flex w-full flex-row items-center">
                                <span className="w-2/5 border-b"></span>
                                <span className="w-1/5 text-center">or</span>
                                <span className="w-2/5 border-b"></span>
                            </div>
                        </form>
                        <button
                        class="focus:shadow-outline focus:border-primary-800 focus:bg-primary-800 focus:ring-primary-500 flex w-full flex-row justify-center rounded-md border border-blue-400 py-3 text-sm ring-offset-2 transition duration-300 ease-in-out hover:border-transparent hover:bg-blue-700 hover:text-gray-50 focus:text-white focus:outline-none focus:ring-2" style={{marginTop:"1rem"}}>
                        <span class="mr-2"> <i class="fab fa-google"></i></span>
                        Sign In with Google
                        </button>
                        <div class="text-xs sm:text-sm" style={{marginTop:"1rem"}}>
                        <p class="border-t border-gray-200 pt-3">
                            Don't have an account?
                            <Link to={'/sign-up'} class="hover:text-blue- font-bold text-blue-500 hover:underline">Create Account</Link>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserSignIn;