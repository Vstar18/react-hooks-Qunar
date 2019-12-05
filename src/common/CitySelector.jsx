import React,{ useState, useEffect, useMemo , memo, useCallback} from "react";
import classNames from "classnames";
import "./CitySelector.css";

const CityItem = memo((props)=> {
  const {
    name,
    onSelect
  } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      { name }
    </li>
  )
});

const CitySections = memo((props) =>{
  const {
    title,
    cities,
    onSelect
  } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key={title} data-cate={title}>{ title }</li>
      {
        cities.map( city => {
          return (
            <CityItem name={city.name} key={city.name} onSelect={onSelect} />
          )
        })
      }
    </ul>
  )
});
 
const  CityList = memo((props)=> {
  const {
    sections,
    toAplha,
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
      <div className="city-index">
        {
          Alphabet.map((alpha) => {
            return <AlphaIndex key={alpha} alpha={alpha} onClick={toAplha}>

            </AlphaIndex>
          })
        }
      </div>
    </div>
  )
})

const AlphaIndex = memo(function AlphaIndex (props) {
  const {
    alpha,
    onClick
  } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  )
});
const SuggestItem = memo(function SuggestItem(props) {
  const {
    name,
    onClick
  } = props;
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>{name}</li>
  )
});

const Suggest = memo( function Suggest (props) {
  const {
    searchKey,
    onSelect
  } = props;
  const [result,setResult] = useState([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1/rest/search?key=' + encodeURIComponent(searchKey))
    .then(res => res.json())
    .then(data => {
      const { 
        result,
        searchKey:sKey
      } = data;
      if(sKey === searchKey) {
        setResult(result);
      }
    })
    .catch(error =>{})
  },[searchKey]);
  const fallBackResult = useMemo(() =>{
    if(!result.length) {
      return [{
        display:searchKey
      }]
    }
    return result;
  },[result,searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map((item,index) =>{
            return (
              <SuggestItem key={index} name={item.display} onClick={onSelect}/>
            )
          })
        }
      </ul>
    </div>
  )
})


const Alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index)
});



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
  const toAplha = useCallback(alpha =>{
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  })
  const outputCitySections = () => {

    if(isLoading) {

      return <div>loading</div>
    }
    if(cityData) {
      return <CityList 
        sections={cityData.cityList} 
        toAplha={toAplha}
        onSelect={onSelect}/>
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
      {
         Boolean(key) && (
           <Suggest
            searchKey={key}
            onSelect={key => onSelect(key)}
            />
         )
      }
      { outputCitySections() }

    </div>
  )
}