import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import {
  deleteStudents,
  loadStudentsPaging,
} from "../../../store/student/actions";
import { Pagination } from "../../../components";
import { handleDate } from "../../../helpers";

export const AdStudent = () => {
  const locale = "vn";

  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.items);
  const totalItems = useSelector((state) => state.students.total);
  const pageSize = useSelector((state) => state.students.pageSize);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(loadStudentsPaging(searchKeyword, currentPage));
  }, [dispatch, currentPage]);

  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleKeywordPress = (e) => {
    setSearchKeyword(e.target.value);
  };

  const clearSearch = () => {
    setSearchKeyword("");
    dispatch(loadStudentsPaging("", 1));
  };

  const handleSelectRow = (id) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItems(newSelectedItems);
  };

  const handleDelete = () => {
    if (selectedItems) {
      swal({
        title: "Xác nhận",
        text: "Bạn có muốn xoá các bản ghi này?",
        icon: "warning",
        buttons: ["Huỷ", "Xác nhận"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteStudents(selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };

  const studentElements = students.map((student) => {
    return (
      <tr
        key={`student_${student._id}`}
        className={`table-row ${
          selectedItems.indexOf(student._id) !== -1 ? "selected" : ""
        }`}
        onClick={() => handleSelectRow(student._id)}
      >
        <td>
          <input
            type="checkbox"
            value={`${student._id}`}
            onChange={() => handleSelectRow(student._id)}
            checked={selectedItems.indexOf(student._id) !== -1}
          />
        </td>
        <td>{student._id}</td>
        <td>{student.name}</td>
        <td>{handleDate(student.birthday, locale)}</td>
        <td>{student.major}</td>
        <td>{student.className}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>
          <Link to={`edit/${student._id}`}>Sửa</Link>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        <h2 className="h3 mb-2 text-gray-800">Quản lý sinh viên</h2>
        {showSearch && (
          <div className="row mb-3">
            <div className="col-xl-12 col-md-12 mb-12">
              <div className="card">
                <h5 className="card-header">Tìm kiếm</h5>
                <div className="header-buttons">
                  <button
                    className="btn btn-default"
                    onClick={() => setShowSearch(false)}
                  >
                    Đóng
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="card-body">
                  <form className="form-inline">
                    <div className="col-auto">
                      <input
                        type="text"
                        value={searchKeyword}
                        onChange={handleKeywordPress}
                        className="form-control"
                        placeholder="Từ khoá"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(loadStudentsPaging(searchKeyword, currentPage))
                      }
                      className="btn btn-primary my-1"
                    >
                      Tìm kiếm
                    </button>
                    <button
                      type="button"
                      onClick={() => clearSearch()}
                      className="btn btn-default my-1"
                    >
                      Xoá
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách sinh viên
            </h6>
          </div>
          <div className="header-buttons">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowSearch(true)}
            >
              Tìm kiếm
            </button>
            <Link to="add" className="btn btn-outline-success btn-sm ml-2">
              <span className="fa fa-plus"></span> Thêm mới
            </Link>
            {selectedItems.length > 0 && (
              <Fragment>
                <button
                  className="btn btn-outline-danger btn-sm ml-2"
                  onClick={handleDelete}
                >
                  <span className="fa fa-trash"></span> Xoá
                </button>
                <button
                  className="btn btn-outline-primary btn-sm ml-2"
                  onClick={() => setSelectedItems([])}
                >
                  <i className="fas fa-check"></i> Bỏ chọn
                </button>
              </Fragment>
            )}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th width="5%"></th>
                    <th width="10%">Mã SV</th>
                    <th width="17%">Tên SV</th>
                    <th width="10%">Ngày sinh</th>
                    <th width="10%">Ngành</th>
                    <th width="10%">Lớp</th>
                    <th width="23%">Email</th>
                    <th width="10%">SĐT</th>
                    <th width="5%"></th>
                  </tr>
                </thead>
                <tbody>{studentElements}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Pagination
              totalRecords={totalItems}
              pageLimit={5}
              pageSize={pageSize}
              onPageChanged={onPageChanged}
            ></Pagination>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
