import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { getCurrentUser, login } from "../../store/account/actions";
import { UrlConstants } from "../../constants";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [submited, setSubmited] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const { id, password } = inputs;

  const loading = useSelector((state) => state.account.loading);
  const expiredAt = useSelector((state) => state.account.auth?.expiredAt);
  const role = useSelector((state) => state.account.auth?.role);

  useEffect(() => {
    if (expiredAt && new Date(expiredAt) <= new Date()) {
      dispatch(getCurrentUser());
    } else if (expiredAt && new Date(expiredAt) > new Date()) {
      const redirectTo =
        location.state?.from ||
        (role === "ADMIN" ? UrlConstants.ADMIN_HOME : UrlConstants.HOME);
      navigate(redirectTo, { replace: true });
    }
  }, [dispatch, navigate, expiredAt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);
    if (id && password) {
      dispatch(login(id, password));
    }
  };
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className={
                            "form-control form-control-user" +
                            (submited && !id ? " is-invalid" : "")
                          }
                          id="exampleInputid"
                          name="id"
                          onChange={handleChange}
                          placeholder="Enter id..."
                        />
                        {submited && !id && (
                          <div className="invalid-feedback">Id is required</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={
                            "form-control form-control-user" +
                            (submited && !password ? " is-invalid" : "")
                          }
                          id="exampleInputPassword"
                          name="password"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        {submited && !password && (
                          <div className="invalid-feedback">
                            Password is required
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <button href="index.html" className="btn btn-primary">
                          {loading && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Login
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
