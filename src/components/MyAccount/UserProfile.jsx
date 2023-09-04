import React, { useEffect, useState } from 'react';
import Spinner from '../../assets/icons/spinner.svg'

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        const token = localStorage.getItem('token');
        console.log('Token obtenu :', token);
                
        if (!token) {
          // Gérer le cas où l'utilisateur n'est pas authentifié
          console.log("Vous n'êtes pas authentifié.");
          return;
        }

        // Envoyer une requête GET vers votre API pour récupérer le profil utilisateur
        const response = await fetch(`http://localhost:4000/api/auth/myProfile/`, {
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
          document.cookie = `token=${data.token}; path=/account`;
        } else {
          console.log('Impossible de récupérer le profil utilisateur.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      }
    };

    fetchUserProfile(); 
  }, []); 

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
