import { api } from "../helpers";

const getStudentsPaging = async (keyword, currentPage) => {
  const pageSize = 5;
  const url = `/student/search/${currentPage}?searchText=${keyword}&pageSize=${pageSize}`;
  return await api.get(url).then(({ data }) => data);
};

const addStudent = async (student) => {
  const url = "/student/add";
  return await api.post(url, student).then(({ data }) => data);
};

const updateStudent = async (id, student) => {
  const url = `student/update/${id}`;
  return await api.put(url, student).then(({ data }) => {
    return data;
  });
};

const getStudentById = async (id) => {
  const url = `/student/details/${id}`;
  return await api.get(url).then(({ data }) => data);
};

const deleteStudents = async (ids) => {
  const url = `student/remove`;
  return await api.delete(url, { data: ids }).then(({ data }) => data);
};

export const studentService = {
  getStudentsPaging,
  addStudent,
  updateStudent,
  getStudentById,
  deleteStudents,
};
