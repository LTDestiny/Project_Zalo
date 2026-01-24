/**
 * Chat-related types that are shared across components
 */

export interface ChatItem {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isFriend: boolean;
}

export enum ChatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}
