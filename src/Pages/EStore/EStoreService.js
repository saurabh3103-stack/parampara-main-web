// api.js - API call handling
import axios from "axios";

const ApiUrl = "http://34.131.10.8:3000/api";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
const generatePaymentId = () => {
    return "NAMO" + new Date().toISOString().replace(/[-T:.Z]/g, "");
};

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

export const fetchProductByCategory = async (id) => {
    try{
        const url = `${ApiUrl}/product/category/${id}`;
        const response = await axios.get(url,{
            headers:{Authorization:token},
        });
        return response.data;
    }
    catch (err){
        console.log("Error in finding Data",err);
        throw err;
    }
}


export const fetchUserAndCartDetails = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      return { user: null, cart: [], error: "User email not found in session." };
    }
    try {
      // Fetch user details
      const userResponse = await axios.post(
        `${ApiUrl}/user/get-user`,
        { email: userEmail },
        {
          headers: {
            Authorization: token, // Ensure token is defined
          },
        }
      );
      if (userResponse.data.status !== 1) {
        return { user: null, cart: [], error: "User not found." };
      }
      const userData = userResponse.data.data;
      const userID = userData._id;
      // Fetch cart details
      const cartResponse = await axios.get(
        `${ApiUrl}/product/cart/${userID}`,
        {
          headers: {
            Authorization: token, // Ensure Bearer token format
          },
        }
      );
      if (!cartResponse.data.success) {
        return { user: userData, cart: [], error: "Cart not found." };
      }
      const cartData = cartResponse.data.cartItems || []; // Ensure cartData is an array
      return { user: userData, cart: cartData, error: null };
    } catch (err) {
      console.error("Error fetching user and cart details:", err);
      return { user: null, cart: [], error: "Failed to fetch data." };
    }
  };



//   Order place 
  
export const submitOrder = async (formData) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
    try {
        // Validate formData
        if (!formData || !formData.products || !Array.isArray(formData.products)) {
            throw new Error("Invalid form data: products array is missing or invalid.");
        }

        // Prepare Order Data
        const orderPayload = {
            userId: formData.userId,
            username: formData.username,
            contactNumber: formData.contactNumber,
            email: formData.email ,
            combinedPaymentId: generatePaymentId(), // You can generate this dynamically if needed
            products: formData.products.map(product => ({
                productId: product.product_id, // Ensure this matches the API's expected field name
                productName: product.product_name,
                amount: product.amount,
                quantity: product.quantity,
            })),
        };

        console.log("Submitting Order:", orderPayload);

        // Step 1: Submit Order
        const orderResponse = await fetch('http://34.131.10.8:3000/api/e-store/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderPayload),
        });

        const orderData = await orderResponse.json();
        if (!orderResponse.ok) {
            return { success: false, error: orderData.message || 'Failed to place order' };
        }

        // Extract orderId from response
        const orderId = orderData.order?.orderId;
        if (!orderId) {
            throw new Error("Order ID not found in the response.");
        }

        // Step 2: Submit Delivery Address
        const addressData = {
            OrderId: orderId,
            userId: formData.userId,
            DeliveryAddress: {
                AddressLine1: formData.aptSuite || "",
                AddressLine2: formData.streetAddress || "",
                Landmark: formData.landmark || "",
                Location: formData.streetAddress,
                Latitude: formData.location?.lat || 0,
                Longitude: formData.location?.lng || 0,
                City: formData.city,
                State: formData.state,
                PostalCode: formData.zipCode,
                Country: formData.country,
            },
        };

        console.log("Submitting Address:", addressData);
        const addressResponse = await fetch('http://34.131.10.8:3000/api/order/delivery-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });

        const addressDataResponse = await addressResponse.json();
        if (!addressResponse.ok) {
            return { success: false, error: addressDataResponse.message || 'Failed to save delivery address' };
        }

        // Step 3: Clear Multiple Products from Cart
        console.log("Clearing Cart...");
        const deleteRequests = formData.products.map(async (product) => {
            const cartClearResponse = await fetch(`http://34.131.10.8:3000/api/product/cart/${formData.userId}/${product.product_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const cartClearData = await cartClearResponse.json();
            return cartClearResponse.ok ? { success: true, message: cartClearData.message } : { success: false, message: cartClearData.message || 'Failed to clear cart' };
        });

        // Execute all DELETE requests in parallel
        const cartClearResults = await Promise.all(deleteRequests);
        const failedCarts = cartClearResults.filter(result => !result.success);

        if (failedCarts.length > 0) {
            return { success: false, message: 'Some cart items failed to be removed', failedCarts };
        }

        return { success: true, orderData, addressDataResponse, cartClearResults };

    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: error.message };
    }
};
