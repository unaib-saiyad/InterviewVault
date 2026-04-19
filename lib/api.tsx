import axios from "axios";

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
    let message = "Something went wrong.";
    if(error.response?.status === 401){
      try{
        const res = await axios.post('/api/auth/refresh-token', { withCredentials: true });
        localStorage.setItem("accessToken", res.data.accessToken);

        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(error.config);
      }
      catch(error){
        localStorage.removeItem("accessToken");
        window.location.href = 'auth/login?sessionExpired=true';
      }
    }
    else if(error.response){
      message = error.response.data.message || message;
    }
    else if(error.request){
      message = "Server not responding. Please try again later.";
    }
    return Promise.reject(message);
  }
);

export default api;