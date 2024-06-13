import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./authReducer";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice"
import { userApi } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currentUser: currentUserReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer, // Add userApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
