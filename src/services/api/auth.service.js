import api from "../axios/index";
import { signin, signup } from "../endpoints/index";

const login = (username, password) => {
  return api.post(signin, { data: { username, password } });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, email, password, roles) => {
  return api.post(signup, {
    data: { username, email, password, roles: [roles] },
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const auth = { login, logout, register, getCurrentUser };

export default auth;
