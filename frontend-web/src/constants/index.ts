/**
 * Application constants
 */

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  USER: {
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
    STATUS: "/users/status",
    FRIENDS: "/users/friends",
    ONLINE: "/users/online",
  },
  MESSAGE: {
    SEND: "/messages/send",
    CONVERSATION: "/messages/conversation",
    MARK_READ: "/messages/mark-read",
  },
  GROUP: {
    CREATE: "/groups/create",
    LIST: "/groups/list",
    MEMBERS: "/groups/members",
    UPDATE: "/groups/update",
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

// Refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  USER_LIST: 30000, // 30 seconds
  MESSAGES: 5000, // 5 seconds
  STATUS: 60000, // 1 minute
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MESSAGE_PAGE_SIZE: 50,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

// UI
export const UI = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 500,
  ANIMATION_DURATION: 300,
} as const;
