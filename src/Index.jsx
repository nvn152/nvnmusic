import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./global.css";
import "./index.css";
import App from "./App";

function Index() {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      const isTabletOrLarger = window.matchMedia("(min-width: 1800px)").matches;
      setIsTabletOrLarger(isTabletOrLarger);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => {
      window.removeEventListener("resize", checkDeviceSize);
    };
  }, []);

  if (!isTabletOrLarger) {
    return (
      <div className="h-screen flex  justify-center items-center bg-gradient-to-br from-white/10 to-black backdrop-blur-lg">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">
            Mobile and Tablet View under maintenance
          </p>
          <p>Please use a larger device to access this application.</p>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <div className="scaled-container ">
        <App />
      </div>
    </Provider>
  );
}

export default Index;
