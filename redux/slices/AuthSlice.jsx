// Importation des modules nécessaires
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Création du slice Redux pour la gestion de l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignUp: false,
    isAuthenticated: false,
    token: null,
    errorMessage: "",
    isAdmin: true,
    userData: null,
  },
  reducers: {
    // Action pour indiquer le début du processus d'inscription
    startSignUp: (state) => {
      state.isSignUp = true;
    },
    // Action pour indiquer la fin du processus d'inscription
    finishSignUp: (state) => {
      state.isSignUp = false;
    },
    // Action de déconnexion de l'utilisateur
    login: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.isAdmin = false;
      state.errorMessage = "";
    },
    // Action en cas de succès de la connexion
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, { secure: true, sameSite: 'strict' });
      state.isAdmin = action.payload.isAdmin;
      state.errorMessage = "";
    },
    // Action en cas d'échec de la connexion
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = action.payload;
    },
    // Action de déconnexion de l'utilisateur
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.errorMessage = "";
    },
    // Action pour mettre à jour le statut admin de l'utilisateur
    updateAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
    // Action pour définir les données utilisateur
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Exportation des actions de la tranche Redux
export const {
  startSignUp,
  finishSignUp,
  login,
  loginSuccess,
  loginFailure,
  logout,
  updateAdminStatus,
  setUserData,
} = authSlice.actions;

// Exportation de la réducteur (reducer) de la tranche Redux
export default authSlice.reducer;

/* 📝 Commentaire sur la tranche (slice) pour l'authentification de l'utilisateur 📝:
📝 Cette tranche gère l'authentification de l'utilisateur, y compris les actions de connexion, de déconnexion et la gestion des données utilisateur.
📝 Elle est utilisée pour stocker l'état de l'authentification de l'utilisateur dans l'application. */
