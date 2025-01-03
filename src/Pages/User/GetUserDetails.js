// GetUserDetails.js
import axios from "axios";

export const getUserByEmail = async (navigate) => {
  const APIURL = "http://localhost:3000/api/user/get-user/";
  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("userEmail");

  if (!isLoggedIn) {
    navigate("/sign-in");
    return { data: null, error: "Not logged in." };
  }

  if (!userEmail) {
    return { data: null, error: "User email not found in session." };
  }
  try {
    const response = await axios.post(
      APIURL,
      { email: userEmail },
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );

    if (response.data.status === 1) {
      return { data: response.data.data, error: null };
    } else {
      return { data: null, error: "User not found." };
    }
  } catch (err) {
    console.error("API call error:", err);
    return { data: null, error: "Failed to fetch user data." };
  }
};