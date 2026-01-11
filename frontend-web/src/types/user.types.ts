export enum UserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  AWAY = "AWAY",
  DO_NOT_DISTURB = "DO_NOT_DISTURB",
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  lastSeen?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
