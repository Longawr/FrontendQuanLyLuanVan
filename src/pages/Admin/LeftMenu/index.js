import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LeftMenu = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isGroupListShow, setisGroupListShow] = useState(false);

  return (
    <ul
      className={
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" +
        (isToggled ? " toggled" : "")
      }
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/group"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Quản Lý Đồ Án</div>
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      {/* <li className="nav-item active">
        <Link className="nav-link" to="/group">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li> */}
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Management</div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className={"nav-link" + (isGroupListShow ? "" : " collapsed")}
          aria-expanded={isGroupListShow ? "true" : "false"}
          onClick={() => setisGroupListShow(!isGroupListShow)}
        >
          <i className="fas fa-fw fa-cog" />
          <span>Người dùng</span>
        </a>
        <div className={"collapse" + (isGroupListShow ? " show" : "")}>
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="student">
              Sinh viên
            </Link>
            <Link className="collapse-item" to="teacher">
              Giảng viên
            </Link>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Addons</div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Pages</span>
        </a>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Login Screens:</h6>
            <a className="collapse-item" href="login.html">
              Login
            </a>
            <a className="collapse-item" href="register.html">
              Register
            </a>
            <a className="collapse-item" href="forgot-password.html">
              Forgot Password
            </a>
            <div className="collapse-divider" />
            <h6 className="collapse-header">Other Pages:</h6>
            <a className="collapse-item" href="404.html">
              404 Page
            </a>
            <a className="collapse-item" href="blank.html">
              Blank Page
            </a>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => setIsToggled(!isToggled)}
        />
      </div>
    </ul>
  );
};
