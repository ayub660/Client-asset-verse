import React from "react";
import logo from "../../assets/feature1.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={logo}
        alt="AssetVerse"
        className="
          h-9 w-9           
          md:h-11 md:w-11   
          object-cover     
          rounded-xl      
          shadow-sm         
          border border-base-300 
        "
      />
    </div>
  );
};

export default Logo;