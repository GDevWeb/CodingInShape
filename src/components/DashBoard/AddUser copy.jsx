import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "", // nomAnimal, nomMere, villeNatale, seriePreferee
    securityAnswer: "",
    isAdmin: false,
    isBan: false,
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Gestion des erreurs dans le formulaire :
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

      // Vérifications des inputs :

    //01. Vérification du prénom :
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

    //02. Vérification du nom :
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

    //03. Vérification de l'âge :
    if (name === "age") {
      const regexAge = /^[0-9]{2,}$/; // Au moins 2 chiffres
      const testAge = regexAge.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: testAge ? "" : "L'âge doit contenir au moins 2 chiffres",
      }));
    }

    //04. Vérification du pseudo :
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

    //05. Vérification de l'email :
    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    //06. Vérification du mot de passe :
    if (name === "password") {
      const regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
      const testPassword = regexPassword.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: testPassword
          ? ""
          : "Le mot de passe doit contenir entre 8 et 12 caractères, au moins une majuscule, un chiffre et un caractère spécial",
      }));
    }

    //07. Vérification de la question secrète :
    if (name === "securityQuestion") {
      const regexSecurityQuestion = /^.{3,}$/; // Au moins 3 caractères
      const testSecurityQuestion = regexSecurityQuestion.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityQuestion: testSecurityQuestion
          ? ""
          : "La question secrète doit contenir au moins 3 caractères",
      }));
    }

    // 08. Vérification de la réponse à la question secrète :
    if (name === "securityAnswer") {
      const regexSecurityAnswer = /^.{3,}$/; // Au moins 3 caractères
      const testSecurityAnswer = regexSecurityAnswer.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityAnswer: testSecurityAnswer
          ? ""
          : "La réponse à la question secrète doit contenir au moins 3 caractères",
      }));
    }
  };


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Utilisateur créé avec succès");

        setFormData({
            firstName: "",
            lastName: "",
            age: "",
            pseudo: "",
            email: "",
            password: "",
            securityQuestion: "", 
            securityAnswer: "",
            isAdmin: false,
            isBan: false,
        });

        navigate("/dashboard"); 
      } else {
        console.error(
          "Impossible de créer l'utilisateur. Statut HTTP :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };
  return (
    <>
      <h1>Créer un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Âge :</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
  <label>Question de sécurité :</label>
  <select
    name="securityQuestion"
    value={formData.securityQuestion}
    onChange={handleChange}
    required
  >
    <option value="">Choisissez une question de sécurité</option>
    <option value="nomAnimal">Nom de votre animal de compagnie</option>
    <option value="nomMere">Nom de jeune fille de votre mère</option>
    <option value="villeNatale">Ville de naissance</option>
    <option value="seriePreferee">Série préférée</option>
  </select>
</div>
        <div>
          <label>Réponse à la question de sécurité :</label>
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Administrateur :</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={() =>
              setFormData({
                ...formData,
                isAdmin: !formData.isAdmin,
              })
            }
          />
        </div>
        <div>
          <label>Banni :</label>
          <input
            type="checkbox"
            name="isBan"
            checked={formData.isBan}
            onChange={() =>
              setFormData({
                ...formData,
                isBan: !formData.isBan,
              })
            }
          />
        </div>
        <button type="submit">Créer l'utilisateur</button>
      </form>
    </>
  );
}
