import React from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  // Utility function to group products by id and calculate total price
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

  // Group basket items by id
  const groupedBasket = groupBasketItems(basket);

  // Calculate total amount to be paid
  const calculateTotal = () => {
    return basket.reduce((amount, item) => item.price + amount, 0);
  };

  // Load Razorpay SDK
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

  // Handle Razorpay payment
  const handlePayment = () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
      amount: calculateTotal() * 100, // Convert amount to paisa (₹1 = 100 paise)
      currency: "INR",
      name: "Fresh From Farmers",
      description: "Test Transaction",
      image: { Logo }, // Optional: add your logo
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        // You can call your backend API to verify the payment here
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
                price={item.totalPrice} // Display total price for grouped product
                rating={item.rating}
                quantity={item.quantity} // Show quantity if needed
                hideButton // Optionally hide remove button in Payment component
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* Button to trigger Razorpay payment */}
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
