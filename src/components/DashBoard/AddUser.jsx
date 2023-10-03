import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../../redux/slices/apiUsersSlice";
import { USERS_API } from "../API/apiAdmin";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";

export default function AddUser() {
  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // État local :
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
  });

  const [serverErrors, setServerErrors] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vérifications des inputs :
    if (name === "sexe") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sexe: "Le champ sexe ne peut être vide",
        }));
      } else {
        const regexSex = /^(homme|femme)$/;
        const testRegexSex = regexSex.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          sexe: testRegexSex ? "" : "Le champ sexe n'est pas valide",
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
      const regexImgAvatar = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs du formulaire sont valides
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
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setServerErrors("");

    // Créer un objet contenant les données du formulaire à envoyer au serveur
    const userData = {
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
      await dispatch(
        callApi({
          method: "POST",
          url: USERS_API,
          token: token,
          data: userData,
        })
      );

      setSuccess("Utilisateur créé avec succès !");

      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      setServerErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formRegister">
      <div className="formRegister__container">
        <h2>Créer un compte :</h2>

        <div className="form-group">
          <label>sex :</label>
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
          <span className="error">{errors.sex}</span>
        </div>

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
              placeholder="votre âge"
            />
            <span className="error">{errors.age}</span>
          </div>

          <div className="form-group">
            <label htmlFor="previewAvatar">Aperçu de l'avatar</label>
            <img
              src={formData.avatar}
              alt="avatar de l'utilisateur"
              width={"100px"}
              height={"auto"}
            />
            <label htmlFor="avatar">Image de profil</label>
            <input
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              name="avatar"
              id="avatar"
              placeholder="url de votre image de profil"
            />
            <span className="error">{errors.avatar}</span>
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
            <label htmlFor="email">Votre mail :</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Votre mail"
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
            <span className="error">{errors.securityAnswer}</span>
            <span className="error">{serverErrors}</span>
          </div>
        </div>

        <button type="submit">S'inscrire</button>
        <span className="success">{success}</span>
      </div>
      <ConditionalNavLinks isAdmin={isAdmin} />
    </form>
  );
}
