import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout, startSignUp} from "../../../redux/slices/authSlice";

export default function LogButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSignUp = useSelector((state) => state.auth.isSignUp);

  // Feature btn isAdmin :
  // const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleLogout = async () => {
    dispatch(logout(navigate("/")));
  };

  const handleLogin = () => {
    dispatch(loginSuccess());
    navigate("/login");
  };

  const handleSignUp = () => {
    dispatch(startSignUp());
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
