import React from "react";
import { CartState } from "../../context/cartItem_context";
import "./CartItem.css";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import images from "../../constants/images";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const CartItem = ({ _id, title, name, price, amount }) => {
  const { remove, increase, decrease, toggleAmount, cart } = CartState();
  console.log(cart);

  return amount > 0 ? (
    <article className="cart-item" style={{ animation: `0.17s` }}>
      {/* <img src={img} alt={title} /> */}
      <div className="title__button">
        <DeleteForeverOutlinedIcon
          sx={{
            color: "wheat",
          }}
          onClick={() => remove(_id)}
        />

        <h5>{name}</h5>

        {/* remove button 
        <Button
          sx={{
            color: "white",
            border: "1px solid white",
          }}
          variant="outlined"
          size="small"
          onClick={() => remove(id)}
          className="mat"
        >
          Remove
        </Button> */}
      </div>
      {/* <div className="button__wrap">
        {/* increase amount 
        {/* <button
          className="amount-btn"
          onClick={() => {
            toggleAmount(id, "inc");
            console.log(cart);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        {/* amount 

        <RemoveCircleOutlineOutlinedIcon
          sx={{
            color: "wheat",
          }}
          //onClick={decrease}
          onClick={() => toggleAmount(id, "dec")}
        />
        <p>{amount}</p>
        <AddCircleOutlineOutlinedIcon
          sx={{
            color: "wheat",
          }}
          onClick={() => toggleAmount(id, "inc")}
        />
      </div> */}
      <div className="cart_container_shop">
        <button className="salad-card-add-to-cart">
          <img
            class="salad-card-plus-icon"
            src={images.substract}
            onClick={() => toggleAmount(_id, "dec")}
          />
        </button>
        <div class="salad-card-amount">
          <h5>{amount}</h5>
        </div>
        <button
          className="salad-card-add-to-cart"
          onClick={() => toggleAmount(_id, "inc")}
        >
          <img class="salad-card-plus-icon" src={images.plus} />
        </button>
      </div>
      <div className="cart__price">
        <h4 className="item-price">${price}</h4>
      </div>
    </article>
  ) : (
    <div></div>
  );
};

export default CartItem;
