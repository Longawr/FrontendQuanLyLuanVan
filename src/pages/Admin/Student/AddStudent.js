import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { addStudent } from "../../../store/student/actions";
import { validateEmail } from "../../../helpers";

export const AddStudent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    birthday: "",
    major: "",
    className: "",
    email: "",
    phone: "",
  });
  const { name, birthday, major, className, email, phone } = formInputs;

  useEffect(() => {
    if (!(loading && error)) {
      setFormSubmitted(false);
      clearForm();
    }
  }, [loading, error]);

  const clearForm = () => {
    setFormInputs({
      name: "",
      birthday: "",
      major: "",
      className: "",
      email: "",
      phone: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (name && major && (validateEmail(email) || !email)) {
      const student = {
        name,
        birthday: new Date(birthday),
        major,
        className,
        email,
        phone,
      };
      dispatch(addStudent(student));
    }
  };

  return (
    <Fragment>
      <h1 className="h3 mb-4 text-gray-800">Thêm mới sinh viên</h1>
      <div className="card">
        <div className="card-header">Thông tin sinh viên</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên SV</label>
              <input
                type="text"
                className={
                  "form-control " + (formSubmitted && !name ? "is-invalid" : "")
                }
                name="name"
                value={name}
                onChange={handleChange}
              />
              {formSubmitted && !name && (
                <div className="invalid-feedback">Name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                value={birthday}
                onChange={handleChange}
                min="1997-01-01"
                max="2030-12-31"
              />
            </div>

            <div className="form-group">
              <label>Ngành</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (formSubmitted && !major ? "is-invalid" : "")
                }
                name="major"
                value={major}
                onChange={handleChange}
              />
              {formSubmitted && !major && (
                <div className="invalid-feedback">Major is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Lớp</label>
              <input
                type="text"
                className="form-control"
                name="className"
                value={className}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (formSubmitted && email && !validateEmail(email)
                    ? "is-invalid"
                    : "")
                }
                name="email"
                value={email}
                placeholder="name@example.com"
                onChange={handleChange}
              />
              {formSubmitted && email && !validateEmail(email) && (
                <div className="invalid-feedback">Email is not valid</div>
              )}
            </div>

            <div className="form-group">
              <label>SĐT</label>
              <input
                type="phone"
                className="form-control"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Lưu
              </button>
              <Link className="btn btn-danger ml-2" to="..">
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
