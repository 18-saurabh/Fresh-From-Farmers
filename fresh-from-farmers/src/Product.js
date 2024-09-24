import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  // State to manage button click effect
  const [clicked, setClicked] = React.useState(false);

  const addToBasket = () => {
    // Dispatch action to add item to the basket
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    // Set clicked state to true for yellow button
    setClicked(true);

    // Reset button state back to normal after 300ms
    setTimeout(() => {
      setClicked(false);
    }, 300); // Delay to change back to original color
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />

      {/* Add `clicked` state to the button class */}
      <button
        className={`product_button ${clicked ? "yellow" : ""}`}
        onClick={addToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
