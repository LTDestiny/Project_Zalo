import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import groupReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
