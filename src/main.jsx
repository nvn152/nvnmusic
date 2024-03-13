import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import "./global.css";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="scaled-container ">
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
