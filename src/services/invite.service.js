import { api } from "../helpers";

const invite = async (groupID, userID, role) => {
  const url = "/invitation/add";
  const body = { groupID, userID, type: role };

  return await api.post(url, body).then(({ data }) => data);
};

const getReiceivedInvitation = async () => {
  const url = "/invitation/received";
  return await api.get(url).then(({ data }) => data);
};

const getSentInvitation = async () => {
  const url = "/invitation/sent";
  return await api.get(url).then(({ data }) => data);
};

const markAsRead = async (id) => {
  const url = `/invitation/read/${id}`;
  return await api.post(url).then(({ data }) => data);
};

const acceptInvite = async (id) => {
  const url = `/invitation/accept/${id}`;
  return await api.post(url).then(({ data }) => data);
};

const removeInvite = async (id) => {
  const url = `/invitation/remove/${id}`;
  return await api.delete(url).then(({ data }) => data);
};

export const inviteService = {
  invite,
  getReiceivedInvitation,
  getSentInvitation,
  markAsRead,
  acceptInvite,
  removeInvite,
};
