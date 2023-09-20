import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import apiMiddleware from '../MiddleWare/apiMiddleWare'; // Assurez-vous d'importer correctement le middleware

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export default store;
