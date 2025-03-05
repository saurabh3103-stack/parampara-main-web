// api.js - API call handling
import axios from "axios";

const ApiUrl = "http://localhost:3000/api";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

export const fetchBhajanByCategory = async (categoryId) => {
    try {
        const url = categoryId === null
            ? `${ApiUrl}/product/get-all`
            : `${ApiUrl}/product/category-id/${categoryId}`;
        
        const response = await axios.get(url, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (err) {
        console.error("Error filtering by category:", err);
        throw err;
    }
};

export const fetchProductDetails = async (id) => {
    try{
        const url = `${ApiUrl}/product/product-details/${id}`;
        const response = await axios.get(url,{
            headers:{Authorization:token},
        });
        return response.data;
    }
    catch(err){
        console.log("Error in finding Data",err);
        throw err;
    }
}