import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../redux/slices/authSlice";

const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdminUser = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate("/login");
      } else {

        // Mise à jour du statut admin :
        dispatch(isAdmin((isAdmin) => isAdmin));
      }
    };

    checkAuth();
  }, [isAuthenticated, navigate, dispatch]);

  return { isAuthenticated, isAdminUser };
};

export default useAuth;
