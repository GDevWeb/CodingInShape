import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { USER_LOGIN, USER_PROFIL } from "../../src/components/API/apiUser"; // Importez vos constantes d'API ici

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignUp: false,
    isAuthenticated: false,
    token: Cookies.get("token") || null, 
    errorMessage: "",
    userId: null,
    isAdmin: false, 
    userData: null,
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
      Cookies.set("token", action.payload.token, { secure: true, sameSite: "strict" });

      // Utilisez le même token pour la deuxième requête
      fetch(USER_PROFIL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${action.payload.token}`, // Utilisez le token ici
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          state.userData = userData;
          state.userId = userData._id;
          state.isAdmin = userData.isAdmin;
          state.errorMessage = "";
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
          // Gérez les erreurs ici
        });
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
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { startSignUp, finishSignUp, login, loginSuccess, loginFailure, logout, updateAdminStatus, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
