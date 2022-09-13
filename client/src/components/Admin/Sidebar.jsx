import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { TreeItem, TreeView } from "@mui/lab";
import {
  ExpandMore,
  PostAdd,
  Add,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
} from "@mui/icons-material";
// import Logo from "../layout/Header/Navbar/Logo/Logo.jsx";

const Sidebar = () => {
  return (
  // <div className="side">
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>

      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>

          <Link to="/admin/product/new">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView>
      <Link to="/admin/orders">
        <p>
          <ListAlt /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReview /> Reviews
        </p>
      </Link>
    </div>
  // </div>
  );
};

export default Sidebar;
