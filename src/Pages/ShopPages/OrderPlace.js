export const submitOrder = async (formData) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  
  try {
    console.log(formData);
      // Step 1: Submit Order
      const orderResponse = await fetch('http://34.131.10.8:3000/api/order/pooja-booking', {
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
              Latitude: formData.location.lat,
              Longitude: formData.location.lng,
              City: formData.city,
              State: formData.state,
              PostalCode: formData.zipCode,
              Country: formData.country,
          }
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
          return { success: false, message: addressDataResponse.message || 'Failed to save delivery address' };
      }
      const cartClearResponse = await fetch(`http://34.131.10.8:3000/api/cart/remove/${formData.cartId}`, {
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
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
    console.log(updatedFormData);
        // Step 1: Submit Order
        const orderResponse = await fetch('http://34.131.10.8:3000/api/order/bhajan-mandali', {
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
                Latitude: formData.location.lat,
                Longitude: formData.location.lng,
                City: formData.city,
                State: formData.state,
                PostalCode: formData.zipCode,
                Country: formData.country,
            }
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
            return { success: false, message: addressDataResponse.message || 'Failed to save delivery address' };
        }
        const cartClearResponse = await fetch(`http://34.131.10.8:3000/api/cart/remove/${formData.cartId}`, {
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
  