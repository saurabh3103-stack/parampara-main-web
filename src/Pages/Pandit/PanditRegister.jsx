import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createPandit } from "./PanditApiServices";
import Breadcrumb from "../../Component/Breadcrumb";

const PanditRegister = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        mobile: "",
    });

    const navigate = useNavigate();
    

    const breadcrumbLinks = [
        { label: "Home", url: "/" },
        { label: "Register Pandit", url: "/register-pandit" },
        { pagename: "Register Pandit" },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createPandit(formData, import.meta.env.VITE_TOKEN); // Call service function
            sessionStorage.setItem("storedEmail", formData.email); // Store email
            toast.success("Pandit registered successfully!", {
                position: "top-right",
                autoClose: 1500,
            });
            setTimeout(() => navigate("/pandit/profile"), 1500); // Navigate after toast
        } catch (error) {
            toast.error(error.message || "Failed to register pandit.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
      

    return (
        <>
            <section>
                <ToastContainer />
                <Breadcrumb links={breadcrumbLinks} />
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mt-5 w-full space-y-4 px-4 text-sm xl:max-w-7xl">
                        <div>
                            <h1 className="text-xl font-extrabold sm:text-3xl">Pandit Registration</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
                            <div className="flex flex-auto items-center justify-between px-4">
                                <div className="text-base font-semibold sm:text-lg">Pandit Registration</div>
                            </div>
                            <div className="w-full border-b border-gray-400"></div>
                            <div className="w-full space-y-4 px-4 lg:w-2/3">
                                <div className="flex flex-col items-center space-y-1 sm:flex-row sm:space-y-0">
                                    <div className="w-full text-sm sm:w-1/3">Full Name <span className="text-red-500">*</span></div>
                                    <div className="flex w-full sm:w-2/3">
                                        <input
                                            className="block w-full rounded bg-gray-100 p-2.5 text-sm text-gray-900"
                                            type="text"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col sm:flex-row">
                                    <div className="w-full sm:w-1/3">Password <span className="text-red-500">*</span></div>
                                    <div className="flex w-full sm:w-2/3">
                                        <input
                                            className="block w-full rounded bg-gray-100 p-2.5 text-sm text-gray-900"
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col sm:flex-row">
                                    <div className="w-full sm:w-1/3">mobile <span className="text-red-500">*</span></div>
                                    <div className="flex w-full sm:w-2/3">
                                        <input
                                            className="block w-full rounded bg-gray-100 p-2.5 text-sm text-gray-900"
                                            type="tel"
                                            id="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col sm:flex-row">
                                    <div className="w-full sm:w-1/3">Email address <span className="text-red-500">*</span></div>
                                    <div className="flex w-full sm:w-2/3">
                                        <input
                                            className="block w-full rounded bg-gray-100 p-2.5 text-sm text-gray-900"
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-b border-gray-400"></div>
                            <div className="flex flex-auto items-center space-x-6 px-4 text-xs">
                                <button
                                    type="submit"
                                    className="btn-gradient w-44 sm:w-40"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="reset"
                                    className="w-32 rounded border border-gray-400 py-3 hover:bg-gray-200 hover:shadow-md sm:w-40"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default PanditRegister;
