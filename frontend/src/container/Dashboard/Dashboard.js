import React from "react";

import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./Dashboard.css";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import "../../components/VerticalNav/VerticalNav.css";

function Dashboard() {
  return (
    <>
      <VerticalNav />
      <AdminNavbar />

      <div className="board">
        <div className="cards">
          <div className="card-single">
            <div>
              <h1>54</h1>
              <span>Customers</span>
            </div>
            <div>
              {/* <span className="las la-users"></span> */}
              <PeopleAltOutlinedIcon />
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>54</h1>
              <span>Orders</span>
            </div>
            <div>
              {/* <span className="las la-shipping-bag"></span> */}
              <AssignmentReturnedOutlinedIcon />
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>54</h1>
              <span>Inventory</span>
            </div>
            <div>
              <InventoryOutlinedIcon />
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>54</h1>
              <span>Income</span>
            </div>
            <div>
              <AttachMoneyOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
