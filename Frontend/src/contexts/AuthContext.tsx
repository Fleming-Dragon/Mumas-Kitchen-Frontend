import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/api.service";

// Define user type
interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

// Define registration data type
interface RegisterUserData {
  email: string;
  password: string;
  name?: string;
  // Add other registration fields as needed
}

// Define login credentials type
interface LoginCredentials {
  email: string;
  password: string;
}

// Define API response types
interface AuthResponse {
  data: {
    token: string;
    // Add other response properties as needed
  };
}

interface ProfileResponse {
  data: {
    data: User;
    // Add other response properties as needed
  };
}

// Define types for the context values
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: RegisterUserData) => Promise<AuthResponse>;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define prop types for the provider
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear any stored tokens when the app loads/refreshes
    localStorage.removeItem("token");
    setCurrentUser(null);
    setLoading(false);

    // No need to check for user or load profile since we want
    // to require sign-in every time the app runs
  }, []);

  const register = async (
    userData: RegisterUserData
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      const response = (await authService.register(userData)) as AuthResponse;
      localStorage.setItem("token", response.data.token);

      // Get user profile after registration
      const userResponse = (await authService.getProfile()) as ProfileResponse;
      setCurrentUser(userResponse.data.data);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      const response = (await authService.login(credentials)) as AuthResponse;
      localStorage.setItem("token", response.data.token);

      // Get user profile after login
      const userResponse = (await authService.getProfile()) as ProfileResponse;
      setCurrentUser(userResponse.data.data);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
