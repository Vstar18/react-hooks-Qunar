import React, { useCallback, useMemo} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import "./App.css";

//组件引入
import Header from "../common/Header.jsx";
import Journey from "./Journey";
import HighSpeed from "./HighSpeed";
import DepartDate from "./DepartDate";
import Submit from "./Submit";
import CitySlector from "../common/CitySelector";

import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchCityData
} from "./actions.js";

function App (props) {
  const { 
    from, 
    to,
    // showCitySelector,
    dispatch,
    departDate,
    showDateSelector,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  },[]);

  const cbs = useMemo(()=> {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    )
  });
  const departDatecbs = useMemo(() => { 
    return bindActionCreators(
      {
        onClick:showDateSelector
      },
    dispatch
    )
  });
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack:hideCitySelector,
        fetchCityData
      },
      dispatch
    )
  })

  return (
    <div className="app-container">
      <div className="header-wrapper">
        <Header title="火车票" onBack={ onBack } />
      </div>
      <Journey from ={ from } to ={ to } { ...cbs } />
      <DepartDate time = { departDate } { ...departDatecbs }/>
      <HighSpeed/>
      <Submit/>
      <CitySlector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
        ></CitySlector>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);