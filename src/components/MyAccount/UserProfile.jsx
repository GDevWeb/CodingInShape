import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { USER_PROFIL } from "../API/apiUser";
import Spinner from "../../assets/icons/spinner.svg";
import CircleUser from '../../assets/icons/CircleUser.svg'

export default function UserProfile() {
  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Redirection :
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
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
          
        } else {
          console.log("Impossible de récupérer le profil utilisateur.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur :",
          error
        );
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, navigate, token]);

  return (
    <div className="user-profile">
      <h2>Mon profil</h2>
      {userData ? (
        <div>
          <p>Nom : {userData.lastName}</p>
          <p>Prénom : {userData.firstName}</p>
          <p>Sexe : {userData.sex}</p>
          <p>Age : {userData.age} ans</p>
          <img src={ userData.avatar || CircleUser} alt={userData.lastName} width={"150px"} className="avatar"/>
          <p>Pseudo : {userData.pseudo}</p>
          <p>Email : {userData.email}</p>
          <p>Date de création du compte le : {format(new Date(userData.createdAt),  'dd/MM/yyyy')}</p>
          <p>Admin : {isAdmin ? "Oui" : "Non"}</p>
        </div>
      ) : (
        <>
          <p>Chargement du profil en cours...</p>
          <img src={Spinner} alt="" />
        </>
      )}
    </div>
  );
}
