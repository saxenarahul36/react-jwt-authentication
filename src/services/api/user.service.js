import api from "../axios/index";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return api.get("/api/all");
};

const getUserBoard = () => {
  return api.get("/api/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return api.get("/api/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return api.get("/api/admin", { headers: authHeader() });
};

const getAllUserList = () => {
  return api.get("/api/alluser", { headers: authHeader() });
};

export {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUserList,
};
