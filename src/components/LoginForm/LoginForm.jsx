import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  setUserData,
  updateAdminStatus,
} from "../../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { USER_LOGIN, USER_PROFIL } from "../API/apiUser";
import "./LoginForm.scss";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vérifications des inputs :
    // Vérification de l'email :
    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    // Vérification du mot de passe :
    if (name === "password") {
      const regexPassword = /^.{8,}$/; // Au moins 8 caractères
      const testPassword = regexPassword.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: testPassword
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des erreurs :
    const isValid =
      formData.email &&
      formData.password &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      return;
    }

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    try {
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
        // Stocke le token dans un cookie sécurisé et strict
        Cookies.set("token", data.token, { secure: true, sameSite: "strict" });

        // Dispatch l'action loginSuccess pour stocker le token dans Redux
        dispatch(loginSuccess(data));

        const userDataResponse = await fetch(`${USER_PROFIL}`, {
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

        // Redirige l'utilisateur vers la page mon compte :
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
      <div className="LoginForm__container">
        <h2>Se connecter :</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            required
          />
          <span className="error">{errors.email}</span>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <span className="error">{errors.password}</span>
        </div>
        <p className="recupPassword">
          <Link to="/forgotten" className="forgottenPasswordLink">
            mot de passe oublié ?
          </Link>
        </p>

        <button type="submit">Se connecter</button>

        <p className="invitCreateAccount">
          Pas encore de compte ?
          <Link className="createAccountLink" to="/signup">
            {" "}
            Créer un compte
          </Link>
        </p>
      </div>
    </form>
  );
}
