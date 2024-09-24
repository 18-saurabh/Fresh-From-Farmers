import React from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import { sendPaymentDetails } from "./services/api";
import axios from "axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Function to group basket items and calculate total
  const groupBasketItems = (basket) => {
    return basket.reduce((acc, item) => {
      const foundItem = acc.find((x) => x.id === item.id);
      if (foundItem) {
        foundItem.quantity += 1;
        foundItem.totalPrice += item.price;
      } else {
        acc.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      return acc;
    }, []);
  };

  const groupedBasket = groupBasketItems(basket);

  const calculateTotal = () => {
    return basket.reduce((amount, item) => item.price + amount, 0);
  };

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      handlePayment();
    };
    script.onerror = () => {
      alert("Failed to load Razorpay SDK");
    };
    document.body.appendChild(script);
  };

  const emptyBasket = () => {
    dispatch({
      type: "REMOVE_ALL_FROM_BASKET", // This will clear the basket
    });
  };

  const handlePayment = async () => {
    const orderData = {
      amount: calculateTotal() * 100, // Total in paise
      email: user?.email || "your.email@example.com",
      items: groupedBasket,
    };

    try {
      const orderResponse = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        orderData
      );

      if (!orderResponse.data.id) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data.id;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Ensure this is set correctly
        amount: orderData.amount,
        currency: "INR",
        name: "Fresh From Farmers",
        description: "Test Transaction",
        image: Logo,
        order_id: orderId,
        handler: async function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );

          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: orderId,
            amount: orderData.amount / 100, // Convert to rupees
            signature: response.razorpay_signature,
            user: {
              name: user?.name || "Your Name",
              email: user?.email || "your.email@example.com",
              contact: "9999999999",
            },
            items: groupedBasket.map((item) => ({
              id: item.id,
              title: item.title,
              price: item.totalPrice,
              quantity: item.quantity,
            })),
          };

          try {
            await sendPaymentDetails(paymentDetails);
            emptyBasket(); // Empty the basket after successful payment
            navigate("/orders"); // Redirect to orders page
          } catch (error) {
            alert(
              "Error sending payment details to the server: " + error.message
            );
          }
        },
        prefill: {
          name: user?.name || "Your Name",
          email: user?.email || "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Error creating order: " + error.message);
    }
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>Your Address Line 1</p>
            <p>Your Address Line 2</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
            {groupedBasket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.totalPrice}
                rating={item.rating}
                quantity={item.quantity}
                hideButton
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <button className="pay-now-button" onClick={loadRazorpay}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
