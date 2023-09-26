import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import UserProfile from "./UserProfile";
import { USER_PROFIL } from "../API/apiUser";
import Card from "../Card/Card";
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
  const userId = useSelector((state) => state.auth.userData?.id); // chainage optionnel apportant une ptite touche de sécurité


  // Redirection :
  const navigate = useNavigate();

  // toggle :
  const [showUserProfile, setShowUserProfile] = useState(true);

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
            <h1>Bienvenue sur votre espace personnel {userData.pseudo}</h1>
            <button onClick={() => setShowUserProfile(!showUserProfile)}>
              {showUserProfile ? "Cacher mon profil" : "Afficher mon profil"}
            </button>
            {showUserProfile && <UserProfile userData={userData} />}
          </div>
        )}

        {/* Mise à jour du profil */}
        <Card
          title={"Modifier mes informations"}
          content={
            "Modifier mes informations , mail, mot de passe, questions / réponse secrète, image de profil"
          }
          link={`/update-profile/${userId}`}
          textLink={"Modifier mes informations"}
          // userData={userData}
        />

        {/* Affichage des exercices */}
        <Card
          title={"Exercices"}
          content={"Accéder à la liste des différents exercices disponibles"}
          link={`/exercises`}
          textLink={"Accéder au contenu exercices"}
          // userData={userData}
        />

        {/* Section paramètres de l'utilisateur */}
        <Card
          title={"Mes paramètres"}
          content={"Accéder à la gestion de vos paramètres"}
          link={`/update-settings/${userId}`}
          textLink={"Accéder à mes paramètres"}
          // userData={userData}
        />

        {/* Section historique de l'utilisateur */}
        <Card
          title={"Mon historique"}
          content={"Accéder à votre historique d'exercices"}
          link={`/user-history/${userId}`}
          textLink={"Accéder à mon historique"}
          // userData={userData}
        />

        {/* Si admin lien vers dashboard : */}
        {isAdminLoaded && isAdmin && (
          <Card
            title={"Accéder au dashboard"}
            content={`Bienvenue administrateur ${userData.pseudo} accéder au accéder au dashboard`}
            link={`/dashboard`}
            textLink={"Accéder au dashboard"}
            // userData={userData}
          />
        )}
      </div>
    </>
  );
}
