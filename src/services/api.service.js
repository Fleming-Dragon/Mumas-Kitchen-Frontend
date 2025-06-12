// src/services/api.service.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  getProfile: () => apiClient.get("/auth/me"),
};

// User services
export const userService = {
  getUserProfile: () => apiClient.get("/users/profile"),
};

// Payment services (when you implement them)
export const paymentService = {
  createPayment: (paymentData) => apiClient.post("/payments", paymentData),
  getPaymentHistory: () => apiClient.get("/payments"),
};

export default apiClient;
