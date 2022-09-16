import React from "react";
import "./AdminNavbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "../VerticalNav/VerticalNav.css";
function AdminNavbar({ heading }) {
  return (
    <>
      <header>
        <h2>
          <div className="dashboard-wrapper">
            {/* <span class="las la-bars"></span> */}

            <label for="nav-toggle">
              <MenuOutlinedIcon
                sx={{
                  marginTop: "0.2rem",
                  // paddingLeft: "0.5rem",
                }}
              />
            </label>
            <div>{heading}</div>
          </div>
        </h2>

        {/* <div className="search-wrapper">
          {/* <span className="las la-search"></span> 
          <SearchIcon />
          <input type="search" placeholder="Search Here"></input>
        </div> */}

        <div class="user-wrapper">
          {/* <img src="" width="30px" height="30px" alt=""></img> */}
          <AccountCircleOutlinedIcon />
          <div>
            <h4>John Doe</h4>
            <small>Super Admin</small>
          </div>
        </div>
      </header>
    </>
  );
}

export default AdminNavbar;
