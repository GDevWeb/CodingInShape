import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "./UserProfile";
import Card from "../Card/Card";
import Spinner from "../../assets/icons/spinner.svg";

export default function MyAccountPage() {
  const [showUserProfile, setShowUserProfile] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isLoading = !userData;
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userData?.id);

  // Refacto de la fonction fetchData() : 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        dispatch(isAdmin((isAdmin) => isAdmin));
    
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin, navigate, dispatch]);

  return (
    <>
      <div className="my-account-page">
        {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
        {userData && (
          <div className="user-profile-section">
            <h1>Bienvenue sur votre espace personnel {userData?.pseudo}</h1>
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