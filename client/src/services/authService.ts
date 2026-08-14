import apiClient from "../api/client";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: UserProfile;
}

export const authService = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },  

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  getGoogleAuthUrl: (): string => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/auth/google`;
  },
};
