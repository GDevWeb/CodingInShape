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
      console.log(`login from AuthSlice`);
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, {secure : true, sameSite : 'strict'});
      console.log(action.payload.token)
      state.isAdmin = action.payload.isAdmin;
      state.errorMessage = "";
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
      state.errorMessage = "";
      console.log(`logout from AuthSlice`);
    },
    updateAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
      console.log("New isAdmin value in reducer:", action.payload);
    },
    setUserData : (state, action) => {
      state.userData = action.payload; 
      console.log("SetUSerData value :", action.payload)
    }
  },
});

export const { startSignUp, finishSignUp, login, loginSuccess, loginFailure, logout, updateAdminStatus, setUserData } =
  authSlice.actions;
export default authSlice.reducer;