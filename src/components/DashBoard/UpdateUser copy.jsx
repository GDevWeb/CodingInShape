import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  USERS_API,
} from "../apiAdmin";

export default function UpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");
  const [formErrors, setFormErrors] = useState({

      firstName : "",
      lastName : "",
      email : "",
      password : "",
      securityAnswer : "",
      securityQuestion : "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

        // Vérifications des inputs :

    //01. Vérification du prénom :
    if (name === "firstName") {
      const regexFirstName = /^.{3,}$/; // Au moins 3 caractères
      const testFirstName = regexFirstName.test(value);
      setFormErrors((prevErrors) => ({
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
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        lastName: testLastName
          ? ""
          : "Le nom doit contenir au moins 3 caractères",
      }));
    }

    //03. Vérification de l'âge :
    if (name === "age") {
      const regexAge = /^[0-9]{2,3}$/; // Au moins 2 chiffres
      const testAge = regexAge.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        age: testAge ? "" : "L'âge doit contenir au moins 2 chiffres",
      }));
    }

    //04. Vérification du pseudo :
    if (name === "pseudo") {
      const regexPseudo = /^.{3,}$/; // Au moins 3 caractères
      const testPseudo = regexPseudo.test(value);
      setFormErrors((prevErrors) => ({
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
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    //06. Vérification du mot de passe :
    if (name === "password") {
      const regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
      const testPassword = regexPassword.test(value);
      setFormErrors((prevErrors) => ({
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
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        securityQuestion: testSecurityQuestion
          ? ""
          : "La question secrète ne peut pas être nulle",
      }));
    }

    // 08. Vérification de la réponse à la question secrète :
    if (name === "securityAnswer") {
      const regexSecurityAnswer = /^.{3,}$/; // Au moins 3 caractères
      const testSecurityAnswer = regexSecurityAnswer.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        securityAnswer: testSecurityAnswer
          ? ""
          : "La réponse à la question secrète doit contenir au moins 3 caractères",
      }));
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USERS_API}/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
7        } else {
          console.error(
            "Impossible d'obtenir les données de l'utilisateur. HTTP Status:",
            response.status
          );
          setServerErrors("Impossible d'obtenir les données de l'utilisateur");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setServerErrors("Erreur lors de la récupération des données");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Vérification de la saisie des inputs :
        const isValid =
        userData.firstName &&
        userData.lastName &&
        userData.email &&
        userData.password &&
        userData.securityQuestion &&
        userData.securityAnswer &&
        Object.values(formErrors).every((error) => error === "");
      
    if (!isValid) {
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("Compte utilisateur mis à jour avec succès");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const updatedUserData = {
      firstName: setUserData.firstName,
      lastName: setUserData.lastName,
      age: setUserData.age,
      pseudo: setUserData.pseudo,
      email: setUserData.email,
      password: setUserData.password,
      securityQuestion: setUserData.securityQuestion,
      securityAnswer: setUserData.securityAnswer,
      isAdmin: setUserData.isAdmin,
      isBan: setUserData.isBan,
    };


    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${USERS_API}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        setSuccessMessage("Utilisateur mis à jour avec succès");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/dashboard")
        }, 3000);

      } else {
        console.error(
          "Impossible de mettre à jour les informations de l'utilisateur. HTTP Status:",
          response.status
        );
        setServerErrors(
          "Impossible de mettre à jour les informations de l'utilisateur"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
      setServerErrors("Erreur lors de la mise à jour des données");
    }
  };

  return (
    <>
      <h3>Modification des données utilisateur </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <span
          className="error"
          >{formErrors.firstName}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
                    <span
          className="error"
          >{formErrors.lastName}
          </span>

        </div>

        <div className="form-group">
          <label htmlFor="email">e-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
                    <span
          className="error"
          >{formErrors.email}
          </span>
        </div>

        <div className="form-group">
            <label htmlFor="securityQuestion">Question de sécurité</label>
            <select
              value={userData.securityQuestion}
              onChange={handleChange}
              name="securityQuestion"
              id="securityQuestion"
            >
              <option value="0">Choisissez votre question secrète</option>
              <option value="nomAnimal">
                {" "}
                Quel est le nom de votre premier animal de compagnie ?
              </option>
              <option value="nomMere">
                Quel est le nom de jeune fille de votre mère ?
              </option>
              <option value="villeNatale">
                Quel est le nom de votre ville natale ?
              </option>
              <option value="seriePreferee">
                Quelle est votre série préférée ?
              </option>
            </select>
            <span
          className="error"
          >{formErrors.securityQuestion}
          </span>
          </div>


        <div className="form-group">
          <label htmlFor="securityAnswer">Réponse</label>
          <input
            type="text"
            name="securityAnswer"
            id="securityAnswer"
            value={userData.securityAnswer}
            onChange={handleChange}
          />
                    <span
          className="error"
          >{formErrors.securityAnswer}
          </span>

        </div>

        <button type="submit">Update</button>
      </form>

      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="server-error">
        {serverErrors && <p>{serverErrors}</p>}
      </div>
    </>
  );
}
