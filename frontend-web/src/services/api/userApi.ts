import { apiClient } from "../axiosConfig";
import { User, UserStatus } from "@/types/user.types";

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
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },

  searchUsers: async (query: string): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/search", {
      params: { query },
    });
    return response.data;
  },

  getOnlineUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/online");
    return response.data;
  },

  updateProfile: async (
    id: string,
    data: {
      username?: string;
      email?: string;
      phoneNumber?: string;
      avatarUrl?: string;
    },
  ): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}/profile`, data);
    return response.data;
  },

  updateStatus: async (id: string, status: UserStatus): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}/status`, {
      status,
    });
    return response.data;
  },

  getFriends: async (userId: string): Promise<User[]> => {
    const response = await apiClient.get<User[]>(`/users/friends/${userId}`);
    return response.data;
  },

  checkFriendship: async (
    userId1: string,
    userId2: string,
  ): Promise<boolean> => {
    const response = await apiClient.get<boolean>(
      `/users/check-friendship/${userId1}/${userId2}`,
    );
    return response.data;
  },
};
