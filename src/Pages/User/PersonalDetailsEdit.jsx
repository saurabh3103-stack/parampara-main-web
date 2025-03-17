import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalDetailsEdit = ({ userData }) => {
    const userId = userData?._id;
    const [formData, setFormData] = useState({ ...userData, userId });
    const [loading, setLoading] = useState(false);
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://34.131.10.8:3000/api/user/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: TOKEN,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("User details updated successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error(data.message || "Failed to update user details.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating user details.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white py-4 shadow">
            <div className="flex items-center justify-between px-4">
                <div className="text-base font-semibold sm:text-lg">Edit Personal Details</div>
            </div>
            <div className="w-full border-b border-gray-400"></div>
            <form className="px-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                    { label: "Full Name", name: "username", type: "text" },
                    { label: "Date of Birth", name: "dob", type: "date" },
                    { label: "Phone", name: "mobile", type: "number" },
                    { label: "Alternate Phone", name: "alternate_no", type: "number" },
                    { label: "Email address", name: "email", type: "email" },
                    { label: "Gender", name: "gender", type: "text" },
                    { label: "Aadhar Number", name: "aadhar_no", type: "number" },
                    { label: "Address", name: "address", type: "text" },
                    { label: "City", name: "city", type: "text" },
                    { label: "State", name: "state", type: "text" },
                    { label: "Postal Code", name: "pincode", type: "text" },
                    { label: "Country", name: "country", type: "text" },
                ].map(({ label, name, type }) => (
                    <div key={name} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">{label}:</label>
                        <input
                            type={type} // Corrected
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded border-transparent bg-gray-100 p-2.5 text-sm text-gray-900"
                        />
                    </div>
                ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="btn-gradient px-4 py-2 text-white rounded-lg shadow"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default PersonalDetailsEdit;
