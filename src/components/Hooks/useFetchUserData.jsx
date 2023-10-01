import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData, updateAdminStatus } from "../../../redux/slices/AuthSlice"; 
import { USER_PROFIL } from "../API/apiUser";

const useFetchUserData = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USER_PROFIL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          // Mise à jour de l'état Redux des données utilisateur
          dispatch(setUserData(data.userData));

          // Mise à jour de l'état Redux isAdmin
          dispatch(updateAdminStatus(data.userData.isAdmin));
        } else {
          console.error("Impossible de récupérer les données de l'utilisateur.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, [navigate, isAuthenticated, token, dispatch]);
};

export default useFetchUserData;


//pour éviter la duplication de mon fetch userDatas dans mes composants, je vais créer un custom hook