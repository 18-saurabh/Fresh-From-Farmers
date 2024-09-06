import React from "react";
import "./Header.css";
import SearchSharp from "@mui/icons-material/SearchSharp";
import ShoppingBasketTwoTone from "@mui/icons-material/ShoppingBasketTwoTone";
function Header() {
  return (
    <div className="header">
      <img
        className="header_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="AmazonLogo"
      />
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchSharp className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineOne">Hello</span>
          <span className="header_optionLineTwo">Sign In</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <div className="header_optionBasket">
          <ShoppingBasketTwoTone></ShoppingBasketTwoTone>
          <span className="header_optionLineTwo header_basketCount">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
