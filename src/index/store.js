import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from "./reducers.js";
import thunk from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  {
    from :'北京',
    to:'上海',
    isCitySelectorVisible:false,
    currentSelectingLeftCity:false,
    cityData:null,
    isLoadingCityData:false,
    isDateSelectorVisible:false,
    departDate:null,//出发日期
    highSpeed:false
  },
  applyMiddleware(thunk)
);