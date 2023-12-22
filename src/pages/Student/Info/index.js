import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { UrlConstants } from "../../../constants";
import { validateEmail, handleDate } from "../../../helpers";
import { editCurrentUser } from "../../../store/account/actions";

export const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const loading = useSelector((state) => state.account.loading);

  const [formInputs, setFormInputs] = useState({
    birthday: "",
    email: "",
    phone: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { birthday, email, phone } = formInputs;

  useEffect(() => {
    setFormInputs({
      birthday: user !== null ? user.birthday : "",
      email: user !== null ? user.email : "",
      phone: user !== null ? user.phone : "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!birthday && !email && !phone) return;
    setFormSubmitted(true);
    let newUser = {
      birthday: new Date(birthday),
      email,
      phone,
    };
    dispatch(editCurrentUser(newUser));
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Thông tin user</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-3">
                <label>Tên</label>
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={user.name}
                  readOnly
                />
              </div>

              <div className="form-group col-3">
                <label>Lớp</label>
                <input
                  type="className"
                  className="form-control-plaintext"
                  value={user.className}
                  readOnly
                />
              </div>

              <div className="form-group col-3">
                <label>Ngành</label>
                <input
                  type="major"
                  className="form-control-plaintext"
                  value={user.major}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label>ngày sinh</label>
              <input
                type="date"
                className="form-control"
                value={handleDate(birthday)}
                name="birthday"
                onChange={handleChange}
                min="1997-01-01"
                max="2030-12-31"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (formSubmitted && (!email || !validateEmail(email))
                    ? "is-invalid"
                    : "")
                }
                value={user.email}
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
              />
              {formSubmitted && !email && (
                <div className="invalid-feedback">Email is required</div>
              )}
              {formSubmitted && email && !validateEmail(email) && (
                <div className="invalid-feedback">Email is not valid</div>
              )}
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="phone"
                className="form-control"
                value={user.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Lưu
              </button>
              <Link className="btn btn-danger" to={UrlConstants.USERS_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
