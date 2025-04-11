// api.js - API call handling
import axios from 'axios';

const ApiUrl = 'http://192.168.1.36:3000/api';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/bhajanMandal/ctegory-user`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching categories:', err);
    throw err;
  }
};

export const fetchBhajanMandal = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/bhajanMandal/active`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching Bhajan Mandal:', err);
    throw err;
  }
};

export const fetchBhajanByCategory = async (categoryId) => {
  try {
    const url = categoryId
      ? `${ApiUrl}/bhajanMandal/all-bhajanCategoryId/${categoryId}`
      : `${ApiUrl}/bhajanMandal/active`;

    const response = await axios.get(url, {
      headers: { Authorization: token}, // Using the already defined token
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching bhajans by category:", err);
    throw err;
  }
};


export const fetchBhajanDetails = async (slugUrl) => {
  try {
    const response = await axios.get(
      `${ApiUrl}/bhajanMandal/bhajan/${slugUrl}`,
      {
        headers: { Authorization: token },
      },
    );
    return response.data;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};