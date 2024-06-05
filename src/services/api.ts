import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  blocked: boolean;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.append('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Existing endpoints...
    getAllUsers: builder.query<User[], void>({
      query: () => 'user/all',
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUserStatus: builder.mutation<User, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body: { blocked },
      }),
    }),
    loginUser: builder.mutation<{ accessToken: string; user: User }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: 'user/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation<User, { name: string; phoneNumber: string; password: string }>({
      query: ({ name, phoneNumber, password }) => ({
        url: 'user/register',
        method: 'POST',
        body: { name, phoneNumber, password },
      }),
    }),
    registerUserWithResetLink: builder.mutation<User, { email: string; }>({
      query: ({ email}) => ({
        url: 'user/register-with-link',
        method: 'POST',
        body: { email },
      }),
    }),
    updateUser: builder.mutation<User, {name: string; email: string; phoneNumber: string; password: string }>({
      query: ({name, email, phoneNumber, password }) => ({
        url: `user/email/${email}`,
        method: 'PUT',
        body: { name, phoneNumber, password },
      }),
    }),
    
  }),
});

// Export hooks for accessing the endpoints
export const { 
  useGetAllUsersQuery, 
  useDeleteUserMutation, 
  useUpdateUserStatusMutation, 
  useLoginUserMutation,
  useRegisterUserWithResetLinkMutation,
  useRegisterUserMutation,
  useUpdateUserMutation // Add this line to export the update user mutation hook
} = userApi;