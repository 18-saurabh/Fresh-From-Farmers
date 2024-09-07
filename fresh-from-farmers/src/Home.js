import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/manishbanjare/Prime_Vedio_banner_1242x450.png"
          alt="framFreshBanner"
        ></img>
        <div className="home_row">
          <Product
            id="12024"
            title="Onion ₹20/kg"
            price={20}
            image={
              "https://m.media-amazon.com/images/I/51DJ-9xkuQL._AC_UF1000,1000_QL80_.jpg"
            }
            rating={5}
          ></Product>
          <Product
            id="22024"
            title="Potato ₹30/Kg"
            price={30}
            image={"https://m.media-amazon.com/images/I/313dtY-LOEL.jpg"}
            rating={3}
          ></Product>
        </div>
        <div className="home_row">
          <Product
            id="32024"
            title="Tomato ₹30/kg"
            price={30}
            image={
              "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQWKEIys2Gmiyd9agP5sVK8ouyT8NlC5_uY94W4RUNSJp-EZqADZFFd8HoB59Q2MbDC"
            }
            rating={5}
          ></Product>
          <Product
            id="42024"
            title="Spinach ₹40/Kg"
            price={40}
            image={
              "https://images.moneycontrol.com/static-mcnews/2023/07/Health-benefits-of-spinach.jpg?impolicy=website&width=1600&height=900"
            }
            rating={3}
          ></Product>
          <Product
            id="52024"
            title="Ginger ₹60/kg"
            price={60}
            image={
              "https://www.allrecipes.com/thmb/1Ke9oFYyqp2CvSVlaOV-nsPIKQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-what-is-ginger-20ed1f436bee4c4085b009756c8bc4db.jpg"
            }
            rating={5}
          ></Product>
        </div>
        <div className="home_row">
          <Product
            id="62024"
            title="Garlic ₹120/kg"
            price={120}
            image={
              "https://static.toiimg.com/thumb/msid-105445525,width-1280,height-720,resizemode-4/105445525.jpg"
            }
            rating={5}
          ></Product>
        </div>
      </div>
    </div>
  );
}

export default Home;
