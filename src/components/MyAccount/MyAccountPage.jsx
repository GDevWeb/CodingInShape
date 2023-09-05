import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LogoutButton from './LogoutButton';
import UpdateEmailForm from './UpdateEmailForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import UserExercises from './UserExercises';
import UserHistory from './UserHistory';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import Spinner from "../../assets/icons/spinner.svg";


export default function MyAccountPage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le token depuis les cookies
        // const token = Cookies.get("token");
        const token = localStorage.getItem("token");
        console.log('Token obtenu :', token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:4000/api/auth/MyProfile", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
          setIsLoading(false);
        } else {
          console.error('Impossible de récupérer les données de l\'utilisateur.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="my-account-page">
      {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
      {/* Affichage des données de l'utilisateur connecté */}
    {userData && (
      <div className="user-profile-section">
      <h1>Mon compte</h1>
      <UserProfile userData={userData} />
      </div>
      )}

      {/* Mise à jour du mail */}
      {userData && (
        <div className="update-email-section">
          <h2>Modifier mon email</h2>
          <UpdateEmailForm userData={userData} />
        </div>
      )}

      {/* Mise à jour du mot de passe */}
      {userData && (
        <div className="update-password-section">
          <h2>Modifier mon mot de passe</h2>
          <UpdatePasswordForm userData={userData} />
        </div>
      )}

      {/* Affichage des exercices */}
      {userData && (
        <div className="user-exercises-section">
          <h2>Mes exercices</h2>
          {/* button link  */}
          <Link to="/allExercises" className='linkTo'>Voir la liste des exercices</Link> 
        </div>
      )}

      {/* Section paramètres de l'utilisateur */}
      {userData && (
        <div className="user-settings-section">
          <h2>Paramètres</h2>
          <UserSettings userData={userData} />
        </div>
      )}

      {/* Section historique de l'utilisateur */}
      {userData && (
        <div className="user-history-section">
          <h2>Historique</h2>
          <UserHistory userData={userData} />
        </div>
      )}

      {/* Bouton de déconnexion */}
      <LogoutButton />
    </div>
  );
}
