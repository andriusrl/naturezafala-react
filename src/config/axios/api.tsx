import axios from "axios";
import { user as userStorage } from "../../config/localStorage/localStorage";

const apiUrl = import.meta.env.VITE_APIURL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${userStorage.getToken()}`,
  },
});

export default api;
