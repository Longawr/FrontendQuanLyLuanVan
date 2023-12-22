import React, { Fragment, useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteFiles,
  deleteMembers,
  downloadFile,
  getGroupById,
  updateGroup,
  uploadFile,
} from "../../../store/group/actions";
import { searchUsers, selectedSearch } from "../../../store/account/actions";
import { invite } from "../../../store/invite/actions";

export const GroupDetails = () => {
  const { groupID } = useParams();
  const dispatch = useDispatch();
  const searchMenu = useRef(null);
  const fileInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchDropdownShow, setSearchDropdownShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const group = useSelector((state) => state.groups.editGroup);
  const searchResults = useSelector((state) => state.account.searchItems);
  const inviteItem = useSelector((state) => state.account.selectedItem);

  //get group details for the first time
  useEffect(() => {
    dispatch(getGroupById(groupID));
  }, [dispatch]);

  //set search text when user stop type 1s
  useEffect(() => {
    if (isSearch) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  // file control
  const formatBytes = (bytes = 0, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) dispatch(uploadFile(groupID, selectedFile));
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectRow = (id) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItems(newSelectedItems);
  };

  const handleDeleteMember = () => {
    if (selectedItems) {
      swal({
        title: "Xác nhận",
        text: "Bạn có muốn xoá các bản ghi này?",
        icon: "warning",
        buttons: ["Huỷ", "Xác nhận"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteMembers(groupID, selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };

  const handleGroupChange = (isChangeGroupName) => {
    const message = isChangeGroupName ? "tên nhóm" : "tên đề tài";
    swal({
      text: `Nhập ${message} mới`,
      content: "input",
      buttons: [true, "Save"],
    }).then((name) => {
      if (name === null) return;
      if (!name) return swal("Nothing changed");
      return isChangeGroupName
        ? dispatch(updateGroup(groupID, name))
        : dispatch(updateGroup(groupID, undefined, name));
    });
  };

  const handleLeaveGroup = () => {
    swal({
      title: "Xác nhận",
      text: "Bạn có muốn rời nhóm?",
      icon: "warning",
      buttons: ["Huỷ", "Xác nhận"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMembers(groupID, []));
      }
    });
  };

  const handleDeleteFiles = () => {
    if (selectedItems) {
      swal({
        title: "Xác nhận",
        text: "Bạn có muốn xoá các bản ghi này?",
        icon: "warning",
        buttons: ["Huỷ", "Xác nhận"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteFiles(groupID, selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };

  //search members
  const handleInvite = () => {
    dispatch(invite(groupID, inviteItem._id, inviteItem.role));
  };

  const handleSearch = () => {
    if (isSearch) dispatch(searchUsers(searchTerm, groupID));
    setSearchDropdownShow(true);
  };

  const handleResultClick = (id, role) => {
    setIsSearch(false);
    setSearchDropdownShow(false);
    setSearchTerm(id);
    dispatch(selectedSearch(id, role));
  };

  const closeOpenMenus = (e) => {
    if (
      searchMenu.current &&
      searchDropdownShow &&
      !searchMenu.current.contains(e.target)
    ) {
      setSearchDropdownShow(false);
    }
  };

  document.addEventListener("mousedown", closeOpenMenus);

  const fileElements = group?.files?.map((file) => {
    return (
      <tr
        key={`group_${file._id}`}
        className={`table-row ${
          selectedItems.indexOf(file._id) !== -1 ? "selected" : ""
        }`}
        // onClick={() => handleSelectRow(file._id)}
      >
        <td>
          <input
            type="checkbox"
            value={`${file._id}`}
            onChange={() => handleSelectRow(file._id)}
            checked={selectedItems.indexOf(file._id) !== -1}
          />
        </td>
        <td>{file.originalname}</td>
        <td>{formatBytes(parseInt(file.size))}</td>
        <td>{file.percentPlagiarism}%</td>
        <td>
          <Link to={`file/${file._id}`} className="btn btn-sm text-nowrap">
            chi tiết
          </Link>
        </td>
        <td>
          <button
            className="btn btn-sm text-nowrap"
            onClick={() => dispatch(downloadFile(groupID, file._id))}
          >
            download
          </button>
        </td>
      </tr>
    );
  });

  const memberElements = group?.members?.map((member) => {
    return (
      <tr
        key={`group_${member._id}`}
        className={`table-row ${
          selectedItems.indexOf(member._id) !== -1 ? "selected" : ""
        }`}
        onClick={() => handleSelectRow(member._id)}
      >
        <td>
          <input
            type="checkbox"
            value={`${member._id}`}
            onChange={() => handleSelectRow(member._id)}
            checked={selectedItems.indexOf(member._id) !== -1}
          />
        </td>
        <td>{member._id}</td>
        <td>{member.name}</td>
        <td>{member.role}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        <div className="d-flex flex-row mb-4">
          {group?.projectName ? (
            <h1 className="h3 text-gray-800 align-self-center">
              {group?.projectName}
            </h1>
          ) : (
            <div className="align-self-center">Chưa chọn đề tài </div>
          )}
          <button
            className="btn btn-sm btn-outline-secondary align-self-center ml-1"
            onClick={() => handleGroupChange(false)}
          >
            đổi đề tài
          </button>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3"></div>

          {/* Table Header */}
          <div className="card-header py-3">
            <div className="row">
              <Link
                to=".."
                className="m-0 font-weight-bold text-primary col-auto"
              >
                <h6>{group?.name}</h6>
              </Link>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleGroupChange(true)}
              >
                sửa
              </button>
              <div className="col-6" />
              <span className="font-weight-bold col-3">
                GVHD: {group?.teacher?.name}
              </span>
            </div>
          </div>
          {/* Nav Tabs */}
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className={
                  "nav-item nav-link" + (selectedTab === 0 ? " active" : "")
                }
                id="nav-members-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="nav-members"
                aria-selected={(selectedTab === 0).toString()}
                onClick={() => {
                  setSelectedItems([]);
                  setSelectedTab(0);
                }}
              >
                Thành Viên
              </a>
              <a
                className={"nav-link" + (selectedTab === 1 ? " active" : "")}
                id="nav-files-tab"
                role="tab"
                aria-controls="nav-files"
                aria-selected={(selectedTab === 1).toString()}
                onClick={() => {
                  setSelectedItems([]);
                  setSelectedTab(1);
                }}
              >
                Files
              </a>
            </div>
          </nav>
          {/* Tab Contents */}
          <div className="tab-content" id="nav-tabContent">
            <div
              className={
                "tab-pane fade" + (selectedTab === 0 ? " show active" : "")
              }
              id="nav-members"
              role="tabpanel"
              aria-labelledby="nav-members-tab"
            >
              {/* Controller Button */}
              <div className="header-buttons ml-5 mt-3">
                <div className="row mt-3">
                  {/* Dropdown */}
                  <div className="dropdown no-arrow col-4">
                    <input
                      autoFocus
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      placeholder="id..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value !== "") {
                          setIsSearch(true);
                        } else {
                          setIsSearch(false);
                          setSearchDropdownShow(false);
                        }
                      }}
                      onFocus={handleSearch}
                    />
                    {/* Search Dropdown Menu */}
                    <div
                      ref={searchMenu}
                      className={
                        "w-100 dropdown-menu shadow animated--grow-in" +
                        (searchDropdownShow && isSearch ? " show" : "")
                      }
                      aria-labelledby="searchDropdown"
                    >
                      {searchResults.map((result) => (
                        <button
                          key={result._id}
                          className="dropdown-item"
                          onClick={() =>
                            handleResultClick(result._id, result.role)
                          }
                        >
                          {result._id} | {result.name} | {result.role}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm ml-2 col-auto"
                    onClick={handleInvite}
                  >
                    Mời vào nhóm
                  </button>
                </div>
                {/* secondary Controller button */}
                <div className="row mt-3">
                  <div className="col-10">
                    {selectedItems.length > 0 && (
                      <Fragment>
                        <button
                          className="btn btn-outline-danger btn-sm ml-3"
                          onClick={handleDeleteMember}
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
                      className="btn btn-outline-danger btn-sm ml-3"
                      onClick={handleLeaveGroup}
                    >
                      Rời nhóm
                    </button>
                  </div>
                </div>
              </div>
              {/* Tables */}
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
                        <th width="25%">ID</th>
                        <th width="45%">Tên</th>
                        <th width="25%">Vai Trò</th>
                      </tr>
                    </thead>
                    {group?.members && <tbody>{memberElements}</tbody>}
                  </table>
                </div>
              </div>
            </div>

            <div
              className={
                "tab-pane fade" + (selectedTab === 1 ? " show active" : "")
              }
              id="nav-files"
              role="tabpanel"
              aria-labelledby="nav-files-tab"
            >
              {/* Controllers Button */}
              <div className="header-buttons ml-4 mt-3">
                <div className="row mt-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={handleUpload}
                  >
                    <span className="fa fa-plus"></span> Upload
                  </button>
                </div>
                <div className="row mt-3">
                  {selectedItems.length > 0 && (
                    <Fragment>
                      <button
                        className="btn btn-outline-danger btn-sm ml-3"
                        onClick={handleDeleteFiles}
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
              </div>
              {/* Tables */}
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
                        <th width="30%">Tên File</th>
                        <th width="10%">Kích Thước</th>
                        <th width="10%">Đạo Văn</th>
                        <th width="35%">Chi Tiết</th>
                        <th width="10%"></th>
                      </tr>
                    </thead>
                    {group?.files && <tbody>{fileElements}</tbody>}
                  </table>
                  {(!group?.files || group.files.length === 0) && (
                    <span>Nhóm không tồn tại</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
