import React from "react";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className="text-neutral-900 text-base gap-3 inline-flex items-center font-bold">
      <img src={logo} alt="neveleenin" />
      <span>Neveleenin</span>
    </div>
  );
};

export default Logo;
