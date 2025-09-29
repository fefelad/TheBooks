import axios from "axios";
import type {
  AuthResponse,
  LoginData,
  RegisterData,
} from "../shared/type/auth.types";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data?.message || "Request failed");
    } else if (error.request) {
      throw new Error("Network error: Unable to connect to server");
    } else {
      throw new Error("Request configuration error");
    }
  }
);

export const authApi = {
  async testConnect() {
    const response = await apiClient.get("/test");
    return response.data;
  },

  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/login", credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const backendData = {
      name: userData.username,
      email: userData.email,
      password: userData.password,
    };

    console.log("📨 Отправляем на бэкенд:", backendData);
    const response = await apiClient.post<AuthResponse>(
      "/register",
      backendData
    );

    // console.log(" COMPLETE RESPONSE:", response);
    // console.log(" RESPONSE DATA:", response.data);
    // console.log(" RESPONSE DATA TYPE:", typeof response.data);
    return response.data;
  },
};
