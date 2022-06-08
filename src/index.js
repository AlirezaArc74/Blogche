import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerSerivce from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import swDev from "./swDev";

const root = ReactDOM.createRoot(document.getElementById("root"));

// globalThis.domain = 'http://localhost:4000'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerSerivce.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// swDev()
// console.log(serviceWorker.register())
