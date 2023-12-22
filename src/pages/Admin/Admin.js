import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { LeftMenu, Topbar } from "./";

export const Admin = () => {
  const alert = useSelector((state) => state.alert);

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
