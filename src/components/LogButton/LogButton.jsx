import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout, startSignUp} from "../../../redux/slices/authSlice";
import icons from "../../assets/icons/index_icons"

export default function LogButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSignUp = useSelector((state) => state.auth.isSignUp);


  const handleLogout = async () => {
    dispatch(logout(navigate("/")));
  };

  const handleLogin = () => {
    // dispatch(loginSuccess());
    navigate("/login");
  };

  const handleSignUp = () => {
    dispatch(startSignUp());
    navigate("/signup");
  };

  const buttonText = isAuthenticated
    ? <img src={icons.Logout} alt="icon déconnexion"  className="logButton"/>
    : isSignUp
    ? "Inscription"
    : <img src={icons.Login} alt="icon connexion" width={"48px"} className="logButton"/>;

  const handleClick = isAuthenticated
    ? handleLogout
    : isSignUp
    ? handleSignUp
    : handleLogin;

  return <button onClick={handleClick}>{buttonText}</button>;
}


///hello