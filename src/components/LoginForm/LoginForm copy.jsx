import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setUserData, updateAdminStatus } from '../../../redux/slices/AuthSlice';
import { USER_LOGIN, USER_PROFILE } from "../API/apiUser";
import "./LoginForm.scss";
import Cookies from 'js-cookie'; // Importez js-cookie

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ... Autres états et gestionnaires de changement inchangés ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des erreurs ...
    
    try {
      // Envoi de la requête POST au serveur ...
      const response = await fetch(`${USER_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        // Stockez le token dans un cookie
        Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });

        // Dispatchez l'action loginSuccess pour stocker le token dans Redux
        dispatch(loginSuccess(data));

        // Fetch séparé pour récupérer les données utilisateur
        const userDataResponse = await fetch(`${USER_PROFILE}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        });
        const userData = await userDataResponse.json();

        // Dispatch l'action setUserData pour stocker les données utilisateur dans Redux
        dispatch(setUserData(userData));
        dispatch(updateAdminStatus(userData.isAdmin));

        setFormData({ 
          email: "",
          password: "",
        });

        // On redirige l'utilisateur vers la page mon compte :
        navigate("/myaccount");
      } else {
        dispatch(loginFailure(data.error)); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      {/* ... Votre formulaire inchangé ... */}
    </form>
  );
}
