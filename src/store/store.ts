import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./authReducer";
import userReducer from "./userSlice"; // Assuming this is the file containing your userSlice reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Include the user reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
