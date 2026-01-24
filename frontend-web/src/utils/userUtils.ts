/**
 * Utility functions for user-related operations
 */

import { UserStatus } from "@/types/user.types";

/**
 * Get status color class based on user status
 */
export const getStatusColor = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ONLINE:
      return "bg-green-500";
    case UserStatus.OFFLINE:
      return "bg-gray-500";
    case UserStatus.AWAY:
      return "bg-yellow-500";
    case UserStatus.DO_NOT_DISTURB:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

/**
 * Get status text in Vietnamese
 */
export const getStatusText = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ONLINE:
      return "Đang hoạt động";
    case UserStatus.OFFLINE:
      return "Không hoạt động";
    case UserStatus.AWAY:
      return "Vắng mặt";
    case UserStatus.DO_NOT_DISTURB:
      return "Không làm phiền";
    default:
      return "Không rõ";
  }
};

/**
 * Get user initials for avatar placeholder
 */
export const getUserInitials = (name: string): string => {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  // Get first letter of first and last word
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Get display name from user object
 */
export const getDisplayName = (user: {
  displayName?: string;
  username: string;
}): string => {
  return user.displayName || user.username;
};

/**
 * Check if user is online
 */
export const isUserOnline = (status: UserStatus): boolean => {
  return status === UserStatus.ONLINE;
};
