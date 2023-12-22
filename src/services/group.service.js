import { api } from "../helpers";

const getgroupsPaging = async (name, currentPage) => {
  const pageSize = 5;
  const url = `/group/show/${currentPage}?name=${name}&pageSize=${pageSize}`;
  return await api.get(url).then(({ data }) => data);
};

const getGroupById = async (id) => {
  const url = `/group/details/${id}`;
  return await api.get(url).then(({ data }) => data);
};

const addGroup = async (groupName) => {
  const url = "/group/add";
  const body = { groupName };
  return await api.post(url, body).then(({ data }) => data);
};

const deleteGroups = async (ids) => {
  const url = "/group/remove";
  const data = { groupIDs: ids };
  return await api.delete(url, { data }).then(({ data }) => data);
};

const updateGroup = async (id, groupName, projectName) => {
  const url = "/group/update";
  const data = {
    groupID: id,
    groupName: groupName,
    projectName: projectName,
  };
  return await api.put(url, data).then(({ data }) => data);
};

const downloadFile = async (groupID, fileID) => {
  const url = `group/details/${groupID}/file/${fileID}/`;
  const config = { responseType: "blob" };
  return await api.get(url, config).then((response) => {
    const filename = response.headers["content-disposition"].split("=")[1];
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return { filename };
  });
};

const deleteFiles = async (groupID, fileIDs) => {
  const url = `group/details/${groupID}/file/remove`;
  const data = { fileIDs };
  return await api.delete(url, { data }).then((response) => response.data);
};

const uploadFile = async (groupID, file) => {
  const url = `group/details/${groupID}/file/upload/`;
  const formData = new FormData();
  formData.append("file", file);
  return await api.post(url, formData).then((response) => response.data);
};

const deleteMembers = async (groupID, memberIDs) => {
  const url = `/group/details/${groupID}/members/remove`;
  let data = { memberIDs };
  return await api.delete(url, { data }).then((response) => response.data);
};

export const groupService = {
  getgroupsPaging,
  getGroupById,
  addGroup,
  deleteGroups,
  updateGroup,
  downloadFile,
  deleteFiles,
  uploadFile,
  deleteMembers,
};
