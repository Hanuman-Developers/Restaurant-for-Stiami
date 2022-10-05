import "./AdminOrderDashboard.css";
import { socket } from "../../App";
import React, { useState, useEffect } from "react";
import { CartState } from "../../context/cartItem_context";
import OrderItem from "../../components/OrderItem/OrderItem";
import axios from "../../apis/axios";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import { Scrollbars } from "react-custom-scrollbars-2";
import accept from "../../assets/accept.png";
import delivery from "../../assets/delivery.png";
import shippe from "../../assets/shipped.png";
import { FaShippingFast } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { MdOutlineDoneAll, MdFastfood } from "react-icons/md";
import { IconContext } from "react-icons";
import { width } from "@mui/system";
function AdminOrderDashboard() {
  const { cart, total, clearCart } = CartState();

  const [orders, setOrders] = useState("");
  const [accepted, setAccepted] = useState({});
  const [shipped, setShipped] = useState("");
  const [delivered, setDelivered] = useState("");

  const { auth } = CartState();
  const url = "/orders/products";

  useEffect(async () => {
    // Loading Order data
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const get_accepted = response.data.filter(function (item) {
      console.log(item.order.delivery_status);
      return item.order.delivery_status === "Created";
    });
    console.log(get_accepted);

    setAccepted(get_accepted);

    const get_shipped = response.data.filter(function (item) {
      return item.order.delivery_status == "Shipped";
    });
    setShipped(get_shipped);

    const get_delivered = response.data.filter(function (item) {
      return item.order.delivery_status == "Delivered";
    });
    setDelivered(get_delivered);
    // setShipped(get_shipped);

    setOrders(response.data);
  }, []);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // const [starter, setStarter] = useState({});
  // const [mainCourse, setMainCourse] = useState({});

  const changedata = (e) => {};

  return (
    <>
      <VerticalNav />
      <AdminNavbar heading="Orders" />
      {/* <div className="order-card" style={{ animation: `0.17s` }}>
        <h2 className="order-card-id">Name </h2>
        <img class="order-card-image" src={""} alt={""}></img>
        <h2 className="order-card-name">{} </h2>
        <p className="order-card-price">$Amount</p>
        <div className="cart_container">
          {/* <button onClick={EditProduct}>Edit</button> 
        </div>ord
      </div> */}
      {/* <div className="board order_admin">
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
      </div> */}
      <div className="full_bg">
        <div className="board">
          {/* <div className="Inventory_header">
          <h2>Stiami Products</h2>
        </div> */}
          <div className="Food-container">
            <div className="container">
              <div className="bloc-tabs">
                <div className="tabs bloc-accepted">
                  {/* <img src={accept} width="50" height="50"></img> */}

                  <div>
                    <IconContext.Provider
                      value={{ color: "dcca87", size: "50px" }}
                    >
                      <GiChefToque />
                    </IconContext.Provider>
                  </div>

                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                  >
                    Accepted
                  </button>
                </div>
                <div className="tabs bloc-accepted">
                  {/* <img src={shippe}></img> */}
                  <div>
                    <IconContext.Provider
                      value={{ color: "dcca87", size: "50px" }}
                    >
                      <FaShippingFast />
                    </IconContext.Provider>
                  </div>

                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    Shipped
                  </button>
                </div>
                <div className="tabs bloc-accepted">
                  {/* <img src={delivery} width="50" height="50"></img> */}
                  <div>
                    <IconContext.Provider
                      value={{ color: "dcca87", size: "50px" }}
                    >
                      <MdFastfood />
                    </IconContext.Provider>
                  </div>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                  >
                    Delivered
                  </button>
                </div>
              </div>

              <div className="content-tabs">
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="product-grid-override">
                    <Scrollbars
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {accepted.length > 0 &&
                        accepted.map((wine) => (
                          <OrderItem
                            // key={wine.user}
                            {...wine}
                            // id={wine.id}
                            // title={wine.title}
                            // price={wine.price}
                            // tags={wine.tags}
                            // amount={wine.amount}
                          />
                        ))}
                    </Scrollbars>

                    {/* <h1>Heor</h1> */}
                  </div>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  {/* <h2>Content 2</h2> */}

                  <div className="product-grid-override">
                    <Scrollbars
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {shipped.length > 0 &&
                        shipped.map((wine) => (
                          <OrderItem
                            // key={wine.user}
                            {...wine}
                            // id={wine.id}
                            // title={wine.title}
                            // price={wine.price}
                            // tags={wine.tags}
                            // amount={wine.amount}
                          />
                        ))}
                    </Scrollbars>

                    {/* <h1>Heor</h1> */}
                  </div>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <div className="product-grid-override">
                    <Scrollbars
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {delivered.length > 0 &&
                        delivered.map((wine) => (
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
                    </Scrollbars>

                    {/* <h1>Heor</h1> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderDashboard;
