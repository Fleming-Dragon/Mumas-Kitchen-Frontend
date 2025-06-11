// src/services/api.service.js
import axios, { AxiosInstance } from "axios";

// Use environment variable or fallback to localhost
const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
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

// Define interface for user data
interface UserData {
  email: string;
  password: string;
  name?: string;
}

// Define interface for login credentials
interface Credentials {
  email: string;
  password: string;
}

// Define interface for payment data
interface PaymentData {
  amount: number;
  method: string;
  orderId?: string;
}

// Auth services
export const authService = {
  register: (userData: UserData) => apiClient.post("/auth/register", userData),
  login: (credentials: Credentials) => apiClient.post("/auth/login", credentials),
  getProfile: () => apiClient.get("/auth/me"),
};

// User services
export const userService = {
  getUserProfile: () => apiClient.get("/users/profile"),
};

// Payment services
export const paymentService = {
  createPayment: (paymentData: PaymentData) => apiClient.post("/payments", paymentData),
  getPaymentHistory: () => apiClient.get("/payments"),
};

export default apiClient;