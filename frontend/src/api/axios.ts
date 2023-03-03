// Path: stores\api\index.ts
import axios from "axios";

const GazinAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 12000,
});

GazinAPI.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";

  return config;
});

// request interceptor
export default GazinAPI;
