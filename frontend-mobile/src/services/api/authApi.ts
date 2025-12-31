import { apiClient } from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: any;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  },
};
