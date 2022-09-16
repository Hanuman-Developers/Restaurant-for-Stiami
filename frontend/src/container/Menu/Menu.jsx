import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import VerticalNav from "../../components/VerticalNav/VerticalNav";

import { SubHeading, MenuItem } from "../../components";
import { data, images } from "../../constants";
import "./SpecialMenu.css";
import { CartState } from "../../context/cartItem_context";
import { Navbar } from "../../components";

const Menu = () => {
  const { cart, total, clearCart } = CartState();
  console.log(cart);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <VerticalNav />
      <div className="board">
        {/* <nav className="navbar">
          <div className="nav-container">
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item ">
                <NavLink exact to="/menu">
                  Home
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink exact to="/menu">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  exact
                  to="/menu"
                  style={({ isActive }) => {
                    return { color: isActive ? "white" : "" };
                  }}
                >
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  style={({ isActive }) => {
                    return { color: isActive ? "white" : "" };
                  }}
                >
                  Link
                </NavLink>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </nav> */}
        <div className="salad-grid-override">
          {/* <div className="app__specialMenu_menu_items"> */}
          {cart.map((wine) => (
            <MenuItem
              key={wine.id}
              {...wine}
              id={wine._id}
              title={wine.title}
              price={wine.price}
              tags={wine.tags}
              amount={wine.amount}
            />
          ))}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Menu;

{
  /* <div className="app__specialMenu flex__center section__padding" id="menu">
        <div className="app__specialMenu-title">
          <SubHeading title="Menu that fits your palatte" />
          <h1 className="headtext__cormorant">Today&apos;s Special</h1>
        </div>

        <div className="app__specialMenu-menu">
          <div className="app__specialMenu-menu_wine  flex__center">
            <p className="app__specialMenu-menu_heading">Wine & Beer</p>
            <div className="app__specialMenu_menu_items">
              {cart.map((wine) => (
                <MenuItem
                  key={wine.id}
                  {...wine}
                  // id={wine.id}
                  // title={wine.title}
                  // price={wine.price}
                  // tags={wine.tags}
                  // amount={wine.amount}
                />
              ))}
            </div>
          </div>

          <div className="app__specialMenu-menu_img">
            <img src={images.menu} alt="menu__img" />
          </div>

          <div className="app__specialMenu-menu_cocktails  flex__center">
            <p className="app__specialMenu-menu_heading">Cocktails</p>
            <div className="app__specialMenu_menu_items">
              {data.cocktails.map((cocktail, index) => (
                <MenuItem
                  key={cocktail.title + index}
                  title={cocktail.title}
                  price={cocktail.price}
                  tags={cocktail.tags}
                  id={cocktail.id}
                  amount={cocktail.amount}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 15 }}>
          <button type="button" className="custom__button">
            View More
          </button>
        </div>
      </div> */
}
