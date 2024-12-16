import axios from "axios";

const API_URL = `${import.meta.env.VITE_PARAMPARA_APIURL}/pandit`;
console.log(API_URL)

// Function to create a pandit
export const createPandit = async (formData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${API_URL}/create-pandit`, formData, { headers });
    return response.data; // Return response data for further use
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const fetchPanditDetails = async (email, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      `${API_URL}/get-pandit-by-email`,
      { email },
      { headers }
    );
    return response.data.data; // Return only the data object
  } catch (error) {
    throw error.response?.data || error.message;
  }
};



export const updatePanditDetails = async (formData, image, aadharImage) => {
  console.log(`${API_URL}/update-pandit`);

  try {
    // Prepare the headers with Authorization token
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "multipart/form-data", // Ensure content type is multipart
    };

    // Prepare formData
    const data = new FormData();
    // Append each key-value pair from formData
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    // Append image and aadhar_image if available
    if (image) data.append("image", image);
    if (aadharImage) data.append("aadhar_image", aadharImage);

    // Make the API request to update pandit details
    const response = await axios.post(
      `${API_URL}/update-pandit`, 
      data,
      { headers }
    );

    return response.data; // Return the response data from the API
  } catch (error) {
    // Handle error and throw it for the calling component to handle
    throw error;
  }
};
