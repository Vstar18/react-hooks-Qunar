import React,{ useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import "./CitySelector.css";

function CityItem (props) {
  const {
    name,
    onSelect
  } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      { name }
    </li>
  )
}

const CitySections = (props) =>{
  const {
    title,
    cities,
    onSelect
  } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key={title}>{ title }</li>
      {
        cities.map( city => {
          return (
            <CityItem name={city.name} key={city.name} onSelect={onSelect} />
          )
        })
      }
    </ul>
  )
}
 
const  CityList = (props)=> {
  const {
    sections,
    onSelect
  } = props;

  return (
    <div className="city-list">
      <div className="city-cate"> 
       {
         sections.map( (section,index) => {
          return (
  
            <CitySections 
              title={ section.title} 
              key={index} 
              cities={ section.citys || []}
              onSelect={onSelect}
              />
          )
         })
       }
      </div>
    </div>
  )
}

export default function CitySelector (props) {
  const {
    show,
    isLoading,
    cityData,
    onBack,
    fetchCityData,
    onSelect
  } = props;
  const [searchKey, setSerachKey] = useState('');
  const key = useMemo(() => searchKey.trim(),[searchKey]);
  
  const outputCitySections = () => {

    if(isLoading) {

      return <div>loading</div>
    }
    if(cityData) {
      return <CityList sections={cityData.cityList} onSelect={onSelect}/>
    }
    return <div>error</div>
  }
  useEffect(() => {
    if(!show || cityData || isLoading) {
      return;
    }
    fetchCityData();

  }, [cityData,isLoading,show]);
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
            classNames('search-clean',{ hidden : key.length === 0})
          }>
          &#xf063;
        </i>
      </div>
      { outputCitySections() }
    </div>
  )
}