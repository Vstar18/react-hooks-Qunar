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

import {
  showCitySelector,
  exchangeFromTo
} from "./actions.js";

function App (props) {
  const { 
    from, 
    to,
    showCitySelector,
    dispatch
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
  })
  return (
    <div className="app-container">
      <div className="header-wrapper">
        <Header title="火车票" onBack={ onBack } />
      </div>
      <Journey from ={ from } to ={ to } {...cbs} />
      <DepartDate/>
      <HighSpeed/>
      <Submit/>
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