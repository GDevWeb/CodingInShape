import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_PROFIL } from "../API/apiUser";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CircleUser from "../../assets/icons/CircleUser.svg";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";
import './UpdateProfile.scss'

export default function UpdateProfile() {

  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userData?.id);

  // Redirection :
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    sex: "",
    age: "",
    firstName: "",
    lastName: "",
    avatar: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [serverErrors, setServerErrors] = useState("");
  const [errors, setErrors] = useState({
    sex: "",
    age: "",
    firstName: "",
    lastName: "",
    avatar: "",
    pseudo: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // Vérifications des inputs :
    if (name === "sex") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sex: "Le champ sex ne peut être vide",
        }));
      } else {
        const regexSex = /^(homme|femme|autre)$/;
        const testRegexSex = regexSex.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          sex: testRegexSex ? "" : "Le champ sex n'est pas valide",
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USER_PROFIL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            userId: data.userData.id,
            sex: data.userData.sex,
            age: data.userData.age,
            firstName: data.userData.firstName,
            lastName: data.userData.lastName,
            avatar: data.userData.avatar,
            pseudo: data.userData.pseudo,
            email: data.userData.email,
            password: "",
            securityQuestion: data.userData.securityQuestion,
            securityAnswer: data.userData.securityAnswer,
          });

        } else {
          console.error(
            "Impossible d'obtenir les données de l'utilisateur. HTTP Status:",
            response.status
          );
          setServerErrors("Impossible d'obtenir les données de l'utilisateur");

          setTimeout(() => {
            setServerErrors("");
          }, 3000);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setServerErrors("Erreur lors de la récupération des données");

        setTimeout(() => {
          setServerErrors("");
        }, 3000);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      userData.sex &&
      userData.firstName &&
      userData.lastName &&
      userData.avatar &&
      userData.pseudo &&
      userData.email &&
      userData.password &&
      userData.securityQuestion &&
      userData.securityAnswer &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setServerErrors("");
      return;
    }

    setServerErrors("Compte utilisateur mis à jour avec succès");

    const updatedUserData = {
      sex: userData.sex,
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      avatar: userData.avatar,
      pseudo: userData.pseudo,
      email: userData.email,
      password: userData.password,
      securityQuestion: userData.securityQuestion,
      securityAnswer: userData.securityAnswer,
      isAdmin: userData.isAdmin,
      isBan: userData.isBan,
    };

    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/admin/users/${userId}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(updatedUserData),
        }
      );

      if (response.ok) {
        setServerErrors("Utilisateur mis à jour avec succès");
        setTimeout(() => {
          setServerErrors("");
          navigate("/myaccount");
        }, 3000);
      } else {
        console.error(
          "Impossible de mettre à jour les informations de l'utilisateur. HTTP Status:",
          response.status
        );
        setServerErrors(
          "Impossible de mettre à jour les informations de l'utilisateur"
        );

        setTimeout(() => {
          setServerErrors("");
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
      setServerErrors("Erreur lors de la mise à jour des données");

      setTimeout(() => {
        setServerErrors("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="titleUpdate">
        <h2>Modification des données utilisateur</h2>

        <div className="updateContainer">

          <form onSubmit={handleSubmit} >

            <div className="form-group-avatar-update">
              <label htmlFor="previewAvatar">Aperçu de l'avatar</label>
              <img
                src={userData.avatar || CircleUser}
                alt="Avatar de l'utilisateur"
                width={"100px"}
              />
              <label htmlFor="avatar">Image de profil</label>
              <input
                type="text"
                value={userData.avatar || ""}
                onChange={handleChange}
                name="avatar"
                id="avatar"
                placeholder="URL de votre image de profil"
              />
              <span className="error">{errors.avatar}</span>
            </div>

            <div className="form-group-one-update">

              <div className="form-group">

                <label htmlFor="lastName">Nom :</label>
                <input
                  value={userData.lastName}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Votre nom"
                  required
                  readOnly
                />
                <span className="error">{errors.lastName}</span>
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Prénom :</label>
                <input
                  value={userData.firstName}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Votre prénom"
                  required
                  readOnly
                />
                <span className="error">{errors.firstName}</span>
              </div>

              <div className="form-group">
                <label htmlFor="age">Âge :</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={userData.age}
                  onChange={handleChange}
                  placeholder="Votre âge"
                  readOnly
                />
                <span className="error">{errors.age}</span>
              </div>



              <div className="form-group">
                <label htmlFor="pseudo">Pseudo :</label>
                <input
                  value={userData.pseudo}
                  onChange={handleChange}
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  placeholder="Votre pseudo"
                  required
                  readOnly
                />
                <span className="error">{errors.pseudo}</span>
              </div>

              <div className="form-group">
                <label htmlFor="email">Votre mail :</label>
                <input
                  value={userData.email}
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
                  value={userData.password}
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
                  value={userData.securityQuestion}
                  onChange={handleChange}
                  name="securityQuestion"
                  id="securityQuestion"
                >
                  <option value="0">Choisissez votre question secrète</option>
                  <option value="nomAnimal">
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
                  value={userData.securityAnswer}
                  onChange={handleChange}
                  type="text"
                  name="securityAnswer"
                  id="securityAnswer"
                  placeholder="Votre réponse"
                  required
                />
                <span className="error">{errors.securityAnswer}</span>

              </div>

              <div className="form-group-gender">
                <nav>Sexe :</nav>
                <div className="gender-title">


                  <div className="homme">
                    <input
                      type="radio"
                      id="homme"
                      name="sex"
                      value="homme"
                      checked={userData.sex === "homme"}
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
                      checked={userData.sex === "femme"}
                      onChange={handleChange}
                      readOnly
                    />
                    <label htmlFor="femme">Femme</label>
                  </div>

                  <div className="autre">
                    <input
                      type="radio"
                      id="autre"
                      name="sex"
                      value="autre"
                      checked={userData.sex === "autre"}
                      onChange={handleChange}
                      readOnly
                    />
                    <label htmlFor="autre">Autre</label>
                  </div>
                  <span className="error">{errors.sex}</span>
                </div>
              </div>
            </div>

            <button type="submit">Mettre à jour</button>
            <span className="success-message">{successMessage}</span>
            <div className="server-error">{serverErrors}</div>

            <ConditionalNavLinks isAdmin={isAdmin} />

          </form>
        </div>
      </div>
    </>
  );
}