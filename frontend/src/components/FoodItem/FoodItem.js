import { React, useState } from "react";
import Button from "@mui/material/Button";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { CartState } from "../../context/cartItem_context";
import "./FoodItem.css";
import images from "../../constants/images";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate, Link } from "react-router-dom";
import { MdAddChart } from "react-icons/md";
import wines from "../../constants/data";

const FoodItem = ({ id, title, price, tags, amount }) => {
  const [add, setAdd] = useState(true);
  const { increase, decrease, toggleAmount } = CartState();

  const navigate = useNavigate();

  const prod = {
    id: id,
    title: title,
    price: price,
    tags: tags,
  };
  //const { remove, increase, decrease, toggleAmount } = useGlobalContext();
  const { cart, dispatch } = CartState();

  let stock = 5;

  console.log(amount);

  const EditProduct = () => {
    navigate(`/edit/${title}`, { repalce: true, state: { prod } });
  };

  if (id == 1) {
  }
  return (
    // <div className="app__menuitem">
    //   <div className="app__menuitem-head">
    //     <div className="app__menuitem-name">
    //       <p className="p__cormorant" style={{ color: "#DCCA87" }}>
    //         "hey there"
    //       </p>
    //     </div>
    //     <div className="app__menuitem-dash" />
    //     <div className="app__menuitem-price">
    //       <p className="p__cormorant">{price}</p>

    //       {/* <Button
    //         sx={{
    //           background: "white",
    //           width: "150px",
    //           color: "#DCCA87",
    //           border: "1px white",
    //           margin: "0rem 0 0 1rem",
    //         }}
    //         //onClick={() => toggleAmount(id, "inc")}
    //       >
    //         Add to Cart
    //       </Button>
    //       <div className="cart_container">
    //         <RemoveCircleOutlineOutlinedIcon
    //           sx={{
    //             color: "white",
    //           }}
    //           //onClick={decrease}
    //           onClick={() => toggleAmount(id, "dec")}
    //         />
    //         <p>{amount}</p>
    //         <AddCircleOutlineOutlinedIcon
    //           sx={{
    //             color: "white",
    //           }}
    //           onClick={() => toggleAmount(id, "inc")}
    //         />
    //         </div> */}
    //       <button
    //         className="amount-btn"
    //         onClick={() => {
    //           console.log("toggling", id);
    //           toggleAmount(id, "inc");
    //           console.log(cart);
    //         }}
    //       >
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    //           <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
    //         </svg>
    //       </button>
    //       <p className="amount">{amount}</p>
    //       <button
    //         className="amount-btn"
    //         onClick={() => toggleAmount(id, "dec")}
    //       >
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    //           <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    //         </svg>
    //       </button>
    //     </div>
    //   </div>

    //   <div className="app__menuitem-sub">
    //     <p className="p__opensans" style={{ color: "#AAAAAA" }}>
    //       {tags}
    //     </p>
    //   </div>
    // </div>
    <div className="food-card" style={{ animation: `0.17s` }}>
      <h2 className="food-card-id">{price} </h2>
      <img class="food-card-image" src={tags} alt={title}></img>
      <h2 className="food-card-name">{title} </h2>
      <p className="food-card-price">${price}</p>
      <div className="cart_container">
        <button onClick={EditProduct}>Edit</button>
      </div>
    </div>
  );
};

export default FoodItem;
