import React from "react";
import "./Home.css";
import Product from "./Product";
import FFFBanner from "./FFFBanner.jpg";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={FFFBanner} alt="framFreshBanner"></img>
        <div className="home_row">
          <Product
            id="12024"
            title="Onion ₹20/kg"
            price={1}
            image={
              "https://png.pngtree.com/png-clipart/20231003/original/pngtree-three-fresh-red-onion-bulbs-in-stack-isolated-with-clipping-path-png-image_13246826.png"
            }
            rating={5}
          ></Product>
          <Product
            id="22024"
            title="Potato ₹30/Kg"
            price={30}
            image={"https://www.freeiconspng.com/uploads/potato-png-0.png"}
            rating={3}
          ></Product>
          <Product
            id="12024"
            title="Onion ₹20/kg"
            price={20}
            image={
              "https://png.pngtree.com/png-clipart/20221008/original/pngtree-red-onion-vector-image-png-image_8666150.png"
            }
            rating={5}
          ></Product>
        </div>
        <div className="home_row">
          <Product
            id="32024"
            title="Tomato ₹30/kg"
            price={30}
            image={
              "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-fruit-fresh-tomato-png-image_9959799.png"
            }
            rating={5}
          ></Product>
          <Product
            id="42024"
            title="Spinach ₹40/Kg"
            price={40}
            image={
              "https://png.pngtree.com/png-vector/20240804/ourmid/pngtree-organic-fresh-spinach-in-a-bowl-isolated-on-transparent-background-png-image_13135913.png"
            }
            rating={3}
          ></Product>
          <Product
            id="42024"
            title="Spinach ₹40/Kg"
            price={40}
            image={
              "https://png.pngtree.com/png-vector/20240804/ourmid/pngtree-organic-fresh-spinach-in-a-bowl-isolated-on-transparent-background-png-image_13135913.png"
            }
            rating={3}
          ></Product>
        </div>
        <div className="home_row">
          <Product
            id="62024"
            title="Garlic ₹120/kg"
            price={120}
            image={
              "https://static.vecteezy.com/system/resources/thumbnails/034/039/692/small/fresh-garlic-bulbs-in-stack-in-bamboo-wooden-basket-isolated-with-clipping-path-in-file-format-png.png"
            }
            rating={5}
          ></Product>
          <Product
            id="62024"
            title="Garlic ₹120/kg"
            price={120}
            image={
              "https://static.vecteezy.com/system/resources/thumbnails/034/039/692/small/fresh-garlic-bulbs-in-stack-in-bamboo-wooden-basket-isolated-with-clipping-path-in-file-format-png.png"
            }
            rating={5}
          ></Product>
          <Product
            id="62024"
            title="Garlic ₹120/kg"
            price={120}
            image={
              "https://static.vecteezy.com/system/resources/thumbnails/034/039/692/small/fresh-garlic-bulbs-in-stack-in-bamboo-wooden-basket-isolated-with-clipping-path-in-file-format-png.png"
            }
            rating={5}
          ></Product>
        </div>
      </div>
    </div>
  );
}

export default Home;
