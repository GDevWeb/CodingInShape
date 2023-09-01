import React, { useState } from "react";
import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pseudo: "",
    email: "",
    password: "",
    isAdmin: false,
    isBan: false,
  });

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    pseudo: "",
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

    // Vérification du prénom :
    if (name === "firstName") {
      const regexFirstName = /^.{3,}$/; // Au moins 3 caractères
      const testFirstName = regexFirstName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: testFirstName
          ? ""
          : "Le prénom doit contenir au moins 3 caractères",
      }));
    }

    // Vérification du nom :
    if (name === "lastName") {
      const regexLastName = /^.{3,}$/; // Au moins 3 caractères
      const testLastName = regexLastName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: testLastName
          ? ""
          : "Le nom doit contenir au moins 3 caractères",
      }));
    }

    // Vérification du pseudo :
    if (name === "pseudo") {
      const regexPseudo = /^.{3,}$/; // Au moins 3 caractères
      const testPseudo = regexPseudo.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        pseudo: testPseudo
          ? ""
          : "Le pseudo doit contenir au moins 3 caractères",
      }));
    }

    // Vérification du mot de passe :
    if (name === "password") {
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
      const testPassword = regexPassword.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: testPassword
          ? ""
          : "Le mot de passe doit contenir entre 8 et 12 caractères, au moins une majuscule, un chiffre et un caractère spécial",
      }));
    }
            
    // Vérification de l'email :
    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.pseudo &&
      formData.email &&
      formData.password &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setSuccess("Votre compte a bien été créé");

    // Création d'un objet pour les données à envoyer
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      pseudo: formData.pseudo,
      email: formData.email,
      password: formData.password,
      isAdmin: formData.isAdmin,
      isBan: formData.isBan,
    };

    try {
      // Envoi de la requête POST au serveur
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        
      });

      if (response.ok) {
        // La requête a réussi (statut 200 OK)
        const responseData = await response.json();
        console.log("Réponse du serveur :", responseData);
        
        setFormData({ 
          
          firstName: "",
          lastName: "",
          pseudo: "",
          email: "",
          password: "",
          isAdmin: false,
          isBan: false,
        });
        
        navigate("/login");

      } else {
        // La requête a échoué
        console.error("Échec de la requête :", response.statusText);
        return response({ error: "Une erreur est survenue" });
      }
    } catch (error) {
      // Une erreur s'est produite lors de l'envoi de la requête
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formRegister">
      <div className="formRegister__container">
        <h2>Créer un compte :</h2>

        <div className="form-group-one">
          <div className="form-group">
            <label htmlFor="lastName">Nom :</label>
            <input
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Votre nom"
              required
            />
            <span className="error">{errors.lastName}</span>
          </div>

          <div className="form-group">
            <label htmlFor="firstName">Prénom :</label>
            <input
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Votre prénom"
              required
            />
            <span className="error">{errors.firstName}</span>
          </div>

          <div className="form-group">
            <label htmlFor="pseudo">Pseudo :</label>
            <input
              value={formData.pseudo}
              onChange={handleChange}
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="Votre pseudo"
              required
            />
            <span className="error">{errors.pseudo}</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Votre e-mail :</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Votre mot de passe"
              required
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
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

        </div>

        <button type="submit">S'inscrire</button>
        <span className="success">{success}</span>
      </div>
    </form>
  );
}
