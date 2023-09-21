// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    errorMessage: '',
    isAdmin: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.errorMessage = '';
      console.log(`login from AuthSlice`);
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.errorMessage = '';
      console.log(`loginSuccess from AuthSlice`);
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = action.payload;
      console.log(`loginFailure from AuthSlice`);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = '';
      console.log(`logout from AuthSlice`);
    },
    updateAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
      console.log('New isAdmin value in reducer:', action.payload);
    },
  },
});

export const { login, loginSuccess, loginFailure, logout, updateAdminStatus } = authSlice.actions;
export default authSlice.reducer;
