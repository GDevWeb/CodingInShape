import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";
import UserProfile from "./UserProfile";
import Card from "../Card/Card";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";
import { USER_PROFIL } from "../API/apiUser";
import Spinner from "../../assets/icons/spinner.svg";

export default function MyAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  // Navigation :
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
          setIsLoading(false);
          dispatch(loginSuccess(data));
        } else {
          setIsLoading(false);
          console.log("Impossible de récupérer le profil utilisateur.");

          setTimeout(() => {
            navigate("/notfound");
          }, 3000);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur :",
          error
        );
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, navigate, token, dispatch]);

  return (
    <>
      <div className="my-account-page">
        {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
        {userData && (
          <div className="user-profile-section">
            <h1>Bienvenue sur votre espace {userData?.pseudo}</h1>
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
            "Modifier mes informations, mail, mot de passe, questions / réponse secrète, image de profil"
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
            content={`Bienvenue administrateur ${userData?.pseudo}, accéder au dashboard`}
            link={`/dashboard`}
            textLink={"Accéder au dashboard"}
          />
        )}

        {isAdmin && <ConditionalNavLinks isAdmin={isAdmin} />}
      </div>
    </>
  );
}
