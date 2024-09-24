import axios from "axios";
const sendPaymentDetails = async (paymentDetails) => {
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
  } catch (error) {
    // Handle error response
    console.error(
      "Error sending payment details:",
      error.response?.data?.message || error.message
    );
  }
};
