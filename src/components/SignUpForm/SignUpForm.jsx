import { useState } from "react";
import "./SignUpForm.scss";
import { useNavigate } from "react-router-dom";
import { USER_SIGNUP } from "../API/apiUser";
import CGU from "../CGU/CGU";
import "../../../sass/_preset.scss";

export default function SignUpForm() {
  // State CGU :
  const [cguAcceptation, setCguAcceptation] = useState(false);
  const [showCgu, setShowCgu] = useState(false);

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    sex: "",
    firstName: "",
    lastName: "",
    age: "",
    avatar: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    isAdmin: false,
    isBan: false,
  });

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    sex: "",
    firstName: "",
    lastName: "",
    age: "",
    avatar: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    cgu: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Vérifications des inputs :

    if (name === "sex") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sex: "Le champ sexe ne peut être vide",
        }));
      } else {
        const regexSex = /^(homme|femme)$/;
        const testRegexSex = regexSex.test(value);

        setErrors((prevErrors) => ({
          ...prevErrors,
          sex: testRegexSex ? "" : "Le champ sexe n'est pas valide",
        }));
      }
    }

    //02. Vérification du prénom :
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

    //03. Vérification du nom :
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

    //04. Vérification de l'âge :
    if (name === "age") {
      const regexAge = /^[0-9]{2,3}$/; // Au moins 2 chiffres
      const testAge = regexAge.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        age: testAge ? "" : "L'âge doit contenir au moins 2 chiffres",
      }));
    }

    // 05.Vérification de l'avatar :
    if (name === "avatar") {
      const regexImgAvatar = /\.(jpeg|jpg|gif|png|bmp|svg|webp|jpg)$/i;
      const testImgAvatar = regexImgAvatar.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: testImgAvatar ? "" : "L'URL de votre image n'est pas valide",
      }));
    }

    //06. Vérification du pseudo :
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

    //07. Vérification de l'email :
    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    //08. Vérification du mot de passe :
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

    //09. Vérification de la question secrète :
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

    // 10. Vérification de la réponse à la question secrète :
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

    // 11. Vérification de l'acceptation des Conditions Générales d'utilisation :
    if (name === "cgu") {
      const testCgu = checked;
      setCguAcceptation(testCgu);

      setErrors((prevErrors) => ({
        ...prevErrors,
        cgu: testCgu
          ? ""
          : "Vous devez accepter les Conditions Générales d'utilisation pour vous inscrire",
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      formData.sex &&
      formData.firstName &&
      formData.lastName &&
      formData.age &&
      formData.avatar &&
      formData.pseudo &&
      formData.email &&
      formData.password &&
      formData.securityQuestion &&
      formData.securityAnswer &&
      formData.cgu &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setErrorMessage("Erreur");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      sex: formData.sex,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      avatar: formData.avatar,
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
      const response = await fetch(`${USER_SIGNUP}`, {
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
          sex: "",
          firstName: "",
          lastName: "",
          age: "",
          avatar: "",
          pseudo: "",
          email: "",
          password: "",
          securityQuestion: "",
          securityAnswer: "",
          isAdmin: false,
          isBan: false,
        });

        setSuccessMessage(responseData.message);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } else {
        // La requête a échoué
        console.error("Échec de la requête :", response.statusText);
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Une erreur s'est produite lors de l'envoi de la requête
      console.error(error);
      setErrorMessage(
        "Une erreur s'est produite. Veuillez réessayer plus tard."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={handleSubmit} className="formRegister">
      <h2 className="form-title">Inscription</h2>
        <div className="form-group-avatar">
          <label htmlFor="avatar">Image de profil</label>
          <input
            type="text"
            value={formData.avatar}
            onChange={handleChange}
            name="avatar"
            id="avatar"
            placeholder="url de votre image de profil"
          />
          <label htmlFor="previewAvatar">Aperçu de l'avatar</label>
          <img src={formData.avatar} alt="avatar de l'utilisateur" />
          <span className="error">{errors.avatar}</span>
        </div>

        <div className="formContainer">
          <div className="formRegister__container">
            <div className="form-group-one">
              <div className="form-group lname">
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

              <div className="form-group fname">
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

              <div className="form-group age">
                <label htmlFor="age">Âge :</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="votre âge"
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

              <div className="form-group email">
                <label htmlFor="email">Votre mail :</label>
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

              <div className="form-group password">
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

              <div className="form-group securityQuestion">
                <label htmlFor="securityQuestion">Question:</label>
                <select
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  name="securityQuestion"
                  id="securityQuestion"
                >
                  <option value="0">Question secrète</option>
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

              <div className="form-group securityAnswers">
                <label htmlFor="securityAnswer">Réponse:</label>
                <input
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  type="text"
                  name="securityAnswer"
                  id="securityAnswer"
                  placeholder="Votre réponse"
                  required
                />
                <span className="error">{errors.securityAnswer}</span>
              </div>
            </div>

            <div className="form-group gender">
              <div className="genderTitle">
                <p>Genre :</p>
              </div>
              <div className="genderCategory">
                <div className="homme">
                  <input
                    type="radio"
                    id="homme"
                    name="sex"
                    value="homme"
                    checked={formData.sex === "homme"}
                    onChange={handleChange}
                    readOnly
                  />
                  <label htmlFor="homme">Homme</label>
                </div>

                <div className="femme">
                  <input
                    type="radio"
                    id="femme"
                    name="sex"
                    value="femme"
                    checked={formData.sex === "femme"}
                    onChange={handleChange}
                    readOnly
                  />
                  <label htmlFor="femme">Femme</label>
                </div>

                <span className="error">{errors.sex}</span>
              </div>
            </div>

              <div className="container_button cgu">
              <button onClick={() => setShowCgu(!showCgu)}>
                {showCgu ? "Cacher CGU" : "Afficher CGU"}
              </button>
              </div>
            <div className="form-group cgu">
              <label htmlFor="CGU">
                Conditions Générales d'utilisation (C.G.U)
              </label>

              <div className="form-group cgu inline">
                <p>Accepter </p>
                <input
                  checked={cguAcceptation}
                  onChange={handleChange}
                  type="checkbox"
                  name="cgu"
                  id="cgu"
                />
                <span className="error">{errors.cgu}</span>
              </div>
            </div>

            <span className="successMessage">{successMessage}</span>
            <span className="errorMessage">{errorMessage}</span>
            <div className="container_button">
              <button type="submit">S'inscrire</button>
            </div>
          </div>
        </div>
      </form>

      <div className="modal_cgu">{showCgu && <CGU />}</div>
    </div>
  );
}
