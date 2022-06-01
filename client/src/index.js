import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};
ReactDOM.render(
  <BrowserRouter>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
