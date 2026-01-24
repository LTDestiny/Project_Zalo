import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Load user from localStorage on init
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
let parsedUser: User | null = null;

if (storedUser) {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem("user");
  }
}

const initialState: AuthState = {
  user: parsedUser,
  token: storedToken,
  isAuthenticated: !!(storedToken && parsedUser),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, clearCredentials, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
