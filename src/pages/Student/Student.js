import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { LeftMenu, Topbar } from "./";
import { socket } from "../../helpers";
import { loadGroupsPaging } from "../../store/group/actions";
import {
  addReceivedInvitation,
  removeReceivedInvite,
  removeSentInvite,
} from "../../store/invite/actions";
export const Student = () => {
  const alert = useSelector((state) => state.alert);
  const group = useSelector((state) => state.groups);
  const userID = useSelector((state) => state.account.user._id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(loadGroupsPaging("", 1));
    if (!group.loading) {
      if (location.pathname === "/") navigate("group");
    }
  }, [dispatch]);

  useEffect(() => {
    socket.on("connect", function (data) {
      socket.emit("join", userID);
    });
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    socket.on("receive-invitation", function (data) {
      dispatch(addReceivedInvitation(data));
    });

    socket.on("removed-member", async function ({ groupName, by }) {
      await swal({
        title: "Thông báo",
        text: `Bạn hiện không còn là thành viên của nhóm ${groupName} bởi ${by}`,
        icon: "info",
        buttons: "Quay lại",
      });
      if (location.pathname.startsWith("/group/")) navigate("group");
    });

    socket.on("removed-group", async function ({ groupName, by }) {
      await swal({
        title: "Thông báo",
        text: `Nhóm ${groupName} đã bị xoá bởi ${by}`,
        icon: "info",
        buttons: "Quay lại",
      });
      if (location.pathname.startsWith("/group/")) navigate("group");
    });

    socket.on("removed-sent-invitation", function (invitationID) {
      dispatch(removeSentInvite(invitationID));
    });

    socket.on("removed-received-invitation", function (invitationID) {
      dispatch(removeReceivedInvite(invitationID));
    });

    socket.on("accepted-invitation", function (invitationID) {
      dispatch(removeSentInvite(invitationID));
    });
  });

  return (
    <>
      <div id="wrapper">
        <LeftMenu />

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            <Topbar />
            {/* Begin Page Content */}
            <div className="container-fluid">
              {alert?.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              <Outlet />
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
};
