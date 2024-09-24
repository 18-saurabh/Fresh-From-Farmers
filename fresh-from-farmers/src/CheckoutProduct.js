import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, price, rating, quantity,hideButton,totalPrice }) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
      // remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt={title} />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <strong>₹{price}</strong>
          {quantity > 1 && (
            <span>
              {" "}
              ({quantity} items, ₹{price / quantity} each)
            </span>
          )}
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
