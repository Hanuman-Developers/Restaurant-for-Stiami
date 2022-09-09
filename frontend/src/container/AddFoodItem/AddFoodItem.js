import React, { useState, useReducer } from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./AddFoodItem.scss";
import axios from "../../apis/axios";
const initialState = {
  name: "",
  category: "",
  price: 0,
  description: "",
};

function reducer(state, action) {
  // if (action.input == "name") {
  //   return { ...state, name: action.value };
  // }

  return { ...state, [action.input]: action.value };
}

function AddFoodItem() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ADD_URL = "products/create";

  function onChange(e) {
    const action = {
      input: e.target.name,
      value: e.target.value,
    };

    dispatch(action);
  }

  async function onSubmit(e) {
    e.preventDefault();

    console.log(state);

    const response = await axios.post(ADD_URL, state, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(response);
  }

  return (
    <>
      <div className="add__container ">
        <VerticalNav></VerticalNav>

        <div className="form__container">
          <h1>Create Product</h1>
          <form onSubmit={onSubmit} className="gForm">
            <label>
              Food Item name
              <input name="name" type="name" required onChange={onChange} />
            </label>

            <label>
              Price
              <input name="price" type="price" onChange={onChange} required />
            </label>

            <label className="drop">
              Category
              <select
                className="dropdown"
                name="category"
                onChange={onChange}
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
                onChange={onChange}
                required
              />
            </label>

            <button>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddFoodItem;
