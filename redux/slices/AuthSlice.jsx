import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignUp: false,
    isAuthenticated: false,
    token: null,
    errorMessage: "",
    isAdmin: true,
    userData : null,
  },
  reducers: {
    startSignUp: (state) => {
      state.isSignUp = true;
    },
    finishSignUp: (state) => {
      state.isSignUp = false;
    },
    login: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.errorMessage = "";
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, {secure : true, sameSite : 'strict'});
      state.isAdmin = action.payload.isAdmin;
      state.errorMessage = "";
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = "";
    },
    updateAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
    setUserData : (state, action) => {
      state.userData = action.payload; 
    }
  },
});

export const { startSignUp, finishSignUp, login, loginSuccess, loginFailure, logout, updateAdminStatus, setUserData } =
  authSlice.actions;
export default authSlice.reducer;

/* 📝 Slice pour l'authentification de user 📝:
📝Authentification de loginForm > récupération de la data de user dans MyAccountPage
*/