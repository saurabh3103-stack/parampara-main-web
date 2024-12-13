import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const LoginStatus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    return(
        <>
            <ul>
                <li>
                    <div class="nk-wishlist-container">
                        <div class="space-x-2">
                            <span>New User <Link to="/sign-up" className="text-red-800">Signup</Link></span>
                        </div>
                    </div>
                </li>
                <li class="btn-li">
                    <Link to="/sign-in"  class="bg-primary hover:bg-primary-800 focus:ring-primary-300 block rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 w-full">
                        Login
                    </Link>
                </li>
            </ul>
            {isModalOpen && (
        <div className="h-modal fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow w-full max-w-md">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form className="p-6">
              <h3 className="text-xl font-medium text-gray-900">Sign in to our platform</h3>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-primary hover:bg-primary-800 w-full py-2 rounded-lg text-white"
              >
                Login to your account
              </button>
            </form>
          </div>
        </div>
      )}
        </>
    );
}
export default LoginStatus;