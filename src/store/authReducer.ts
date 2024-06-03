import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    isAdmin:boolean;
  }
  
  // Define the initial state using that type
  const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
    isAdmin: false
  };


  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setTokens: (
        state,
        action: PayloadAction<{ accessToken: string; refreshToken: string; isAuthenticated: boolean; isAdmin: boolean}>
      ) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isAdmin = action.payload.isAdmin;
      },
      resetTokens: (state) => {
        state.accessToken = "";
        state.refreshToken = "";
        state.isAuthenticated = false;
        state.isAdmin = false;
      },
    },
  });
  
  export const { setTokens, resetTokens } = authSlice.actions;
    
  export default authSlice.reducer;
  
  