import React, { useState, useEffect } from "react";
import "./OrderSuccess.css";
import axios from "../../../apis/axios";
import { CartState } from "../../../context/cartItem_context";
import { socket } from "../../../App";
function OrderSuccess() {
  const [test, setTest] = useState("");
  const { auth } = CartState();
  const url = "/orders";

  useEffect(async () => {
    console.log(auth);
    const prod = {
      email: "roysayantan.blr99@gmail.com",
    };
    const response = await axios.post(url, prod, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(response);
    setTest(response.data[0].status);

    socket.on("Check", async () => {
      console.log("Inside check");
      const prod = {
        email: "roysayantan.blr99@gmail.com",
      };

      const response = await axios.post(url, prod, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response);
      setTest(response.data[0].status);
    });
  }, []);

  return (
    <div className="container">
      <div className="holder">
        <h1>Payment {test}</h1>
      </div>
    </div>
  );
}

export default OrderSuccess;
