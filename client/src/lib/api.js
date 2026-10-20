import axios from "axios";

// One axios instance for the whole app (replaces axios.defaults.baseURL in every file)
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export default api;
