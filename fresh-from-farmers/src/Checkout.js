import React from "react";
import "./Checkout.css";
function checkout() {
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://www.shutterstock.com/image-photo/groceries-shopping-flat-lay-fruits-260nw-2125529039.jpg"
          alt="ad.."
        ></img>
        <div>
          <h2 className="checkout_title">Your shopping basket</h2>
        </div>
      </div>
      <div className="checkout_right">
        <h2>The subtotal </h2>
      </div>
    </div>
  );
}

export default checkout;
