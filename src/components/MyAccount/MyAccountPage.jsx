import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LogoutButton from "../LogButton/LogButton";
import UpdateProfile from "./UpdateProfile";
import UserHistory from "./UserHistory";
import UserProfile from "./UserProfile";
import UserSettings from "./UserSettings";
import { USER_PROFIL } from "../API/apiUser";
import Spinner from "../../assets/icons/spinner.svg";

export default function MyAccountPage() {
  // État local :
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoaded, setAdminLoaded] = useState(false);

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  // Redirection :
  const navigate = useNavigate();

  // toggle :
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showUserHistory, setShowUserHistory] = useState(false);

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
          setUserData(data.userData);
          setIsLoading(false);
          setAdminLoaded(true);

          // Mise à jour de l'état local isAdmin
          setIsAdmin(data.userData.isAdmin);
          console.log(data.userData.isAdmin);
        } else {
          console.error(
            "Impossible de récupérer les données de l'utilisateur."
          );
          setIsLoading(false);
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, isAuthenticated, token]);

  return (
    <>
      <div className="my-account-page">
        {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
        {/* Affichage des données de l'utilisateur connecté */}
        {userData && (
          <div className="user-profile-section">
            <h1>Bienvenue sur votre espace personnel {userData.firstName}</h1>
            <button onClick={() => setShowUserProfile(!showUserProfile)}>
              {showUserProfile ? "Cacher mon profil" : "Afficher mon profil"}
            </button>
            {showUserProfile && <UserProfile userData={userData} />}
          </div>
        )}

        {/* Mise à jour du profil */}
        <h2>Modifier mes informations</h2>
        <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
          {showUpdateForm
            ? "Cacher le formulaire de mise à jour du profil"
            : "Afficher le formulaire de mise à jour du profil"}
        </button>
        {userData && (
          <div className="update-email-section">
            {showUpdateForm && <UpdateProfile userData={userData} />}
          </div>
        )}

        {/* Affichage des exercices */}
        {userData && (
          <div className="user-exercises-section">
            <h2>Mes exercices</h2>
            {/* button link  */}
            <Link to="/exercises" className="linkTo">
              Voir la liste des exercices
            </Link>
          </div>
        )}

        {/* Section paramètres de l'utilisateur */}
        {userData && (
          <div className="user-settings-section">
            <h2>Paramètres</h2>
            <button onClick={() => setShowUserSettings(!showUserSettings)}>
              {showUserSettings
                ? "Cacher les paramètres"
                : "Afficher les paramètres"}
            </button>
            {showUserSettings && <UserSettings userData={userData} />}
          </div>
        )}

        {/* Section historique de l'utilisateur */}
        {userData && (
          <div className="user-history-section">
            <h2>Historique</h2>
            <button onClick={() => setShowUserHistory(!showUserHistory)}>
              {showUserHistory
                ? "Cacher l'historique"
                : "Afficher l'historique"}
            </button>
            {showUserHistory && <UserHistory userData={userData} />}
          </div>
        )}

        {/* Si utilisateur = admin button ves dashboard : */}
        {isAdminLoaded && isAdmin && (
          <button onClick={() => navigate("/dashboard")}>
            Espace administrateur
          </button>
        )}

        {/* Bouton de déconnexion */}
        <LogoutButton />
      </div>
    </>
  );
}
