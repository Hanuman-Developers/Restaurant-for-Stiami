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
import { AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";
// import Button from "@mui/material/Button";

const FoodItem = ({
  _id,
  name,
  title,
  price,
  category,
  tags,
  amount,
  description,
}) => {
  const [add, setAdd] = useState(true);
  const { increase, decrease, toggleAmount } = CartState();

  const navigate = useNavigate();

  const prod = {
    name: name,
    description: description,
    price: price,
    tags: tags,
    category: category,
  };
  console.log(prod);
  //const { remove, increase, decrease, toggleAmount } = useGlobalContext();
  const { cart, dispatch } = CartState();

  let stock = 5;

  console.log(amount);

  const EditProduct = () => {
    //navigate(`/edit/${title}`, { repalce: true, state: { prod } });
  };

  return (
    <div className="food-card" style={{ animation: `0.17s` }}>
      <div className="food-container_one">
        <div className="food-card-id">
          <h2>{name}</h2>
        </div>
        <div className="food-card-price">
          <p>${price}</p>
        </div>
      </div>
      {/* <h2 className="food-card-name">{} </h2> */}

      <div className="food-container_two">
        <div class="food-card-category">{/* <p>{category}</p> */}</div>
        <div className="food_cart_container">
          {/* <Button
            variant="contained"
            style={{
              maxWidth: "100px",
              maxHeight: "60px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            sx={{
              size: "small",
              fontSize: "0.6rem",
              padding: "0rem 0.5rem 0rem 0.5rem",
              backgroundColor: "green",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate(`/edit/${_id}`, { repalce: true, state: { prod } });
            }}
          >
            Edit
          </Button>{" "} */}
          <div
            onClick={() => {
              navigate(`/edit/${_id}`, { repalce: true, state: { prod } });
            }}
          >
            <IconContext.Provider value={{ color: "#dcca87", size: "25px" }}>
              <AiFillEdit />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ color: "dcca87", size: "25px" }}>
              <MdDeleteForever />
            </IconContext.Provider>
          </div>
          {/* <Button
            variant="contained"
            style={{
              maxWidth: "100px",
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            sx={{
              size: "small",
              fontSize: "0.6rem",
              padding: "0rem 0.5rem 0rem 0.5rem",
              backgroundColor: "red",
              borderRadius: "20px",
            }}
          >
            Delete
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
