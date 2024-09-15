import React from "react";
import "./Header.css";
import SearchSharp from "@mui/icons-material/SearchSharp";
import ShoppingBasketTwoTone from "@mui/icons-material/ShoppingBasketTwoTone";
import {Link,useNavigate} from "react-router-dom";
import Logo from "./Logo.png";
import { useStateValue } from "./StateProvider";
import {auth} from "./firebase";
function Header() {
  const[{basket,user},dispatch]=useStateValue();
   const navigate = useNavigate();
   const handleAuthentication = () => {
     if (user) {
       auth
         .signOut()
        //  .then(() => {
        //    navigate("/"); // Redirect to login page after sign out
        //  })
        //  .catch((error) => console.log(error));
     }
   };
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header_logo" src={Logo} alt="FreshFromFarmersLogo" />
      </Link>
      <div className="header_search">
        <input
          className="header_searchInput"
          type="text"
          placeholder="Seacrh FreshFromFarmers"
        />
        <SearchSharp className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "./login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <Link to={"/checkout"}>
          <div className="header_optionBasket">
            <ShoppingBasketTwoTone></ShoppingBasketTwoTone>
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
