import axios from "axios";
import { ApiError } from "@/types/apiTypes";

const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error)=>{
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      try{
        const res = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });
        localStorage.setItem("accessToken", res.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(originalRequest);
      }
      catch(error){
        localStorage.removeItem("accessToken");
        window.location.href = 'auth/login?sessionExpired=true';
      }
    }
    const formatedError: ApiError = {
      status: error.response?.status,
      code: error.response?.data?.code,
      message: error.response?.data?.message || "Something went wrong",
    };
    return Promise.reject(formatedError);
  }
);

export default api;