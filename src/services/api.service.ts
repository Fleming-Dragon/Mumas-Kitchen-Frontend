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
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

// Define interface for login credentials
interface Credentials {
  identifier: string; // Can be email or username
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
  getProfile: () => apiClient.get("/auth/profile"),
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

// Daily Menu services
export const dailyMenuService = {
  getAllMenus: (params?: URLSearchParams) => 
    apiClient.get(`/daily-menu${params ? `?${params.toString()}` : ""}`),
  getMenuById: (id: string) => apiClient.get(`/daily-menu/${id}`),
  createMenu: (menuData: any) => apiClient.post("/daily-menu", menuData),
  updateMenu: (id: string, menuData: any) => apiClient.put(`/daily-menu/${id}`, menuData),
  deleteMenu: (id: string) => apiClient.delete(`/daily-menu/${id}`),
  updateMenuStatus: (id: string, status: string) => 
    apiClient.patch(`/daily-menu/${id}/status`, { status }),
  getAvailableMenus: () => apiClient.get("/daily-menu/available"),
};

// Public meals service (no authentication required)
export const publicMealsService = {
  getTodaysMeals: () => apiClient.get("/public/today-meals"),
  getMealCategories: () => apiClient.get("/public/meal-categories"),
};

export default apiClient;