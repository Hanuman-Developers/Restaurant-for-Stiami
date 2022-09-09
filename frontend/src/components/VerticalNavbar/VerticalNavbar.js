import "./VerticalNavbar.css";
import { React, useState } from "react";
import { NavLink } from "react-router-dom";

function VerticalNavbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
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
                to="/calendar"
                style={({ isActive }) => {
                  return { color: isActive ? "white" : "" };
                }}
              >
                Calendar
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
      </nav>
    </>
  );
}

export default VerticalNavbar;
