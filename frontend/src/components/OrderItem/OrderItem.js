import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { CartState } from "../../context/cartItem_context";
import "./OrderItem.css";
import images from "../../constants/images";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate, Link } from "react-router-dom";
import { MdAddChart } from "react-icons/md";
import wines from "../../constants/data";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "../../apis/axios";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const OrderItem = ({ order, productDetails }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const getOrderURL = `/orders/${order._id}`;
  const updateOrderURL = `/orders/${order._id}/change`;

  useEffect(async () => {
    const prod = {
      _id: order._id,
    };
    try {
      const response = await axios.post(getOrderURL, prod, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      if (response.data.delivery_status == "Shipped") {
        setOrderStatus("Shipped");
        setDisabled(true);
      } else if (response.data.delivery_status == "Created") {
        setOrderStatus("Accepted");
      } else {
        setOrderStatus("Delivered");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeStatus = async (e) => {
    console.log(e.target.value);
    if (e.target.value == "Shipped") {
      const prod = {
        _id: order._id,
        status: "Shipped",
      };
      try {
        const response = await axios.post(updateOrderURL, prod, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setDisabled(true);
      setOrderStatus("Shipped");
    }
    if (e.target.value == "Delivered") {
      const prod = {
        _id: order._id,
        status: "Delivered",
      };
      try {
        const response = await axios.post(updateOrderURL, prod, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setDisabled(true);
      setOrderStatus("Delivered");
    }
  };
  const navigate = useNavigate();

  return (
    <div className="order-card" style={{ animation: `0.17s` }}>
      <div className="order-container_one">
        <div className="order-card-id">
          <h2>{order._id}</h2>
        </div>
        {/* <h2 className="order-card-name">{} </h2> */}
        <div className="food_cart_container">
          {/* <button onClick={EditProduct}>Edit</button> */}
          {/* <form className="orderForm">
            <label className="drop">
              Order Status
              <select
                className="dropdown-status"
                name="status"
                value={orderStatus}
                required
                onChange={changeStatus}
              >
                <option className="select-status">Order Status </option>
                {isDisabled ? (
                  <option disabled value="Accepted">
                    Accepted
                  </option>
                ) : (
                  <option value="Accepted">Accepted</option>
                )}
                <option value="Shipped">Shipped</option>
              </select>
            </label>
          </form> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatus}
              label="Order"
              onChange={changeStatus}
            >
              <MenuItem disabled value="Accepted">
                Accepted
              </MenuItem>

              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {/* <h2 className="order-card-name">{} </h2> */}
      <div className="order-container_two">
        <div class="order_items_container">
          {/* <div class="force"> */}
          {/* <ul>
            {orderItems.map((item) => {
              <p>{item._id}</p>;
            })}
            {/* <li></li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li> 
          </ul> */}

          <ul>
            {productDetails.map(({ prodName, prodPrice }) => (
              <div className="order-scrollbar-items">
                <div className="order-name-list">
                  <li>{prodName}</li>
                </div>
                <CloseOutlinedIcon
                  sx={{
                    size: "small",
                  }}
                />
                <p>{prodPrice}</p>
              </div>
            ))}
          </ul>
          {/* </div> */}
        </div>
        <div className="order-card-price">
          <p>${order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
