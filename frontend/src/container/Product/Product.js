import Reac from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./Product.css";
import { CartState } from "../../context/cartItem_context";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Button from "@mui/material/Button";

function Product() {
  const { cart, total, clearCart } = CartState();
  const history = useNavigate();

  return (
    <>
      {/* <div className="main__container"> */}
      <VerticalNav></VerticalNav>
      <AdminNavbar heading="Inventory"></AdminNavbar>
      <div className="board">
        <div className="edit-grid-override">
          <div className="create_product">
            <p>Want to add a new Item? </p>
            <Button
              variant="contained"
              style={{
                maxWidth: "100px",
                maxHeight: "40px",
                minWidth: "50px",
                minHeight: "30px",
              }}
              sx={{
                size: "small",
                fontSize: "0.6rem",
                padding: "0rem 0.5rem 0rem 0.5rem",
                backgroundColor: "green",
                marginTop: "0.3rem",
              }}
              onClick={() => {
                history("/additem");
              }}
            >
              Add
            </Button>
          </div>

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
