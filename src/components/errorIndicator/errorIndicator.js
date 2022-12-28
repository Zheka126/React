import React from "react";
import "./errorIndicator.css";
import icon from "./death-star.png";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error-icon" />
      <span className="boom">NOOOOOO!</span>
      <span>Something went wrong ;(</span>
      <span>We sent clones and droids to fix it</span>
      <span>Stay by... and support resistance!</span>
    </div>
  );
};

export default ErrorIndicator;
