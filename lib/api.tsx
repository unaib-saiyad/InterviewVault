import axios from "axios";
import { ApiError } from "@/types/apiTypes";
import { dispatchToast } from "@/components/ui/GlobalToastHandler";

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
        dispatchToast({
          type: 'warning',
          title: 'Session expired',
          message: 'Your session has expired. Please log in again.',
        });
        window.location.href = '/auth/login?sessionExpired=true';
      }
    }

    // Show error toast for API errors (skip 401 handled above)
    if (error.response?.status !== 401) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 500) {
        dispatchToast({
          type: 'error',
          title: 'Server error',
          message: 'An unexpected server error occurred. Please try again later.',
        });
      } else if (status === 403) {
        dispatchToast({
          type: 'error',
          title: 'Access denied',
          message: message,
        });
      } else if (status === 404) {
        dispatchToast({
          type: 'warning',
          title: 'Not found',
          message: message,
        });
      } else if (status === 400) {
        dispatchToast({
          type: 'warning',
          title: 'Invalid request',
          message: message,
        });
      } else if (error.code === 'ERR_NETWORK') {
        dispatchToast({
          type: 'error',
          title: 'Network error',
          message: 'Unable to connect to the server. Please check your internet connection.',
        });
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
