import React from "react";
import "./Header.css";

export default function Header (props){
  const {
    onBack,
    title
  } = props;
  return (
    <div className="header">
      <div 
        onClick={onBack}
        className="header-back">
        <svg width="42" height="42">
          <polyline 
            points="25,13 16,21 25,29"
            stroke="#fff"
            strokeWidth="2"
            fill="none"/>
        </svg>

      </div>
      <div className="header-title">
        {title}
      </div>
    </div>
  )
}