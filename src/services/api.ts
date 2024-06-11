import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { jwtDecode } from 'jwt-decode';
import { setTokens } from '../store/authReducer';
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  blocked: boolean;
}

const refreshTokenIfNeeded = async (dispatch: any, getState: any) => {
  const state = getState() as RootState;
  const accessToken = (getState() as RootState).auth.accessToken;
  const refreshToken = (getState() as RootState).auth.refreshToken;

  if (!accessToken || !refreshToken) {
    return;
  }

  // Check if access token is expired
  const decodedToken:any = jwtDecode(accessToken) as { exp?: number };; // Assuming jwt is imported
  const tokenExpiry = decodedToken.exp * 1000; // Expiry time in milliseconds

  if (!tokenExpiry || Date.now() >= tokenExpiry) {
    // Access token is expired, refresh it
    console.log("exp");
    
    try {
      const { data } = await dispatch(userApi.endpoints.refreshTokens.initiate({ refreshToken }));
      
      if (data) {
        const decodedToken2:any = jwtDecode(data.accessToken) as { exp?: number };; // Assuming jwt is imported
        const tokenExpiry2 = decodedToken2.exp * 1000; // Expiry time in milliseconds
        dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, isAdmin:data.user.isAdmin, isAuthenticated:true, tokenExpiry:tokenExpiry2}));
      }
    } catch (error) {
      // Handle error if refresh token request fails
      console.error('Failed to refresh tokens:', error);
    }
  }
};


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      const refreshToken = (getState() as RootState).auth.refreshToken;
      if (accessToken) {
        headers.append('Authorization', `Bearer ${accessToken}`);
      }
      // if(refreshToken){
      //   headers.append('Authorization', `RefreshToken ${refreshToken}`)
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Existing endpoints...
    getAllUsers: builder.query<User[], void>({
      query: () => 'user/all',
      async onQueryStarted(arg, { dispatch, getState }) {
        await refreshTokenIfNeeded(dispatch, getState);
      },  
    
    
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

      async onQueryStarted(arg, { dispatch, getState }) {
        await refreshTokenIfNeeded(dispatch, getState);
      },

    }),
    loginUser: builder.mutation<{ accessToken: string; refreshToken:string; accessTokenExpiry:number; user: User }, { email: string; password: string }>({
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
      async onQueryStarted(arg, { dispatch, getState }) {
        await refreshTokenIfNeeded(dispatch, getState);
      },
    }),
    registerUserWithResetLink: builder.mutation<User, { email: string; }>({
      query: ({ email}) => ({
        url: 'user/register-with-link',
        method: 'POST',
        body: { email },
      }),
      async onQueryStarted(arg, { dispatch, getState }) {
        await refreshTokenIfNeeded(dispatch, getState);
      },
    }),
    
    resetPassword: builder.mutation<void, { Password: string }>({
      query: ({ Password }) => ({
        url: 'user/reset-password',
        method: 'POST',
        body: { Password },
      }),
    }),
    updateUser: builder.mutation<void, { name: string; email: string; password: string; phoneNumber: string; token: string }>({ // Add 'token' parameter
      query: ({ name, email, password, phoneNumber, token }) => ({
        url: `user/email/${email}`,
        method: 'PUT',
        body: { name, email, password, phoneNumber, token }
      }),
    }),
    addUserByEmail: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: 'user/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    forgotPassword: builder.mutation<void, { password: string;  token: string }>({ // Add 'token' parameter
      query: ({  password, token }) => ({
        url: `user/link/reset-password`,
        method: 'PUT',
        body: { password, token }
      }),
    }),
    refreshTokens: builder.mutation<{ accessToken: string; refreshToken: string; user:any;}, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: 'user/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
  
});

// Export hooks for accessing the endpoints
export const { 
  useGetAllUsersQuery, 
  useDeleteUserMutation, 
  useLoginUserMutation,
  useRegisterUserWithResetLinkMutation,
  useRegisterUserMutation,
  useResetPasswordMutation, 
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
  useAddUserByEmailMutation,
  useForgotPasswordMutation,
  useRefreshTokensMutation// Add this line to export the update user mutation hook
} = userApi;