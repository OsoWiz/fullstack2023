import axios from "axios";
const baseUrl = "/api/blogs";

const getToken = () => {
  const user = window.localStorage.getItem("loggedBlogAppUser");
  if (user) {
    const jsonUser = JSON.parse(user);
    return jsonUser.token;
  }
  return null;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const token = getToken();
  if (!token) {
    return null;
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
