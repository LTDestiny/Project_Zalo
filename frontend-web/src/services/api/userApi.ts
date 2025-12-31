import { apiClient } from '../axiosConfig';
import { User, UserStatus } from '@/types/user.types';

export const userApi = {
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/username/${username}`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  updateProfile: async (
    id: string,
    phoneNumber?: string,
    avatarUrl?: string
  ): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}/profile`, null, {
      params: { phoneNumber, avatarUrl },
    });
    return response.data;
  },

  updateStatus: async (id: string, status: UserStatus): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}/status`, { status });
    return response.data;
  },
};
