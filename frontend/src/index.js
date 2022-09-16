import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { AppProvider } from "../src/context/cartItem_context";

ReactDOM.render(
  <BrowserRouter>
    {/* <VerticalNavProvider> */}
    <AppProvider>
      <App />
    </AppProvider>
    {/* </VerticalNavProvider> */}
  </BrowserRouter>,
  document.getElementById("root")
);
