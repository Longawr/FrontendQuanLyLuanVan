import React from "react";

// import "./styles.css";
import { UrlConstants } from "../constants";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section>
      <div className="container">
        <div className="text">
          <h1>Page Not Found</h1>
          <p>
            We can't seem to find the page you're looking for. Please check the
            URL for any typos.
          </p>
          <div className="input-box">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fa-solid fa-search" />
            </button>
          </div>
          <ul className="menu">
            <li>
              <Link to={UrlConstants.HOME}>Go to Homepage</Link>
            </li>
            {/* <li>
              <Link to={UrlConstants.}>Visit our Blog</Link>
            </li>
            <li>
              <Link to={UrlConstants.}>Contact support</Link>
            </li> */}
          </ul>
        </div>
        <div>
          <img
            className="image"
            src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png"
            alt="NotFound"
          />
        </div>
      </div>
    </section>
  );
};
