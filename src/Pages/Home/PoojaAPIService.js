// apiService.js
import axios from 'axios';

// const BASE_URL = 'https://parampara-admin.vercel.app/api/pooja';
const BASE_URL=`http://localhost:3000/api/pooja`;
// const BASE_URL='http://localhost:3005/api/pooja'
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';



// Function to fetch all pooja data
export const fetchPoojaData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all-pooja`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pooja data:', error);
    throw error;
  }
};

