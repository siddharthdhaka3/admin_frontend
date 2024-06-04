import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUserStatus: (state, action: PayloadAction<{ userId: string; blocked: boolean }>) => {
      const { userId, blocked } = action.payload;
      state.users = state.users.map(user =>
        user._id === userId ? { ...user, blocked: blocked } : user
      );
    },
    // Add other user-related actions here
  },
});

export const { addUser, updateUserStatus } = userSlice.actions;

export default userSlice.reducer;
