import React, { useState, useContext, useReducer, useEffect } from "react";
import { data } from "../constants";
import { cartReducer } from "./reducer";
//import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    // loading: false,
    cart: data.wines,
    total: 0,
    amount: 0,
  });

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
    console.log(state);
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    //const response = await fetch(url)
    const cart = data.wines;
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };
  const toggleAmount = (id, type) => {
    console.log("Increase");
    console.log(id);

    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
    console.log(state.total);
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const CartState = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
