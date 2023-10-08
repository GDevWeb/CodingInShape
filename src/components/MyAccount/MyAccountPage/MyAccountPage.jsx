import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import { USER_PROFIL } from "../../API/apiUser";
import Card from "../../Card/Card";
import index_icons from "../../../assets/icons/index_icons";
import Spinner from "../../../assets/icons/spinner.svg";
import {
  updateAdminStatus,
  setUserData,
} from "../../../../redux/slices/authSlice";
import ConditionalNavLinks from "../../ConditionalNavLinks/ConditionalNavLinks";
import "./MyAccountPage.scss"

export default function MyAccountPage() {
  // Redux :
  const token = useSelector((state) => state.auth.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userData?.id);
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
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          // Mise à jour de l'état Redux userData avec les nouvelles données
          dispatch(setUserData(data.userData));

          // Mise à jour de l'état Redux isAdmin
          dispatch(updateAdminStatus(data.userData.isAdmin));
        } else {
          console.error(
            "Impossible de récupérer les données de l'utilisateur."
          );

          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    };

    fetchUserData();
  }, [token, isAuthenticated, dispatch, navigate, userId]);

  return (
    <>
      <div className="myAccountPage_container">
        {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
        {/* Affichage des données de l'utilisateur connecté */}
        {userData && (
          <div className="user-profile-section">
            <p className="welcome_user">
              Bienvenue sur votre espace personnel{" "}
              <p>{isAdmin ? "administrateur" : "utilisateur"} {userData.pseudo}</p>
            </p>
            <div className="user_profile_identity">
            {showUserProfile && <UserProfile userData={userData} />}
            <div className="container_btn_avatar">
            <button  onClick={() => setShowUserProfile(!showUserProfile)} className="btn_avatar">
              {showUserProfile ? "Cacher mon profil" : "Afficher mon profil"}
            </button>
            </div>
          </div>
            </div>
        )}

          <div className="container_render card">

        {/* Mise à jour du profil */}
        <Card
          icon={index_icons.CircleInfo}
          title={"Modifier mes informations"}
          content={
            "Modifier mes informations , mail, mot de passe, questions / réponse secrète, image de profil"
          }
          link={`/update-profile/${userId}`}
          textLink={"Modifier mes informations"}
        />

        {/* Affichage des exercices */}
        <Card
                  icon={index_icons.Walking}

          title={"Exercices"}
          content={"Accéder à la liste des différents exercices disponibles"}
          link={`/exercises`}
          textLink={"Accéder au contenu exercices"}
        />

        {/* Section paramètres de l'utilisateur */}
        <Card
        icon={index_icons.Gears}
          title={"Mes paramètres"}
          content={"Accéder à la gestion de vos paramètres"}
          link={`/update-settings/${userId}`}
          textLink={"Accéder à mes paramètres"}
        />

        {/* Section historique de l'utilisateur */}
        <Card
                          icon={index_icons.Clock}
          title={"Mon historique"}
          content={"Accéder à votre historique d'exercices"}
          link={`/user-history/${userId}`}
          textLink={"Accéder à mon historique"}
        />

        {/* Si admin, lien vers dashboard : */}
        {isAdmin && (
          <Card
          icon={index_icons.Table}

            title={"Accéder au dashboard"}
            content={`${userData?.pseudo} accéder au dashboard`}
            link={`/dashboard`}
            textLink={"Accéder au dashboard"}
          />
        )}
        </div>
        
        {/* Affiche un lien vers DashBoard si administrateur par défaut n'affiche qu'un lien vers mon c */}
        <ConditionalNavLinks 
        isAdmin={isAdmin}
        />
      </div>
    </>
  );
}
