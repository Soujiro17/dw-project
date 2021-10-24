import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
  withCredentials: true,
});

export default axiosInstance;
