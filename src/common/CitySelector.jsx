import React,{ useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import "./CitySelector.css";

export default function CitySelector (props) {
  const {
    show,
    isLoading,
    cityData,
    onBack,
    fetchCityData
  } = props;
  const [searchKey, setSerachKey] = useState('');
  const key = useMemo(() => searchKey.trim(),[searchKey]);
  console.log(show,cityData, isLoading,'====🍎')
  useEffect(() => {
    if(!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
    
  }, [show,cityData, isLoading]);
  return (  
    <div className={['city-selector', (!show) && 'hidden'].filter(Boolean).join(' ')}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
              <polyline
                  points="25,13 16,21 25,29"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
              />
              
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input 
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={ e => setSerachKey(e.target.value) }
            type="text"/>
        </div>
        <i 
          onClick={ () => setSerachKey('') }
          className={
            classNames('search-clean',{ hidden : key.length == 0})
          }>
          &#xf063;
        </i>
      </div>
    </div>
  )
}