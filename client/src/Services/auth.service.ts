import api from "../lib/api";

export interface AuthUser {
  userId: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  data: AuthUser;
}

export const login = async (
  username: string,
  password: string,
): Promise<void> => {
  await api.post("/auth/super-admin", {
    username,
    password,
  });
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<AuthResponse>("/auth/me");

  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
