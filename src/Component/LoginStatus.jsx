import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const LoginStatus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    return(
        <>
            <ul>
                <li>
                    <Link to="/sign-in"  className="bg-primary hover:bg-primary-800 focus:ring-primary-300 block rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 w-full">
                        Login
                    </Link>
                </li>
                <li>
                    <div className="nk-wishlist-container">
                        <div className="space-x-2">
                            <span>New User <Link to="/sign-up" classNameName="text-red-800">Signup</Link></span>
                        </div>
                    </div>
                </li>
            </ul>
            {/* {isModalOpen && (
        <div classNameName="h-modal fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div classNameName="relative bg-white rounded-lg shadow w-full max-w-md">
            <div classNameName="flex justify-end p-2">
              <button
                type="button"
                classNameName="text-gray-400 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            <form classNameName="p-6">
              <h3 classNameName="text-xl font-medium text-gray-900">Sign in to our platform</h3>
              <div classNameName="mt-4">
                <label htmlFor="email" classNameName="block text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  classNameName="w-full mt-1 p-2 border rounded-lg"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div classNameName="mt-4">
                <label htmlFor="password" classNameName="block text-sm font-medium text-gray-900">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  classNameName="w-full mt-1 p-2 border rounded-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                classNameName="mt-6 bg-primary hover:bg-primary-800 w-full py-2 rounded-lg text-white"
              >
                Login to your account
              </button>
            </form>
          </div>
        </div>
      )} */}
        </>
    );
}
export default LoginStatus;