import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; 
import userReducer from '../slices/userSlice';
import exerciseReducer from '../slices/exerciseSlice';
// import { thunkMiddleware } from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    users: userReducer, 
    exercise : exerciseReducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare();
  }
  
});

export default store;
