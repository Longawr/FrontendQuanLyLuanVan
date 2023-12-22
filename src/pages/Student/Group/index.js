import React, { Fragment, useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { UrlConstants } from "../../../constants";
import {
  addGroup,
  deleteGroups,
  loadGroupsPaging,
} from "../../../store/group/actions";
import { Pagination } from "../../../components";

export const Group = () => {
  const groups = useSelector((state) => state.groups.items);
  const totalItems = useSelector((state) => state.groups.total);
  const pageSize = useSelector((state) => state.groups.pageSize);

  const [currentPage, setCurrentPage] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(loadGroupsPaging(searchText, pageNumber));
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearchText = () => {
    setSearchText("");
    dispatch(loadGroupsPaging("", 1));
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
          dispatch(deleteGroups(selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };

  const groupElements = groups.map((group) => {
    return (
      <tr
        key={`group_${group._id}`}
        className={`table-row ${
          selectedItems.indexOf(group._id) !== -1 ? "selected" : ""
        }`}
        onClick={() => handleSelectRow(group._id)}
      >
        <td>
          <input
            type="checkbox"
            value={`${group._id}`}
            onChange={() => handleSelectRow(group._id)}
            checked={selectedItems.indexOf(group._id) !== -1}
          />
        </td>
        <td>
          <Link to={group._id}>{group.name}</Link>
        </td>
        <td>{group.leader.name}</td>
        <td>{group.teacher?.name}</td>
        <td>
          <Link to={UrlConstants.GROUP_EDIT + group._id}>Sửa</Link>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        {showAdd && (
          <div className="row mb-3">
            <div className="card ml-3">
              <form className="form-inline mt-2 mb-2">
                <button
                  className="btn btn-outline-danger ml-2"
                  onClick={() => setShowAdd(false)}
                >
                  Đóng<i className="fas fa-times"></i>
                </button>
                <div className="col-auto">
                  <input
                    className="form-control"
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    placeholder="Tên Nhóm"
                  />
                </div>
                <button
                  className="btn btn-primary mr-2"
                  type="button"
                  onClick={() => dispatch(addGroup(groupName))}
                >
                  Thêm
                </button>
              </form>
            </div>
          </div>
        )}
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Danh sách nhóm của bạn
            </h6>
          </div>
          <div className="header-buttons ml-4 mt-3">
            <div className="row mt-3">
              <div className="col-4">
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="form-control"
                  placeholder="Tìm Kiếm"
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => dispatch(loadGroupsPaging(searchText, 1))}
              >
                Tìm kiếm
              </button>
              <button
                type="button"
                onClick={() => clearSearchText()}
                className="btn btn-default ml-3"
              >
                Xoá
              </button>
            </div>
            <div className="row mt-3">
              <div className="col-10">
                {selectedItems.length > 0 && (
                  <Fragment>
                    <button
                      className="btn btn-outline-danger btn-sm ml-3"
                      onClick={handleDelete}
                    >
                      <span className="fa fa-trash"></span> Xoá
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm ml-3"
                      onClick={() => setSelectedItems([])}
                    >
                      <i className="fas fa-check"></i> Bỏ chọn
                    </button>
                  </Fragment>
                )}
              </div>
              <div className="col-2">
                <button
                  className="btn btn-link btn-sm ml-2"
                  onClick={() => setShowAdd(!showAdd)}
                >
                  <span className="fa fa-plus"></span> Thêm mới
                </button>
              </div>
            </div>
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
                    <th></th>
                    <th>Tên Nhóm</th>
                    <th>Trưởng Nhóm</th>
                    <th>Giáo Viên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{groupElements}</tbody>
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
