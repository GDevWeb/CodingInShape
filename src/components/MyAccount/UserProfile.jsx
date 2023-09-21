import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { USER_PROFIL } from '../API/apiUser';
import Spinner from '../../assets/icons/spinner.svg'
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USER_PROFIL}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser(data.userData);
        } else {
          console.log('Impossible de récupérer le profil utilisateur.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      }
    };

    fetchUserProfile(); 
  }, [isAuthenticated, navigate, token]); 

  return (
    <div className="user-profile">
      <h2>Mon profil</h2>
      {user ? (
        <div>
          <p>Prénom : {user.firstName}</p>
          <p>Nom : {user.lastName}</p>
          <p>Age : {user.age}</p>
          <p>Pseudo : {user.pseudo}</p>
          <p>Email : {user.email}</p>
        </div>
      ) : (
        <>
        <p>Chargement du profil en cours...</p>
        <img src={Spinner} alt=""/>
        </>
      )}
    </div>
  );
}
