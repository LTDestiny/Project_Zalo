import { apiClient } from '../axiosConfig';
import { Group, CreateGroupRequest } from '@/types/group.types';

export const groupApi = {
  createGroup: async (data: CreateGroupRequest): Promise<Group> => {
    const response = await apiClient.post<Group>('/groups', data);
    return response.data;
  },

  getGroupById: async (id: string): Promise<Group> => {
    const response = await apiClient.get<Group>(`/groups/${id}`);
    return response.data;
  },

  getUserGroups: async (userId: string): Promise<Group[]> => {
    const response = await apiClient.get<Group[]>(`/groups/user/${userId}`);
    return response.data;
  },

  addMember: async (groupId: string, userId: string): Promise<void> => {
    await apiClient.post(`/groups/${groupId}/members`, { userId });
  },

  removeMember: async (groupId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/groups/${groupId}/members/${userId}`);
  },
};
