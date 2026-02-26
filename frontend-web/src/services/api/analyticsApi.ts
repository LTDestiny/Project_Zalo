import {
  AnalyticsDashboard,
  MessageAnalytics,
  UserAnalytics,
  GroupAnalytics,
  CallAnalytics,
  AnalyticsFilter,
} from '../../types/analytics.types';
import { apiClient } from '../axiosConfig';

const API_BASE_URL = '/analytics';

export const analyticsApi = {
  // Dashboard
  getDashboard: async (filter: AnalyticsFilter): Promise<AnalyticsDashboard> => {
    const response = await apiClient.get(`${API_BASE_URL}/dashboard`, { params: filter });
    return response.data;
  },

  // Message Analytics
  getMessageAnalytics: async (filter: AnalyticsFilter): Promise<MessageAnalytics> => {
    const response = await apiClient.get(`${API_BASE_URL}/messages`, { params: filter });
    return response.data;
  },

  // User Analytics
  getUserAnalytics: async (filter: AnalyticsFilter): Promise<UserAnalytics> => {
    const response = await apiClient.get(`${API_BASE_URL}/users`, { params: filter });
    return response.data;
  },

  // Group Analytics
  getGroupAnalytics: async (filter: AnalyticsFilter): Promise<GroupAnalytics> => {
    const response = await apiClient.get(`${API_BASE_URL}/groups`, { params: filter });
    return response.data;
  },

  // Call Analytics
  getCallAnalytics: async (filter: AnalyticsFilter): Promise<CallAnalytics> => {
    const response = await apiClient.get(`${API_BASE_URL}/calls`, { params: filter });
    return response.data;
  },

  // Export data
  exportAnalytics: async (section: string, format: 'csv' | 'pdf', filter: AnalyticsFilter): Promise<Blob> => {
    const response = await apiClient.get(`${API_BASE_URL}/export/${section}`, {
      params: { ...filter, format },
      responseType: 'blob',
    });
    return response.data;
  },
};
