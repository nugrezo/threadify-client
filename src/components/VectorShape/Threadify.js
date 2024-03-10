import React from "react";
import "./Threadify.css"; // Import your CSS file for styling

const Threadify = () => {
  return (
    <div className="threadify-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="vector-shape"
      >
        <path d="M100,100 m0,-50 a50,50 0 1,1 0,100 a50,50 0 1,1 0,-100" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="threadify-text"
        >
          Threadify
        </text>
      </svg>
    </div>
  );
};

export default Threadify;
