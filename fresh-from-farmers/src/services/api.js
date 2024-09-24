// src/services/api.js

import axios from "axios";

// Function to send payment details to the backend
export const sendPaymentDetails = async (paymentDetails) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/payment/verify",
      paymentDetails,
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );

    // Handle successful response
    console.log("Payment details saved successfully!", response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    // Handle error response
    console.error(
      "Error sending payment details:",
      error.response?.data?.message || error.message
    );
    throw error; // Throw the error to handle it in the calling function
  }
};
