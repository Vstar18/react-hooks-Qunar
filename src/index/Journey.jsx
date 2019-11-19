import React from "react";
import "./Journey.css";
import switchImg from "./imgs/switch.svg"
export default function Journey (props) {
  const { 
    from , 
    to ,
    exchangeFromTo,
    showCitySelector
  } = props;
  return (
    <div className="journey">
      <div 
        onClick={()=> showCitySelector(true)}
        className="journey-station">
        <input 
          type="text"
          readOnly
          name="from"
          value={ from }
          className="journey-input journey-from"
          />
      </div>
      <div className="journey-switch">
        <img 
          src={ switchImg } 
          onClick={()=> exchangeFromTo()}
          alt="switch" 
          width="70" 
          height="40"/>
      </div>
      <div
        onClick={()=> showCitySelector(false)}
        className="journey-station">
        <input 
          type="text"
          readOnly
          name="to"
          value={ to }
          className="journey-input journey-to"
          />
      </div>
    </div>
  )
}