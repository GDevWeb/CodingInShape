import { useState } from "react";
import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
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

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      const regexAge = /^[0-9]{2,3}$/; // Au moins 2 chiffres
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.age &&
      formData.pseudo &&
      formData.email &&
      formData.password &&
      formData.securityQuestion &&
      formData.securityAnswer &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setSuccess("Votre compte a bien été créé");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      pseudo: formData.pseudo,
      email: formData.email,
      password: formData.password,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
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

        // On vide le formulaire :
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

        navigate("/login");
      } else {
        // La requête a échoué
        console.error("Échec de la requête :", response.statusText);
        return response({ error: "Une erreur est survenue" });
      }
    } catch (error) {
      // Une erreur s'est produite lors de l'envoi de la requête
      console.error(error);
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
            <label htmlFor="age">Âge :</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            />
          <span className="error">{errors.age}</span>
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
              placeholder="Votre email"
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

          <div className="form-group">
            <label htmlFor="securityQuestion">Question de sécurité</label>
            <select
              value={formData.securityQuestion}
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
            <span className="error">{errors.securityQuestion}</span>
          </div>

          <div className="form-group">
            <label htmlFor="securityAnswer">
              Réponse à la question secrète :
            </label>
            <input
              value={formData.securityAnswer}
              onChange={handleChange}
              type="text"
              name="securityAnswer"
              id="securityAnswer"
              placeholder="Votre réponse"
              required
            />
            <span className="error">{errors.email}</span>
          </div>
        </div>

        <button type="submit">S'inscrire</button>
        <span className="success">{success}</span>
      </div>
    </form>
  );
}