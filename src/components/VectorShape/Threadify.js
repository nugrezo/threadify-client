import React from "react";
import "./Threadify.css"; // Import your CSS file for styling

const Threadify = () => {
  return (
    <div className="threadify-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 40 200 200"
        className="vector-shape"
      >
        <path d="M50,400 Q75,50 100,100 T150,100 Q175,50 200,100 T250,100 Q275,50 300,100 T350,100 Q375,50 400,100 T450,100" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="threadify-text"
        >
          Connect
        </text>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="vector-shape"
      >
        <path d="M150,100 Q75,50 100,100 T150,100 Q175,50 200,100 T250,100 Q275,50 300,100 T450,100" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="threadify-text"
        >
          with
        </text>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -40 200 200"
        className="vector-shape"
      >
        <path d="M50,-100 Q75,50 100,100 T150,100 Q175,50 200,700 T450,100 Q275,50 300,100 T350,100" />
        <text
          x="40%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="threadify-text"
        >
          People
        </text>
      </svg>
    </div>
  );
};

export default Threadify;
