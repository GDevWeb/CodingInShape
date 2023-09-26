import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { USER_PROFIL } from "../API/apiUser";
import Spinner from "../../assets/icons/spinner.svg";
import CircleUser from '../../assets/icons/CircleUser.svg'

export default function UserProfile() {
  // État local :
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
          setUser(data.userData);

          // Mise à jour de l'état local isAdmin
          setIsAdmin(data.userData.isAdmin);
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
      {user ? (
        <div>
          <p>Nom : {user.lastName}</p>
          <p>Prénom : {user.firstName}</p>
          <p>Sexe : {user.sex}</p>
          <p>Age : {user.age} ans</p>
          <img src={ user.avatar || CircleUser} alt={user.lastName} width={"150px"} className="avatar"/>
          <p>Pseudo : {user.pseudo}</p>
          <p>Email : {user.email}</p>
          <p>Date de création du compte : {format(new Date(user.createdAt),  'dd/MM/yyyy')}</p>
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
