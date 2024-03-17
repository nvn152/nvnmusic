import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Analytics />
    </Provider>
  </React.StrictMode>
);
