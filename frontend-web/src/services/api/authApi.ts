import { apiClient } from '../axiosConfig';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/user.types';

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', data);
    return response.data;
  },

  resendVerification: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification');
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<TokenRefreshResponse> => {
    const response = await apiClient.post<TokenRefreshResponse>('/auth/refresh-token', data);
    return response.data;
  },
};
