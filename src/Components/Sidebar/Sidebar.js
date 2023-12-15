import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, ProfileContext } from "../../App";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DownloadIcon from "@mui/icons-material/Download";
import html2PDF from "jspdf-html2canvas";
import "../../App.sass";
import "./Sidebar.sass";

const Sidebar = () => {
  const { handleDarkMode, handleBlueColorMode, handleDefaultMode } =
    useContext(ThemeContext);
  const { userName, profilePic } = useContext(ProfileContext);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  // Handles logout
  function handleLogout() {
    setLogoutPrompt(!logoutPrompt);
    const logoutPropmtDiv = document.querySelector(".logout_prompt_div");
    logoutPropmtDiv.setAttribute(
      "style",
      `${logoutPrompt ? "" : "display: block"}`
    );
  }

  // JsPDF-Html2Canvas function to download the targeted screenshot as pdf
  const downloadPdf = () => {
    const page = document.querySelector(".dashboard_container_right_panel");
    html2PDF(page, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "Report.pdf",
    });
  };

  return (
    <>
      <div className="dashboard_container_left_panel">
        <div className="sidebar_menu_items_top_div">
          <ul>
            <h6 className="title m-0">Main</h6>
            <Link to="/home" style={{ textDecoration: "none", color: "unset" }}>
              <li>
                <DashboardIcon className="icon" />
                <p>Dashboard</p>
              </li>
            </Link>
            <h6 className="title">Menu</h6>
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <PersonOutlineIcon className="icon" />
                <p>Users</p>
              </li>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <StoreIcon className="icon" />
                <p>Products</p>
              </li>
            </Link>
            <Link
              to="/orders"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <CreditCardIcon className="icon" />
                <p>Orders</p>
              </li>
            </Link>
            <h6 className="title">For Admins</h6>
            <Link
              to="/users/new"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <PersonAddAltIcon className="icon" />
                <p>Add a user</p>
              </li>
            </Link>
            <Link
              to="/products/new"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <li>
                <AddShoppingCartIcon className="icon" />
                <p>Add a product</p>
              </li>
            </Link>
            <Link
              to=""
              style={{ textDecoration: "none", color: "unset" }}
              onClick={downloadPdf}
            >
              <li>
                <DownloadIcon className="icon" />
                <p>Download Report</p>
              </li>
            </Link>
          </ul>
          <div className="sidebar_menu_color_option_div">
            <h6 className="mb-0">Color Theme</h6>
            <div className="color_option_div_wrapper">
              <div
                className="color_option_div"
                onClick={handleDefaultMode}
              ></div>
              <div className="color_option_div" onClick={handleDarkMode}></div>
              <div
                className="color_option_div"
                onClick={handleBlueColorMode}
              ></div>
            </div>
          </div>
        </div>
        <div className="sidebar_bottom_profile_div" title="Admin Profile">
          <div className="bottom_profile_img_div">
            <img
              src={profilePic}
              alt="Admin Avatar"
              width="30px"
              height="30px"
            />
          </div>
          <div className="bottom_profile_admin_info">
            <h6 className="mb-0">{userName}</h6>
            <p className="mb-0">Hero Admin</p>
          </div>
          <div className="bottom_profile_logout" onClick={handleLogout}>
            <ExitToAppIcon style={{ cursor: "pointer" }} />
          </div>
          <div className="logout_prompt_div p-2">
            <div className="logout_text">
              <p className="mb-1">Are you sure you want to logout?</p>
            </div>
            <div className="logout_btn_div d-flex justify-content-center">
              <button
                className="btn btn-warning logout_yes_btn rounded-0 mx-2"
                onClick={handleLogout}
              >
                No
              </button>
              <Link
                to="/logout"
                style={{ textDecoration: "none", color: "unset" }}
              >
                <button className="btn btn-danger logout_no_btn rounded-0">
                  Yes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
