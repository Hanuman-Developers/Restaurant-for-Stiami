import React from "react";
import { CartState } from "../../context/cartItem_context";
import { FaTimes } from "react-icons/fa";
import "./VerticalNav.css";
import { links } from "../../constants/adminVerticalNav";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = CartState();

  return (
    <>
      <div className="sidebar show-sidebar">
        <ul className="links">
          {links.map((link) => {
            const { id, url, text, icon } = link;
            return (
              <li key={id}>
                <a href={url}>
                  {icon}
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
        {/* <ul className='social-icons'>
          {social.map((link) => {
            const { id, url, icon } = link;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </>
  );
};

export default Sidebar;
