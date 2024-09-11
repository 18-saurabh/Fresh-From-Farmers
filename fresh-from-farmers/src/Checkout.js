import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  // Utility function to group products by id and count their occurrences
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

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://www.shutterstock.com/shutterstock/photos/2080913824/display_1500/stock-vector-bamboo-new-year-sales-banner-x-2080913824.jpg"
          alt="ad.."
        />
        <div>
          <h2 className="checkout_title">Your shopping basket</h2>
          {groupedBasket?.length === 0 ? (
            <div>
              <h2>Your Shopping Basket is empty</h2>
            </div>
          ) : (
            groupedBasket.map((item) => (
              <CheckoutProduct
                key={item.id} // Add a key prop here
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.totalPrice} // Display total price for that product
                rating={item.rating}
                quantity={item.quantity} // Pass quantity
              />
            ))
          )}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
