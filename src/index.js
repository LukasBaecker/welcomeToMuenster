import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configurateStore.js";
import "./scss/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import windowSize from "./windowSize.js";
import { CookiesProvider } from "react-cookie";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
