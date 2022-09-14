import React, { useEffect } from "react";

import {
  AboutUs,
  Chef,
  FindUs,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
} from "./container";
import { Navbar } from "./components";
import Cart from "./container/Cart/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import { CartState } from "./context/cartItem_context";
import Home from "./container/Home";
import Menu from "./container/Menu/Menu";
import Calendar from "./components/Calendar/Calendar";
import VerticalNavbar from "./components/VerticalNavbar/VerticalNavbar";
import AddFoodItem from "./container/AddFoodItem/AddFoodItem";
import Product from "./container/Product/Product";
import EditFoodItem from "./container/EditFoodItem/EditFoodItem";
import Login from "./container/Login/Login";
import RequireAuth from "./utils/requireAuth";
import Layout_ from "./container/Layout";
import Dashboard from "./container/Dashboard/Dashboard";
const App = () => {
  const { auth, setAuth } = CartState();

  useEffect(() => {
    // const getUser = () => {
    //   fetch("http://localhost:5000/api/auth/login/success", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.status === 200) return response.json();
    //       throw new Error("authentication has been failed!");
    //     })
    //     .then((resObject) => {
    //       console.log(resObject.user);
    //       if (resObject.user.email === undefined) {
    //         setAuth("");
    //       } else {
    //         setAuth(resObject.user.email);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    // getUser();
  }, []);

  return (
    <div>
      {/* <VerticalNavbar /> */}

      <Routes>
        <Route path="/" element={<Layout_ />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}></Route>
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/additem" element={<AddFoodItem />} />
        <Route path="/additem" element={<AddFoodItem />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/product" element={<Product />} />
        <Route path="/edit/:title" element={<EditFoodItem />} />
      </Routes>
    </div>
  );
};

export default App;
