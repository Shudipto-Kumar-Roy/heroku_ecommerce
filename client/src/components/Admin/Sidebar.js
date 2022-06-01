import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <>
      <Menu {...props}>
        <Link className="menu-item" to="/admin">
          Dashboard
        </Link>
        <Link className="menu-item" to="/admin/allproducts">
          All Products
        </Link>
        <Link className="menu-item" to="/admin/createproduct">
          Create Product
        </Link>
        <Link className="menu-item" to="/admin/allorders">
          All Orders
        </Link>
        <Link className="menu-item" to="/admin/allusers">
          All Users
        </Link>
        <Link className="menu-item" to="/admin/allreviews">
          All Reviews
        </Link>
      </Menu>
    </>
  );
};

export default Sidebar;
