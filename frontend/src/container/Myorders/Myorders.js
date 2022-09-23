import React, { useEffect, useState } from "react";
import axios from "axios";
import MyOrderCard from "../../components/MyOrderComps/MyOrderCard";
import "./Myorders.scss";
import { CartState } from "../../context/cartItem_context";

const Myorders = () => {
  const { auth } = CartState();

  const [myorders, setMyorders] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const fetchMyOrders = async () => {
    const url = "http://localhost:5000/api/orders/myOrders";
    const params = {
      email: auth.email,
    };
    const res = await axios.get(url, { params });
    console.log(res.data);
    setMyorders(res.data);
    // setProductDetails(res.data)
  };

  useEffect(() => {
    console.log(auth);
    fetchMyOrders();
  }, [auth]);

  return (
    <div className="myorders">
      <div className="myorders__container">
        <h1 className="myorders__container__header">My Orders</h1>
        {myorders.map((orderItem, index) => (
          <div className="myorders__container__cards" key={index}>
            <MyOrderCard orderItem={orderItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
