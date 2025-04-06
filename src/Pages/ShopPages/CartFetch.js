import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

export const fetchUserAndCartDetails = async () => {
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    return { user: null, cart: null, error: "User email not found in session." };
  }
  try {
    const userResponse = await axios.post(
      `${API_BASE_URL}/user/get-user`,
      { email: userEmail },
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    if (userResponse.data.status !== 1) {
      return { user: null, cart: null, error: "User not found." };
    }
    const userData = userResponse.data.data;
    const userID =userData._id;
    console.log(userID);
    const cartResponse = await axios.get(
      `${API_BASE_URL}/cart/get-cart/`+userID,
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    if (!cartResponse.data.success) {
      return { user: userData, cart: null, error: "Cart not found." };
    }
    const cartData = cartResponse.data.cart;
    return { user: userData, cart: cartData, error: null };
  } catch (err) {
    console.error("Error fetching user and cart details:", err);
    return { user: null, cart: null, error: "Failed to fetch data." };
  }
};
