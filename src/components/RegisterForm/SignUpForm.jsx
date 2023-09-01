import { useEffect, useState } from "react";
import "./SignUpForm.scss";
import { set } from "mongoose";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pseudo: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    isBan: false,
  });

  // Inputs : 
  // Pour gérer le message de succès si tous les inputs = ok :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [error, setError] = useState("");

  // Pour gérer la bonne saise du prénom : 
  const [firstNameValid, setFirstNameValid] = useState(false);

  // Pour gérer la bonne saisie du nom :
  const [lastNameValid, setLastNameValid] = useState(false);

  // Pour gérer la bonne saisie du pseudo :
  const [pseudoValid, setPseudoValid] = useState(false);

  // Pour gérer la bonne saisie du mdp :
  const [passwordValid, setPasswordValid] = useState(false);

  // Pour gérer la bonne saisie de l'email :
  const [emailValid, setEmailValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } =
      e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // ##Vérifications des inputs : 

    //01. Vérification de la saisie du firstName :
    if (name === "firstName") {
      const regexFirstName = /^([a-z A-Z]).{3,}$/;
      const testFirstName = regexFirstName.test(value);
      setFirstNameValid(testFirstName);

      if (!testFirstName) {
        setError("Le prénom doit contenir au moins 3 caractères");
      } else {
        setError("");
        setFirstNameValid(true);
      }
    }

    //02. Vérification de la saisie de lastName :
    if (name === "lastName") {
      const regexLastName =  /^([a-z A-Z]).{3,}$/;
      const testLastName = regexLastName.test(value);
      setLastNameValid(testLastName);

      if (!testLastName) {
        setError("Le nom doit contenir au moins 3 caractères");
      } else {
        setError("");
        setLastNameValid(true);
      }  
    }  

    // 03.Vérification de la saisie du pseudo : 
    if (name === "pseudo") {
      const regexPseudo = /^([a-zA-Z 0-9]).{3,}$/; 
      const testPseudo = regexPseudo.test(value);
      setPseudoValid(testPseudo);
    
      if (!testPseudo) {
        setError("Le pseudo doit contenir au moins 3 lettres.");
      } else {
        setError("");
      }
    }
    
    //03. Vérification de la saisie du password :
    // Vérification du mot de passe et de sa confirmation
if (name === "password" || name === "confirmPassword") {
  if (name === "confirmPassword") {
    if (value !== formData.password) {
      setError("Les mots de passe ne sont pas identiques");
    } else {
      setError("");
      setPasswordValid(true);
    }
  } else if (name === "password") {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{12,}$/;
    const testPassword = regexPassword.test(value);
    setPasswordValid(testPassword);

    if (!testPassword) {
      setError("Le mot de passe doit contenir 12 caractères, au moins une majuscule, un chiffre et un caractère spécial");
    } else {
      setError("");
      setPasswordValid(true);
    }
  }
}
    
  //03. Vérification de la saisie du password :
  //   if(name === "password" || name === "confirmPassword"){
  //     if (name === "password"){
  //       const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,12}$/;
  //       const testPassword = regexPassword.test(value);
  //     setPasswordValid(testPassword);

  //     if (!testPassword) {
  //       setError("Le mot de passe doit contenir entre 8 et 12 caractères, au moins une majuscule, un chiffre et un caractère spécial");
  //     } else {
  //       setError("");
  //       passwordValid(true);
  //     }
      
  //   }
  // }
    
    //04. Vérification de la saisie de l'email :
    if (name === "email") {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const testEmail = regexEmail.test(value);
      setEmailValid(testEmail);

      if (!testEmail) {
        setError("L'adresse email n'est pas valide");
      } else {
        setError("");
        setEmailValid(true);
      }
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ##Vérification de la saisie des inputs :
    if ( !firstNameValid || !lastNameValid || !pseudoValid || !passwordValid || !emailValid) {
      setError("Veuillez vérifier vos saisies");
      return;
    }else {
      setError("");
      setSuccess("Votre compte a bien été créé");
    }

    console.log(formData);

    fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formRegister">
      <div className="formRegister__container">
        <h2>Créer un compte :</h2>

        <div className="form-group-one">
          <div className="form-group">
            <label htmlFor="name">Nom :</label>
            <input
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Votre nom"
              required
            />
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
          </div>
        </div>
        {/* end form(group-one ) */}

        {/* confirm password : */}
        <div className="form-group-two">
          <div className="form-group">
            <label htmlFor="password">Mot de passe: </label>
            <p>
              (entre 8 et 12 caractères 1 majuscule, 1 chiffre et 1 caractère
              spécial requis) :
            </p>
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="votre pseudo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmer votre mot de passe
            </label>
            <input
            value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Votre email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Votre email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirmer votre email</label>
            <input
            value={formData.confirmEmail}
              onChange={handleChange}
              type="email"
              name="confirmEmail"
              id="confirmEmail"
              placeholder="Votre email"
              required
            />
          </div>
        </div>

        <button type="submit">Se connecter</button>
      </div>
    </form>
  );
             }
