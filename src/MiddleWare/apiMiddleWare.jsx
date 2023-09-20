import axios from 'axios'; // Vous devrez peut-être installer axios si ce n'est pas déjà fait
import { loginSuccess } from '../redux/Slices/authSlice';
import store from '../redux/store';

const apiMiddleware = (store) => (next) => async (action) => {
  if (action.type === loginSuccess.type) {
    // Lorsque l'action loginSuccess est déclenchée, configurez l'en-tête de l'API avec le token
    const token = action.payload;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return next(action);
};

export default apiMiddleware;
