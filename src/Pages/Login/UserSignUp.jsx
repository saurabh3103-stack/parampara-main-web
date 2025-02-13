import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom"; 
import axios from "axios";

const UserSignUp = () =>{
  const APIURL = "http://34.131.70.24:3000/api/";
  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
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
          navigate("/user/profile");
        } else {
          setResponseMessage("User Already Exist. Please Login.");
        }
      } catch (error) {
        console.error(error);
        setResponseMessage("An error occurred while creating the user.");
      }
    }
  };
    return(
        <>
      <div class="mx-auto mt-12 flex w-full flex-col items-end justify-center px-4 sm:mt-16 sm:max-w-md">
        <div class="w-[290px] rounded border border-gray-300 bg-white shadow-lg sm:w-[350px]">
          <div class="my-4 space-y-2 text-center">
            <h1 class="text-2xl">Create Account</h1>
            <p class="text-sm">Join our Platform today for better user Experience!</p>
          </div>
          <div class="space-y-10 px-3 pb-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              {responseMessage && <p className="text-green-600">{responseMessage}</p>}
              <div className="relative z-0 w-full">
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="fullname-signup"
                  className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Full Name <span className="font-semibold text-red-600">*</span>
                </label>
              </div>
              {/* Email */}
              <div className="relative z-0 w-full">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="sign-up-email"
                  className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Email address{" "}
                  <span className="font-semibold text-red-600">*</span>
                </label>
              </div>
              {/* Mobile  */}
              <div className="relative z-0 w-full">
                <input
                  id="mobile"
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="sign-up-email"
                  className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Mobile Number{" "}
                  <span className="font-semibold text-red-600">*</span>
                </label>
              </div>
              {/* Password */}
              <div className="relative z-0 w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="nk-na-toggleHideShow hover:text-primary-800 absolute inset-y-0 right-0 flex cursor-pointer items-center p-1 pr-3 pl-3 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
                <label
                  htmlFor="signup-password"
                  className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Enter password{" "}
                  <span className="font-semibold text-red-600">*</span>
                </label>
              </div>
              {/* Confirm Password */}
              <div className="relative z-0 w-full">
                <input
                  id="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  className="nk-na-password peer focus:border-primary-600 block w-full appearance-none border-0 border-b-2 border-gray-400 bg-transparent py-1.5 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="nk-na-toggleHideShow hover:text-primary-800 absolute inset-y-0 right-0 flex cursor-pointer items-center p-1 pr-3 pl-3 text-xs"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
                <label
                  htmlFor="confirm-password"
                  className="peer-focus:text-primary-600 absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Confirm password{" "}
                  <span className="font-semibold text-red-600">*</span>
                </label>
              </div>
              {/* Error Message */}
              {errorMessage && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                id="submitButton"
                className="btn-gradient btn-full"
              >
                Create Account
              </button>
            </form>
            <button
              class="focus:shadow-outline focus:border-primary-800 focus:bg-primary-800 focus:ring-primary-500 flex w-full flex-row justify-center rounded-md border border-blue-400 py-3 text-sm ring-offset-2 transition duration-300 ease-in-out hover:border-transparent hover:bg-blue-700 hover:text-gray-50 focus:text-white focus:outline-none focus:ring-2" style={{marginTop:"1rem"}}>
              <span class="mr-2"> <i class="fab fa-google"></i></span>
              Sign In with Google
            </button>
            <div class="text-sm" style={{marginTop:"1rem"}}>
              <p class="border-t border-gray-200 pt-3">
                Have an account?
                <Link class="hover:text-blue- font-bold text-blue-500 hover:underline" to={'/sign-in'}>Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button id="back-to-top" class="nk-scroll-to-top" title="Go to Top">
        <i class="fas fa-arrow-up"></i>
      </button>
        </>
    );
}
export default UserSignUp;