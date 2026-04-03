import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "https://urbo-backend.vercel.app/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    // Since AuthContext doesn't specifically store just the token right now,
    // assuming it either stores `{ token, ...user }` or we'll update it to do so.
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally if needed
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Optionally handle generic 401 Unauthorized globally here
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('auth-user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
