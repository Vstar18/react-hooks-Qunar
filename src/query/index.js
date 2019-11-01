import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "./index.css";

import store from "./store";
import App from "./App.jsx";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.querySelectorById('root'));