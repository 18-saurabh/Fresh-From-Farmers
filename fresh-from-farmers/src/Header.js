import React from "react";
import "./Header.css";
import SearchSharp from "@mui/icons-material/SearchSharp";
import ShoppingBasketTwoTone from "@mui/icons-material/ShoppingBasketTwoTone";
import {Link} from "react-router-dom";
import Logo from "./Logo.png";
import { useStateValue } from "./StateProvider";
function Header() {
  const[{basket},dispatch]=useStateValue();
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
        <Link to={"./login"}>
          <div className="header_option">
            <span className="header_optionLineOne">Hello</span>
            <span className="header_optionLineTwo">
              Sign In
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
