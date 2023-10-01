import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/slices/authSlice";

const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin); 
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        // Dispatch l'action loginSuccess pour indiquer que l'utilisateur est connecté
        dispatch(loginSuccess());      }
    };

    checkAuth();
  }, [isAuthenticated, navigate, dispatch]); 
  
  return { isAuthenticated, isAdmin };
};

export default useAuth;
