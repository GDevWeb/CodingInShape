import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../../redux/Slices/authSlice';

export default function LoginButton() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = () => {
    // Dispatch de l'action de connexion
    dispatch(loginSuccess({ username: 'user', password: 'password' }));
  };

  const handleLogout = () => {
    // Dispatch de l'action de déconnexion
    dispatch(logoutSuccess());
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>RTK Déconnexion</button>
      ) : (
        <button onClick={handleLogin}>RTK Connexion</button>
      )}
    </div>
  );
}
