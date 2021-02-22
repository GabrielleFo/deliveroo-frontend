import React from "react";
import Logo from "../assets/deliveroo.svg";

const Header = () => {
  return (
    <header className="Header">
      <div className="topBar">
        <div className="topBar--center">
          <img src={Logo} alt="deliveroo" className="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
