import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import "./App.css";


//组件引入
import Header from "../common/Header.jsx";
import Journey from "./Journey";
import HighSpeed from "./HighSpeed";
import DepartDate from "./DepartDate";
import Submit from "./Submit";

function App (props) {
  const { from , to } = props;
  const onBack = useCallback(() => {
    window.history.back();
  },[])
  return (
    <div className="app-container">
      <div className="header-wrapper">
        <Header title="火车票" onBack={ onBack } />
      </div>
      <Journey from ={ from } to ={ to }/>
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