import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../../store/account/actions";
import {
  acceptInvite,
  getReceivedInvitation,
  getSentInvitation,
  markAsRead,
  removeInvite,
} from "../../../store/invite/actions";

export const Topbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.account);
  const receivedInvites = useSelector((state) => state.invites.receivedInvites);
  const sentInvites = useSelector((state) => state.invites.sentInvites);

  const [topbarShowDropdown, setTopbarShowDropdown] = useState(0);
  //nothing === 0; userInfo === 1; receivedInvites === 2; sentInvites === 3

  useEffect(() => {
    dispatch(getReceivedInvitation());
    dispatch(getSentInvitation());
  }, [dispatch]);

  const timeSince = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000; //year in seconds
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000; //month in seconds
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400; //day in seconds
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600; //hour in seconds
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60; //minute in seconds
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  const receivedInvsMessage = (invitation) =>
    `${invitation.sentby.name} đã ${
      invitation.type === "SV"
        ? "mời bạn tham gia vào nhóm"
        : invitation.type === "GV"
        ? "xin bạn hướng dẫn cho nhóm"
        : ""
    } ${invitation.groupName}`;

  const sentInvsMessage = (invitation) =>
    `Bạn đã mời ${invitation.sentto.name} vào nhóm ${invitation.groupName}`;

  const unreadReceivedInsCount = receivedInvites.filter(
    (item) => item.isSeen === false
  ).length;

  const receivedInviteElements = receivedInvites.map((item) => {
    return (
      <div key={item._id} className="dropdown-item">
        <a
          className="d-flex align-items-center"
          onClick={() => {
            if (item.isSeen === false) dispatch(markAsRead(item._id));
          }}
        >
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white" />
            </div>
          </div>
          <div>
            <div className="small text-gray-500">
              {timeSince(new Date(item.createdAt))}
            </div>
            <span className="font-weight-bold">
              {receivedInvsMessage(item)}
            </span>
          </div>
        </a>
        <div className="d-flex align-items-between">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => dispatch(acceptInvite(item._id))}
          >
            Đồng ý
          </button>
          <button
            className="btn btn-sm"
            onClick={() => dispatch(removeInvite(item._id, true))}
          >
            Xoá
          </button>
        </div>
      </div>
    );
  });

  const sentInviteElements = sentInvites.map((item) => {
    return (
      <div key={item._id} className="dropdown-item">
        <a
          className="d-flex align-items-center"
          onClick={() => {
            if (item.isSeen === false) dispatch(markAsRead(item._id));
          }}
        >
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white" />
            </div>
          </div>
          <div>
            <div className="small text-gray-500">
              {timeSince(new Date(item.createdAt))}
            </div>
            <span className="font-weight-bold">{sentInvsMessage(item)}</span>
          </div>
        </a>
        <button
          className="btn btn-sm"
          onClick={() => dispatch(removeInvite(item._id, false))}
        >
          Xoá
        </button>
      </div>
    );
  });

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars" />
      </button>
      {/* Topbar Search */}
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm" />
            </button>
          </div>
        </div>
      </form>
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Search Dropdown (Visible Only XS) */}
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw" />
          </a>
          {/* Dropdown - Messages */}
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        {/* Nav Item - Sent Invs */}
        <li
          className={
            "nav-item dropdown no-arrow mx-1" +
            (topbarShowDropdown === 3 ? " show" : "")
          }
        >
          <a
            className="nav-link dropdown-toggle noselect"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={topbarShowDropdown === 3 ? "true" : "false"}
            onClick={() => {
              if (topbarShowDropdown !== 3) setTopbarShowDropdown(3);
              else setTopbarShowDropdown(0);
            }}
          >
            <i className="fas fa-bell fa-fw" /> Lời mời đã gửi
          </a>
          {/* Dropdown - Sent Invs */}
          <div
            className={
              "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" +
              (topbarShowDropdown === 3 ? " show" : "")
            }
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Sent Invitation Center</h6>
            {sentInvites.length > 0 && sentInviteElements}
            <a className="dropdown-item text-center small text-gray-500">
              Show All Invitation
            </a>
          </div>
        </li>
        {/* Nav Item - Received Invs */}
        <li
          className={
            "nav-item dropdown no-arrow mx-1" +
            (topbarShowDropdown === 2 ? " show" : "")
          }
        >
          <a
            className="nav-link dropdown-toggle noselect"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={topbarShowDropdown === 2 ? "true" : "false"}
            onClick={() => {
              if (topbarShowDropdown !== 2) setTopbarShowDropdown(2);
              else setTopbarShowDropdown(0);
            }}
          >
            <i className="fas fa-bell fa-fw" /> Lời mời đã nhận
            {/* Counter - Received Invs */}
            {unreadReceivedInsCount > 0 && (
              <span className="badge badge-danger badge-counter">
                {unreadReceivedInsCount}
              </span>
            )}
          </a>
          {/* Dropdown - Received Invs */}
          <div
            className={
              "dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" +
              (topbarShowDropdown === 2 ? " show" : "")
            }
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Received Invitation Center</h6>
            {receivedInvites.length > 0 && receivedInviteElements}
            <a className="dropdown-item text-center small text-gray-500">
              Show All Invitation
            </a>
          </div>
        </li>
        <div className="topbar-divider d-none d-sm-block" />
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={topbarShowDropdown === 1 ? "true" : "false"}
            onClick={() => {
              if (topbarShowDropdown !== 1) setTopbarShowDropdown(1);
              else setTopbarShowDropdown(0);
            }}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {user?.name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="img/undraw_profile.svg"
            />
          </a>
          {/* Dropdown - User Information */}
          <div
            className={
              "dropdown-menu dropdown-menu-right shadow animated--grow-in" +
              (topbarShowDropdown === 1 ? " show" : "")
            }
            aria-labelledby="userDropdown"
          >
            <Link to="info" className="dropdown-item">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Profile
            </Link>
            <a className="dropdown-item">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
              Change Password
            </a>
            {/* <a className="dropdown-item">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
              Activity Log
            </a> */}
            <div className="dropdown-divider" />
            <button
              className="dropdown-item"
              onClick={() => dispatch(logout())}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};
