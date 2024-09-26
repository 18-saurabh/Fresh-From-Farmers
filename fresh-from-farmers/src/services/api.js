import axios from "axios";

// Set up the Axios instance with default configurations
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Set the base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to send payment details to the backend
export const sendPaymentDetails = async (paymentDetails) => {
  try {
    const response = await apiClient.post("/payment/verify", paymentDetails);

    console.log("Payment details saved successfully!", response.data);
    return response.data;
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error(
        "Error sending payment details:",
        error.response.data.message || error.message
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received from the server:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error in setting up the request:", error.message);
    }

    // Optionally, you can also log the entire error for debugging purposes
    console.error("Complete error details:", error);

    throw error; // Re-throw the error for further handling if needed
  }
};
