import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import { set } from "mongoose";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
      const regexPassword = /^.{8,}$/; // Au moins 6 caractères
      const testPassword = regexPassword.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: testPassword
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des erreurs :
    const isValid =
      formData.email &&
      formData.password &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }
    setSuccess("Vous êtes connecté(e) !");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Envoi de la requête POST au serveur :
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        bearer: JSON.stringify(requestData),
      });
      const data = await response.json();
      console.log(data);
      // Si la requête s'est bien passée 200:
      if (response.ok) {
        // On stocke le token dans le localStorage :
        document.cookie = `token=${data.token}; path=/account`;
        console.log(data.token);
        setFormData({ 
          email: "",
          password: "",
        });

        // On redirige l'utilisateur vers la page d'accueil :
        navigate("/");
      } else {
        // Sinon, on affiche un message d'erreur :
        alert(data.error);
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
          <Link  to="/forgotten" className="forgottenPasswordLink">
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
