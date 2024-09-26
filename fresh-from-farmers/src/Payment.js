import React from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.png";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Group basket items by ID
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

  // Calculate the total price of the basket items
  const calculateTotal = () => {
    return basket.reduce((amount, item) => item.price + amount, 0);
  };

  // Function to load the Razorpay SDK and trigger payment
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      const totalAmount = calculateTotal() * 100; // Razorpay works in paise

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Using the key from .env
        amount: totalAmount,
        currency: "INR",
        name: "Fresh From Farmers",
        description: "Test Transaction",
        image: Logo,
        handler: function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          dispatch({ type: "REMOVE_ALL_FROM_BASKET" });
          navigate("/orders", {
            state: { paymentId: response.razorpay_payment_id, basket },
          });
        },
        prefill: {
          name: user?.name || "Guest User",
          email: user?.email || "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = (error) => {
      console.error("Failed to load Razorpay SDK:", error);
      alert(
        "Failed to load Razorpay SDK. Please check your network connection."
      );
    };

    document.body.appendChild(script);
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address Section */}
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

        {/* Review Items Section */}
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

        {/* Payment Method Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {basket.length === 0 ? ( // Check if the basket is empty
              <p className="empty-basket-notification">
                Your basket is empty. Please add items to proceed with payment.
              </p>
            ) : (
              <button className="pay-now-button" onClick={loadRazorpay}>
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
