import { apiClient } from '../axiosConfig';
import { Message, SendMessageRequest } from '@/types/message.types';

export const messageApi = {
  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    const response = await apiClient.post<Message>('/messages', data);
    return response.data;
  },

  getMessagesByConversation: async (
    conversationId: string,
    limit: number = 50
  ): Promise<Message[]> => {
    const response = await apiClient.get<Message[]>(
      `/messages/conversation/${conversationId}`,
      { params: { limit } }
    );
    return response.data;
  },

  markAsRead: async (messageId: string, conversationId: string): Promise<void> => {
    await apiClient.put(`/messages/${messageId}/read`, { conversationId });
  },
};
