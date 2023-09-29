import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; 
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    users: userReducer, 
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare();
  }
  
});

export default store;
