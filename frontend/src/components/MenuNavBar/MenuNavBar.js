import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../constants/images";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

import "./MenuNavBar.css";
import { CartState } from "../../context/cartItem_context";

const MenuNavBar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const amount = 9;
  const location = useLocation();
  const history = useNavigate();

  const redirect = () => {
    console.log("inside");
    history("/cart");
  };

  return (
    // <nav className="admin__navbar">
    //   <div className="admin__navbar-logo">
    //     <img src={images.gericht} alt="admin__logo" />
    //   </div>
    //   <ul className="admin__navbar-links">
    //     <li className="p__opensans">
    //       <NavLink exact to="/calendar">
    //         Calendar
    //       </NavLink>
    //     </li>
    //     <li className="p__opensans">
    //       <NavLink exact to="/product">
    //         Products
    //       </NavLink>
    //     </li>
    //     {/* <li className="p__opensans">
    //       <a href="#menu">Menu</a>
    //     </li> */}
    //     {/* <li className="p__opensans"><a href="#awards">Awards</a></li> */}
    //     <li className="p__opensans">
    //       <a
    //         href="#contact"
    //         onClick={() => {
    //           history("/menu");
    //         }}
    //       >
    //         Orders
    //       </a>
    //     </li>
    //   </ul>

    //   <div className="admin__navbar-smallscreen">
    //     <GiHamburgerMenu
    //       color="#fff"
    //       fontSize={27}
    //       onClick={() => setToggleMenu(true)}
    //     />
    //     {toggleMenu && (
    //       <div className="admin__navbar-smallscreen_overlay flex__center slide-bottom">
    //         <MdOutlineRestaurantMenu
    //           fontSize={27}
    //           className="overlay__close"
    //           onClick={() => setToggleMenu(false)}
    //         />
    //         <ul className="admin__navbar-smallscreen_links">
    //           <li>
    //             <a href="#home" onClick={() => setToggleMenu(false)}>
    //               Home
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#about" onClick={() => setToggleMenu(false)}>
    //               About
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#menu" onClick={() => setToggleMenu(false)}>
    //               Menu
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#awards" onClick={() => setToggleMenu(false)}>
    //               Awards
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#contact" onClick={() => setToggleMenu(false)}>
    //               Contact
    //             </a>
    //           </li>
    //           <ShoppingCartOutlinedIcon
    //             sx={{
    //               border: "1px white",
    //               color: "white",
    //               margin: "0 0 0 1rem",
    //               align: "center",
    //             }}
    //           />
    //           <div className="amount-container">
    //             <p className="total-amount">{amount}</p>
    //           </div>
    //         </ul>
    //       </div>
    //     )}
    //   </div>
    // </nav>

    <>
      <input type="checkbox" id="nav-toggle" />
      <nav className="sidebar">
        {/* Logo container */}
        <div className="sidebar-brand">
          <h2>{/* <span className="lab la-stiami">Stiami</span> */}</h2>
        </div>

        {/* Sidebar Menu Items  */}
        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="" className="active">
                {/* <span className="las la-igloo"></span> */}
                <span className="lab la-stiami"></span>
                {/* <DashboardCustomizeOutlinedIcon /> */}

                <span>Starters</span>
              </a>
            </li>

            <li>
              <a href="">
                {/* <span className="las la-users"></span> */}
                {/* <PeopleAltOutlinedIcon /> */}
                <span>Main Course</span>
              </a>
            </li>

            <li>
              <a href="">
                {/* <span className="las la-clipboard-list"></span> */}
                {/* <CalendarMonthOutlinedIcon /> */}
                <span>Dessert</span>
              </a>
            </li>

            <li>
              <a href="">
                {/* <span className="las la-receipt"></span> */}
                {/* <InventoryOutlinedIcon /> */}
                <span>Wine</span>
              </a>
            </li>

            <li>
              <a href="">
                {/* <span className="las la-shipping-bag"></span> */}
                {/* <AssignmentReturnedOutlinedIcon /> */}
                <span>Beer</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MenuNavBar;
