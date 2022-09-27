import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import CartItem from "../../components/CartItem/CartItem";
import AddressDrawer from "../../components/AddressDrawer/AddressDrawer";
import { SubHeading, MenuItem } from "../../components";
import { data, images } from "../../constants";
import "./SpecialMenu.css";
import { CartState } from "../../context/cartItem_context";
import { Navbar } from "../../components";
import MenuNavBar from "../../components/MenuNavBar/MenuNavBar.js";
import { Scrollbars } from "react-custom-scrollbars-2";

const Menu = () => {
  const { cart, total, amount, clearCart } = CartState();
  console.log(cart);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // const [starter, setStarter] = useState({});
  // const [mainCourse, setMainCourse] = useState({});
  const get_starters = cart.filter(function (item) {
    return item.category == "Starters";
  });

  const get_mainCourse = cart.filter(function (item) {
    return item.category == "Main Course";
  });
  const get_drinks = cart.filter(function (item) {
    return item.category == "Drinks";
  });

  return (
    <>
      {/* <MenuNavBar /> */}
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
      {/* <div className="board">
        <div className="salad-grid-override">
          {/* <div className="app__specialMenu_menu_items"> 
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
          {/* </div> 
        </div>
      </div> */}
      <div className="Menu__main__container">
        <div className="Menu__container__left">
          <div className="Menu__header">
            <h1>Stiami Menu</h1>
          </div>
          <div className="Menu__item__container">
            <div className="Menu_sub_container">
              <div className="bloc-menu-tabs ">
                <div className="bloc-menu-tabs-button">
                  <button
                    className={
                      toggleState === 4
                        ? "menu-tabs active-menu-tabs menu_font"
                        : "menu-tabs menu_font "
                    }
                    onClick={() => toggleTab(4)}
                  >
                    Drinks
                  </button>

                  <button
                    className={
                      toggleState === 1
                        ? "menu-tabs active-menu-tabs menu_font"
                        : "menu-tabs menu_font"
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Starter
                  </button>
                  <button
                    className={
                      toggleState === 2
                        ? "menu-tabs active-menu-tabs menu_font"
                        : "menu-tabs menu_font"
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Main Course
                  </button>
                  <button
                    className={
                      toggleState === 3
                        ? "menu-tabs active-menu-tabs menu_font"
                        : "menu-tabs menu_font"
                    }
                    onClick={() => toggleTab(3)}
                  >
                    Dessert
                  </button>
                </div>
                {/* <div className="bloc-menu-tabs-vr-line">
                <hr></hr>
              </div> */}
              </div>

              <div className="content-tabs">
                <div
                  className={
                    toggleState === 4 ? "content  active-content" : "content "
                  }
                >
                  {" "}
                  <Scrollbars
                    style={{
                      width: "100%",
                      height: "100vh",
                    }}
                  >
                    <div className="salad-grid-override">
                      {/* {/* <div className="app__specialMenu_menu_items">  */}

                      {get_drinks.map((wine) => (
                        <MenuItem
                          key={wine.id}
                          {...wine}
                          id={wine._id}
                          title={wine.title}
                          price={wine.price}
                          tags={wine.tags}
                          amount={wine.amount}
                          description={wine.description}
                        />
                      ))}
                      {/* {/* </div>  */}
                    </div>
                  </Scrollbars>
                </div>

                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content "
                  }
                >
                  {" "}
                  <Scrollbars
                    style={{
                      width: "100%",
                      height: "100vh",
                    }}
                  >
                    <div className="salad-grid-override">
                      {/* {/* <div className="app__specialMenu_menu_items">  */}

                      {get_starters.map((wine) => (
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
                      {/* {/* </div>  */}
                    </div>
                  </Scrollbars>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <Scrollbars
                    style={{
                      width: "100%",
                      height: "100vh",
                    }}
                  >
                    <div className="salad-grid-override">
                      {/* {/* <div className="app__specialMenu_menu_items">  */}

                      {get_mainCourse.map((wine) => (
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
                      {/* {/* </div>  */}
                    </div>
                  </Scrollbars>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <Scrollbars
                    style={{
                      width: "100%",
                      height: "100vh",
                    }}
                  >
                    <div className="salad-grid-override">
                      {/* {/* <div className="app__specialMenu_menu_items">  */}

                      {get_starters.map((wine) => (
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
                      {/* {/* </div>  */}
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Menu__container__right">
          <div className="Menu__cart__header">
            <h1> Cart</h1>
          </div>
          <div className="menu-cart-tabs">
            <div className="menu-cart-tabs-header">
              <h5>{amount} Items</h5>
            </div>
            {cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </div>
          <div className="cart-total-container">
            {/* <hr /> */}
            <div className="cart-total">
              <h4>
                total <span>${total}</span>
              </h4>
            </div>
            {/* <button className="btn clear-btn" onClick={clearCart}>
              Clear Cart
            </button> */}
          </div>
          <div className="button_checkout">
            <AddressDrawer />
          </div>
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
