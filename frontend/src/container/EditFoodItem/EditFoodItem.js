import React, { useState, useEffect } from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./EditFoodItem.scss";
import axios from "../../apis/axios";
import { useParams, useLocation } from "react-router-dom";

function EditFoodItem() {
  const params = useParams();
  const location = useLocation();
  const prod = location.state;
  console.log(location.state.prod.price);

  const UPDATE_URL = "products/update/:title";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(location.state.prod.title);
    setPrice(location.state.prod.price);
    setCategory("Starter");
    // setDescription(location.prod.description);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    const prod = {
      name: name,
      price: price,
      category: category,
      description: description,
      image: image,
    };

    try {
      const response = await axios.post(UPDATE_URL, prod, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="add__container ">
        <VerticalNav></VerticalNav>

        <div className="form__container">
          <h1>Update Product</h1>
          <form onSubmit={onSubmit} className="gForm">
            <label>
              Food Item name
              <input
                name="name"
                type="name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>

            <label>
              Price
              <input
                name="price"
                type="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </label>

            <label className="drop">
              Category
              <select
                className="dropdown"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
              >
                <option className="selected">Choose Category </option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Desert">Desert</option>
              </select>
            </label>

            <label>
              Description
              <input
                name="description"
                type="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </label>

            <button>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditFoodItem;
