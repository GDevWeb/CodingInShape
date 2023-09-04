import React, { useEffect } from 'react'
import { useState } from 'react'
import LogoutButton from './LogoutButton'
import UpdateEmailForm from './UpdateEmailForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import UserExercises from './UserExercises'
import UserHistory from './UserHistory'
import UserProfile from './UserProfile'
import UserSettings from './UserSettings'
import { get } from 'mongoose'


export default function MyAccountPage() {

  const [userData, setUserData] = useState(null)

  // req au serveur pour récupérer les données de l'utilisateur connecté
  // utilisation du token stocké dans le cookie pour s'authentifier auprès du serveur
  // Mise à jour du state userData avec les données reçues du serveur 

  return (
    <div className="my-account-page">

    <h1>Mon compte</h1>

    {/* // Affichage des données de l'utilisateur connecté : */}

    <UserProfile/>
    {/* Mise à jour du mail :  */}
    {userData && (

      <div className="update-email-section">
    <h2>Modifier mon email</h2>
    <UpdateEmailForm/>
    </div>
      )}

    {/* Mise à jour du mot de passe :  */}
    {userData && ( 
      <div className="update-password-section">
    <h2>Modifier mon mot de passe</h2>
    <UpdatePasswordForm/>
    </div>
      )}

    {/* Affichage des exercices :  */}
    {userData && (

      <div className="user-exercises-section">
    <h2>Mes exercices</h2>
    <UserExercises/>
    </div>
    )}

    {/* Section paramètres de l'utilisateur : */}

    {userData && (
      <div className="user-settings-section">
    <h2>Paramètres</h2>
    <UserSettings/>
      </div>
    )}

    {/* Section historique de l'utilisateur :  */}

    {userData && (
      <div className="user-history-section">
    <h2>Historique</h2>
      <UserHistory/>
      </div>
    )}


      {/* Bouton de déconnexion : */}
      <LogoutButton/>
 


    </div>

  )
}
