import React from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./Product.css";
import { CartState } from "../../context/cartItem_context";
import FoodItem from "../../components/FoodItem/FoodItem";
function Product() {
  const { cart, total, clearCart } = CartState();

  return (
    <>
      <div className="main__container">
        <VerticalNav></VerticalNav>

        <div className="edit-grid-override">
          <h2>Products</h2>
          <button>Add item</button>
          {/* <div className="app__specialMenu_menu_items"> */}
          {cart.map((wine) => (
            <FoodItem
              key={wine.id}
              {...wine}
              // id={wine.id}
              // title={wine.title}
              // price={wine.price}
              // tags={wine.tags}
              // amount={wine.amount}
            />
          ))}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Product;
