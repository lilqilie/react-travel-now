import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import "./i18n/configs";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import rootStore from "./redux/store";

axios.defaults.headers["x-icode"] = "2231FC4C9DC620FB";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
