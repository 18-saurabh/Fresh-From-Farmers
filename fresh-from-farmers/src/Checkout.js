import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
function checkout() {
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://www.shutterstock.com/shutterstock/photos/2080913824/display_1500/stock-vector-bamboo-new-year-sales-banner-x-2080913824.jpg"
          alt="ad.."
        ></img>
        <div>
          <h2 className="checkout_title">Your shopping basket</h2>
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal></Subtotal>
      </div>
    </div>
  );
}

export default checkout;
