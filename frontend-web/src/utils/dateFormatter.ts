/**
 * Utility functions for formatting dates and timestamps
 */

/**
 * Format date to Vietnamese locale
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time based on how recent it is
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return date.toLocaleDateString("vi-VN", {
      month: "short",
      day: "numeric",
    });
  }
};

/**
 * Format "last seen" relative time
 */
export const formatLastSeen = (dateString?: string): string => {
  if (!dateString) return "Không rõ";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return formatDate(dateString);
};

/**
 * Format timestamp for chat messages
 */
export const formatChatTimestamp = (timestamp: string | number): string => {
  if (timestamp === "Mới") return timestamp as string;

  const date =
    typeof timestamp === "string" ? new Date(timestamp) : new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    return "Vừa xong";
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInHours < 168) {
    // Less than 7 days
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
    });
  } else {
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "short",
    });
  }
};

/**
 * Get relative time string (e.g., "2 minutes ago")
 */
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;

  const date = new Date(timestamp);
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
