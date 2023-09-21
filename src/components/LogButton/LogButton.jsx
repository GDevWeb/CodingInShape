import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout, startSignUp} from "../../../redux/slices/authSlice";

export default function LogButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSignUp = useSelector((state) => state.auth.isSignUp);

  // Feature btn isAdmin :
  // const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleLogout = async () => {
    dispatch(logout(navigate));
  };

  const handleLogin = () => {
    dispatch(login());
    navigate("/login");
  };

  const handleSignUp = () => {
    // Dispatchez l'action pour commencer l'inscription
    dispatch(startSignUp());
    // Naviguez vers la page d'inscription
    navigate("/signup");
  };

  const buttonText = isAuthenticated
    ? "Déconnexion"
    : isSignUp
    ? "Inscription"
    : "Connexion";

  const handleClick = isAuthenticated
    ? handleLogout
    : isSignUp
    ? handleSignUp
    : handleLogin;

  return <button onClick={handleClick}>{buttonText}</button>;
}
