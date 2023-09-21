import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../../redux/actions/authActions";

export default function LogButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Feature btn isAdmin :
  // const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleLogout = async () => {
    dispatch(logout(navigate));
  };

  const handleLogin = () => {
    dispatch(login());
    navigate("/login");
  };

  if (isAuthenticated) {
    return <button onClick={handleLogout}>Déconnexion</button>;
  } else {
    return <button onClick={handleLogin}>Connexion</button>;
  }
}
