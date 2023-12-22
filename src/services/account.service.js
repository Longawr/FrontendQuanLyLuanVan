import {
  api,
  socket,
  saveObjState,
  removeState,
  AUTH,
  CURRENT_USER,
} from "../helpers";

const login = async (id, password) => {
  const url = "/auth/login";
  const body = { id: id, password: password };

  return await api.post(url, body).then(({ data }) => {
    saveObjState(AUTH, data);
    return data;
  });
};

const logout = async () => {
  const url = "/auth/logout";
  removeState(AUTH);
  removeState(CURRENT_USER);
  socket.disconnect("logout");
  await api.delete(url);
};

const refreshToken = async () => {
  const url = "/auth/token";
  return api.post(url);
};

const getCurrentUser = async () => {
  const url = "/auth/user";
  return await api.get(url).then(({ data }) => {
    saveObjState(CURRENT_USER, data);
    return data;
  });
};

const getUsersbyID = async (id, groupID) => {
  const url = `/auth/usersbyID/${groupID}?id=${id}`;
  return await api.get(url).then(({ data }) => data);
};

const editCurrentUser = async (user) => {
  const url = "/auth/user/update";
  return await api.put(url, user).then(({ data }) => data);
};

export const accountService = {
  login,
  logout,
  refreshToken,
  getCurrentUser,
  getUsersbyID,
  editCurrentUser,
};
