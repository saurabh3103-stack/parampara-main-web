const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const submitOrder = async (formData) => {  
  try {
      const orderResponse = await fetch('http://192.168.1.36:3000/api/order/pooja-booking', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
      });

      const orderData = await orderResponse.json();
      
      if (!orderResponse.ok) {
          return { success: false, message: orderData.message || 'Failed to place order' };
      }
      // Step 2: If order is successful, submit the delivery address
      const orderId = orderData.poojaBooking.bookingId; // Ensure you extract the correct order ID
      const addressData = {
          OrderId: orderId,
          DeliveryAddress: {
              AddressLine1: formData.aptSuite || "",
              AddressLine2: formData.streetAddress || "",
              Landmark: formData.landmark || "",
              Location: formData.streetAddress,
              Latitude: formData.latitude,
              Longitude: formData.longitude,
              City: formData.city,
              State: formData.state,
              PostalCode: formData.zipCode,
              Country: formData.country,
          }
      };
      const addressResponse = await fetch('http://192.168.1.36:3000/api/order/delivery-address', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
      });
      const addressDataResponse = await addressResponse.json();
      if (!addressResponse.ok) {
          return { success: false, message: addressDataResponse.message || 'Failed to save delivery address' };
      }
      const cartClearResponse = await fetch(`http://192.168.1.36:3000/api/cart/remove/${formData.poojaId}/${formData.userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const cartClearData = await cartClearResponse.json();
    if (!cartClearResponse.ok) {
        return { success: false, message: cartClearData.message || 'Failed to clear cart' };
    }
    return { success: true, orderData, addressDataResponse };

  } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
  }
};


export const submitBhajanBooking = async (formData) => {
    try {
    const {
        poojaId: mandaliId,
        poojaName: mandaliName,
        poojaType: mandaliType,
        ...rest
    } = formData;
    const updatedFormData = {
        ...rest,
        mandaliId,
        mandaliName,
        mandaliType
    };
        const orderResponse = await fetch('http://192.168.1.36:3000/api/order/bhajan-mandali', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFormData),
        });
        const orderData = await orderResponse.json();
        if (!orderResponse.ok) {
            return { success: false, message: orderData.message || 'Failed to place order' };
        }
        // Step 2: If order is successful, submit the delivery address
        const orderId = orderData.bhajanbooking.bookingId; // Ensure you extract the correct order ID
        const addressData = {
            OrderId: orderId,
            DeliveryAddress: {
                AddressLine1: formData.aptSuite || "",
                AddressLine2: formData.streetAddress || "",
                Landmark: formData.landmark || "",
                Location: formData.streetAddress,
                Latitude: formData.latitude,
                Longitude: formData.longitude,
                City: formData.city,
                State: formData.state,
                PostalCode: formData.zipCode,
                Country: formData.country,
            }
        };
        const addressResponse = await fetch('http://192.168.1.36:3000/api/order/delivery-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });
        const addressDataResponse = await addressResponse.json();
        if (!addressResponse.ok) {
            return { success: false, message: addressDataResponse.message || 'Failed to save delivery address' };
        }
        const cartClearResponse = await fetch(`http://192.168.1.36:3000/api/cart/remove/${mandaliId}/${formData.userId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });
      const cartClearData = await cartClearResponse.json();
      if (!cartClearResponse.ok) {
          return { success: false, message: cartClearData.message || 'Failed to clear cart',orderData, addressDataResponse };
      }
      return { success: true, orderData, addressDataResponse };
  
    } catch (error) {
        console.error('Error:', error);
        return { success: true, message: error.message, orderData, addressDataResponse };
    }
  };
  
  export const fetchOrderReceipt = async (orderID) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";

        const urls = [
            `http://192.168.1.36:3000/api/orders/${orderID}`,
            `http://192.168.1.36:3000/api/order/delivery-address/${orderID}`
        ];

        const requests = urls.map(url =>
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).catch(() => null) // Handle failed requests gracefully
        );

        const [orderReceipt, deliveryAddress] = await Promise.all(requests);

        if (!orderReceipt) {
            return { error: "No order details found" };
        }

        return { orderReceipt, deliveryAddress };

    } catch (error) {
        console.error("Error fetching booking receipt:", error);
        return { error: "Failed to fetch booking receipt" };
    }
};
