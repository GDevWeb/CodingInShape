import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { USER_PROFIL } from "../API/apiUser";
import Card from "../Card/Card";
import Spinner from "../../assets/icons/spinner.svg";
import { updateAdminStatus, setUserData } from "../../../redux/slices/authSlice";

export default function MyAccountPage() {
  // État local :
  const [isLoading, setIsLoading] = useState(true);

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userData.id);
  const dispatch = useDispatch();

  // Redirection :
  const navigate = useNavigate();

  // Toggle :
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
            Authorization: `Bearer ${userData.token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);

          // Mise à jour de l'état Redux userData avec les nouvelles données
          dispatch(setUserData(data.userData));

          console.log("userId", userId)

          // Mise à jour de l'état Redux isAdmin
          dispatch(updateAdminStatus(data.userData.isAdmin));
        } else {
          console.error("Impossible de récupérer les données de l'utilisateur.");
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
  }, [navigate, isAuthenticated, userData.token, dispatch]);

  return (
    <>
      <div className="my-account-page">
        {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
        {/* Affichage des données de l'utilisateur connecté */}
        {userData && (
          <div className="user-profile-section">
            <h1>
              Bienvenue sur votre espace personnel{" "}
              {isAdmin ? "administrateur" : "utilisateur"} {userData.pseudo}
            </h1>
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
        />

        {/* Affichage des exercices */}
        <Card
          title={"Exercices"}
          content={"Accéder à la liste des différents exercices disponibles"}
          link={`/exercises`}
          textLink={"Accéder au contenu exercices"}
        />

        {/* Section paramètres de l'utilisateur */}
        <Card
          title={"Mes paramètres"}
          content={"Accéder à la gestion de vos paramètres"}
          link={`/update-settings/${userId}`}
          textLink={"Accéder à mes paramètres"}
        />

        {/* Section historique de l'utilisateur */}
        <Card
          title={"Mon historique"}
          content={"Accéder à votre historique d'exercices"}
          link={`/user-history/${userId}`}
          textLink={"Accéder à mon historique"}
        />

        {/* Si admin, lien vers dashboard : */}
        {isAdmin && (
          <Card
            title={"Accéder au dashboard"}
            content={`Bienvenue administrateur ${userData?.pseudo} accéder au accéder au dashboard`}
            link={`/dashboard`}
            textLink={"Accéder au dashboard"}
          />
        )}
      </div>
    </>
  );
}