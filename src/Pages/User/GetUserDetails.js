import axios from "axios";

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

export const getUserByEmail = async (navigate) => {
  const APIURL = "http://34.131.41.101:3000/api/user/get-user/";
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");
  
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
      return response.data.data;
    } else {
      return { data: null, error: "User not found." };
    }
  } catch (err) {
    console.error("API call error:", err);
    return { data: null, error: "Failed to fetch user data." };
  }
};

export const fetchPoojaOrders = async (userId) => {
  try {
    const response = await fetch(`http://34.131.41.101:3000/api/orders/user/${userId}`, {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.orders || [];
  } catch (error) {
    console.error('Error fetching ecommerce orders:', error);
    return [];
  }
};

export const fetchBhajanOrders = async (userId) => {
  try {
    const response = await fetch(`http://34.131.41.101:3000/api/bhajan-mandali/booking-user/${userId}`, {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data.data);
    return data.data ? [data.data] : []; // Return as array for consistency
  } catch (error) {
    console.error('Error fetching bhajan orders:', error);
    return [];
  }
};

export const fetchEcommerceOrders = async (userId) => {
  try {
    const response = await fetch(`http://34.131.41.101:3000/api/e-stroe/user-order/${userId}`, {
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
 
    return data.orderData || [];
  } catch (error) {
    console.error('Error fetching pooja orders:', error);
    return [];
  }
};