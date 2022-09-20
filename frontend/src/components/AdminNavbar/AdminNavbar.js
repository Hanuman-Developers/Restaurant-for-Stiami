import React from "react";
import "./AdminNavbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "../VerticalNav/VerticalNav.css";
function AdminNavbar({ heading }) {
  return (
    <div className="header__all_size ">
      <div className="header ">
        <div className="header-container glassmorphism ">
          {/* <div className="dashboard-wrapper"> */}
          {/* <span class="las la-bars"></span> */}
          {/* <label for="nav-toggle">
              <MenuOutlinedIcon
                sx={{
                  marginTop: "0.2rem",
                  // paddingLeft: "0.5rem",
                  color: "white",
                  marginRight: "1rem",
                }}
              />
            </label> */}

          <h2>{heading}</h2>
        </div>
        {/* </div> */}

        {/* <div className="search-wrapper">
          {/* <span className="las la-search"></span> 
          <SearchIcon />
          <input type="search" placeholder="Search Here"></input>
        </div> */}

        {/* <div class="user-wrapper">
          {/* <img src="" width="30px" height="30px" alt=""></img> 
          <AccountCircleOutlinedIcon />
          <div>
            <h4>John Doe</h4>
            <small>Super Admin</small>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminNavbar;
