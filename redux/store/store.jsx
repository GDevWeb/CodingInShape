import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; 
import userReducer from '../slices/userSlice';
import exerciseReducer from '../slices/exerciseSlice';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer, // Réduit l'état lié à l'authentification de l'utilisateur
    users: userReducer, // Réduit l'état lié aux données des utilisateurs
    exercise: exerciseReducer, // Réduit l'état lié aux exercices (liste des exercices)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(thunkMiddleware),
});

export default store;
