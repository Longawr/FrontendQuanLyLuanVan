import { api } from "../helpers";

const getTeachersPaging = async (keyword, currentPage) => {
  const pageSize = 5;
  const url = `/teacher/search/${currentPage}?searchText=${keyword}&pageSize=${pageSize}`;
  return await api.get(url).then(({ data }) => data);
};

const addTeacher = async (teacher) => {
  const url = "/teacher/add";
  return await api.post(url, teacher).then(({ data }) => data);
};

const updateTeacher = async (id, teacher) => {
  const url = `teacher/update/${id}`;
  return await api.put(url, teacher).then(({ data }) => {
    return data;
  });
};

const getTeacherById = async (id) => {
  const url = `/teacher/details/${id}`;
  return await api.get(url).then(({ data }) => data);
};

const deleteTeachers = async (ids) => {
  const url = `teacher/remove`;
  return await api.delete(url, { data: ids }).then(({ data }) => data);
};

export const teacherService = {
  getTeachersPaging,
  addTeacher,
  updateTeacher,
  getTeacherById,
  deleteTeachers,
};
