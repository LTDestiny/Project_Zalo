export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  EMOTION = 'EMOTION',
  SYSTEM = 'SYSTEM',
}

export enum MessageStatus {
  SENDING = 'SENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export interface Message {
  messageId: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  metadata?: Record<string, string>;
  timestamp: number;
  status: MessageStatus;
  readBy: string[];
  replyToMessageId?: string;
}

export interface Conversation {
  conversationId: string;
  type: 'DIRECT' | 'GROUP';
  participantIds: string[];
  lastMessageId?: string;
  lastMessagePreview?: string;
  lastMessageTime?: number;
  unreadCounts: Record<string, number>;
  createdAt: number;
  updatedAt: number;
}

export interface SendMessageRequest {
  conversationId: string;
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  replyToMessageId?: string;
}
