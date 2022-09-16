import "./AdminOrderDashboard.css";
import { socket } from "../../App";
import React, { useState, useEffect } from "react";
import { CartState } from "../../context/cartItem_context";
import OrderItem from "../../components/OrderItem/OrderItem";
import axios from "../../apis/axios";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
function AdminOrderDashboard() {
  const [orders, setOrders] = useState("");
  const { auth } = CartState();
  const url = "/orders";
  useEffect(async () => {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response);
    setOrders(response.data);
  }, []);

  const changedata = (e) => {};

  return (
    <>
      {/* <form className="gForm">
        <label className="drop">
          Category
          <select
            className="dropdown"
            name="status"
            value={orders}
            onChange={changedata}
            required
          >
            <option className="selected">Order Status </option>
            <option value="Accepted">Accepted</option>
            <option value="Shipped">Shipped</option>
          </select>
        </label>
      </form> */}

      <VerticalNav />
      <AdminNavbar />
      {/* <div className="order-card" style={{ animation: `0.17s` }}>
        <h2 className="order-card-id">Name </h2>
        <img class="order-card-image" src={""} alt={""}></img>
        <h2 className="order-card-name">{} </h2>
        <p className="order-card-price">$Amount</p>
        <div className="cart_container">
          {/* <button onClick={EditProduct}>Edit</button> 
        </div>ord
      </div> */}
      <div className="board order_admin">
        {orders.length > 0 &&
          orders.map((wine) => (
            <OrderItem
              key={wine.user}
              {...wine}
              // id={wine.id}
              // title={wine.title}
              // price={wine.price}
              // tags={wine.tags}
              // amount={wine.amount}
            />
          ))}
      </div>
    </>
  );
}

export default AdminOrderDashboard;
