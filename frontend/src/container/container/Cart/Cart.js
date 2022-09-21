import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import { CartState } from "../../context/cartItem_context";
import Navbar from "../../components/Navbar/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Cart.css";
const Cart = () => {
  const { cart, total, clearCart, amount } = CartState();
  console.log(amount);

  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <hr />
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <>
      <Navbar />
      <section className="cart">
        {/* cart header */}

        {/* cart items */}
        <div className="cart__container">
          <header>
            <h2>Cart</h2>
          </header>
          {cart.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}

          {/* cart footer */}
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total <span>${total}</span>
              </h4>
            </div>
            <button className="btn clear-btn" onClick={clearCart}>
              clear cart
            </button>
          </footer>
        </div>

        <div className="checkout">
          <p>Order Summary</p>
          <hr />

          <div className="before__coupon">
            <p>Cart ({amount}) items</p>
            <p>{total}</p>
          </div>

          <div className="coupon">
            <TextField
              id="outlined-basic"
              label="Coupon"
              variant="outlined"
              sx={{
                background: "white",
                borderRadius: "7px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: "grey",
                height: "60px",
                width: "200px",
              }}
            >
              Apply Coupon
            </Button>
          </div>
          <hr />

          <div className="before__coupon">
            <p>SubTotal </p>
            <p>${total}</p>
          </div>
          <div className="button_checkout">
            <Button
              variant="contained"
              sx={{
                background: "grey",
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;