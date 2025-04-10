import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";

const UserSignUp = () => {
  const APIURL = "http://192.168.1.36:3000/api/";
  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const config = {
        method: "post",
        url: APIURL + "user/create-user",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        data: JSON.stringify(formData),
      };

      const { data } = await axios(config);

      if (data.status === 1) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userPassword", formData.password);
        localStorage.setItem("isLoggedIn", "true");
        setResponseMessage("User created successfully!");
        navigate("/user/dashboard");
      } else {
        setResponseMessage("User Already Exist. Please Login.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred while creating the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div className="rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50 shadow-lg overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=500')] bg-cover bg-center opacity-20"></div>
          <div className="relative py-8 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <User className="h-12 w-12 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-800 font-serif">Create Account</h1>
            <p className="text-sm text-orange-700">Join our spiritual community today!</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-orange-800 font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 py-2.5 rounded-lg border border-amber-200 bg-amber-50 focus:border-orange-300 focus:ring-orange-300"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-orange-800 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 py-2.5 rounded-lg border border-amber-200 bg-amber-50 focus:border-orange-300 focus:ring-orange-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-orange-800 font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 py-2.5 rounded-lg border border-amber-200 bg-amber-50 focus:border-orange-300 focus:ring-orange-300"
                  placeholder="Your mobile number"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-orange-800 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-amber-200 bg-amber-50 focus:border-orange-300 focus:ring-orange-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-orange-500 hover:text-orange-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-orange-800 font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-orange-500" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-amber-200 bg-amber-50 focus:border-orange-300 focus:ring-orange-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-2.5 text-orange-500 hover:text-orange-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-sm text-red-600 font-medium">{errorMessage}</p>}
            {responseMessage && <p className="text-sm text-green-600 font-medium">{responseMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="flex-grow h-px bg-amber-200"></div>
            <span className="px-3 text-sm text-orange-700">or</span>
            <div className="flex-grow h-px bg-amber-200"></div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 border border-amber-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 rounded-md"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-amber-200">
            <p className="text-sm text-orange-700">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-medium text-orange-600 hover:text-orange-800 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;