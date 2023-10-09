import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_PROFIL } from "../../API/apiUser";
import { format } from "date-fns";
import CircleUser from "../../../assets/icons/circleUser.svg";
export default function UserProfile() {
  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Navigation :
  const navigate = useNavigate();

  // Formatage de la date :
  const formattedDate = userData.createdAt
    ? format(new Date(userData.createdAt), "dd/MM/yyyy")
    : "";

  // Récupération des données de l'utilisateur :
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

        if (!response.ok) {
          console.error("Impossible de récupérer les données de l'utilisateur.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, navigate]);

  return (
    <>
      <div className="user_profile">
        {userData && (
          <>
            <div className="user_detail">
            <p>Nom : {userData.lastName}</p>
            <p>Prénom : {userData.firstName}</p>
            <p>Sexe : {userData.sex}</p>
            <p>Age : {userData.age} ans</p>
            <p>Pseudo : {userData.pseudo}</p>
            <p>Email : {userData.email}</p>
            <p>Date de création du compte : {formattedDate}</p>
            <p>Admin : {isAdmin ? "Oui" : "Non"}</p>
              
            </div>
            <figure>
            <img src={userData.avatar || CircleUser} alt={userData.lastName} className="userProfile-avatar"/>
            </figure>
          </>
        )}
      </div>  
    </>
  );
}
