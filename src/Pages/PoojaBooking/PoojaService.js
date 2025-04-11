import axios from 'axios';

const ApiUrl = 'http://192.168.1.36:3000/api';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';


export const fetchPoojaByCategory = async (categoryId) => {
    try {
      const url = categoryId
        ? `${ApiUrl}/bhajanMandal/all-bhajanCategoryId/${categoryId}`
        : `${ApiUrl}/pooja/all-poojaUser`;
  
      const response = await axios.get(url, {
        headers: { Authorization: token}, // Using the already defined token
      });
  
      return response.data;
    } catch (err) {
      console.error("Error fetching bhajans by category:", err);
      throw err;
    }
  };

export const fetchPujaDetails = async (id) => {
  try {
    const response = await axios.get(`${ApiUrl}/pooja/pooja/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching bhajans by category:", err);
    throw err;}
}

export const getAllPooja = async () => {
  try {
    const response = await axios.get(`${ApiUrl}/pooja/all-poojaUser`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching all pooja users:", err);
    throw err;
  }
};
