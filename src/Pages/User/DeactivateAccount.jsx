import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const DeactivateAccount = ({ userId, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus); // Track account status
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Track checkbox state

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const deactivateAccount = async () => {
    if (!isCheckboxChecked) {
      Toastify({
        text: "Please confirm deactivation using the checkbox.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "orange",
      }).showToast();
      return;
    }

    if (status === "inactive") {
      Toastify({
        text: "Your account is already inactive!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "blue",
      }).showToast();
      return;
    }

    try {
      const response = await axios.put(
        "http://34.131.10.8:3000/api/user/update-status",
        { userId, status: "inactive" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8",
          },
        }
      );

      if (response.data.status === 1) {
        setStatus("inactive");
        setIsCheckboxChecked(false); // Reset checkbox
        Toastify({
          text: "Account successfully deactivated!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
        }).showToast();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Toastify({
        text: `Failed to deactivate account: ${error.message}`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "orange",
      }).showToast();
    }
  };

  return (
    <div className="space-y-5 rounded-lg border border-gray-200 bg-white py-4 shadow">
      <div className="flex flex-auto items-center justify-between px-4">
        <div className="text-base font-semibold sm:text-lg">Deactivate your Account</div>
      </div>
      <div className="w-full border-b border-gray-400"></div>
      <div className="space-y-4 px-4">
        <div className="flex flex-auto items-center justify-between">
          <div className="text-base font-semibold sm:text-lg">
            You are about to deactivate your account permanently.
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>
            For security reasons, this action requires you to confirm your email or password before completing the
            process.
            <a href="javascript:void(0)">
              <span className="italic text-blue-600 hover:underline">Forget Password?</span>
            </a>
          </p>
        </div>
        <div className="text-sm text-gray-400">
          <p>You will lose all records of orders & payment history, and there is no turning back.</p>
        </div>
        <div className="flex items-center">
          <input
            id="DeactivateAccountId"
            aria-describedby="DeactivateAccountId"
            type="checkbox"
            className="text-primary-600 focus:ring-primary-500 h-5 w-5 rounded border-gray-400 bg-gray-100 focus:ring-2"
            onChange={handleCheckboxChange}
            checked={isCheckboxChecked}
          />
          <label htmlFor="DeactivateAccountId" className="ml-3 text-sm font-medium text-gray-900">
            I confirm my account deletion
          </label>
        </div>
      </div>
      <div className="w-full border-b border-gray-400"></div>
      <div className="flex flex-col space-y-2 px-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-xs text-gray-400 sm:text-sm">
          By clicking the "<span className="italic">Deactivate Account</span>" button, you agree to our
          <a className="underline" href="javascript:void(0)">
            terms of services
          </a>{" "}
          and{" "}
          <a className="underline" href="javascript:void(0)">
            privacy policy
          </a>
          .
        </div>
        <button
          className="btn-gradient btn-full sm:w-48"
          onClick={deactivateAccount}
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default DeactivateAccount;
