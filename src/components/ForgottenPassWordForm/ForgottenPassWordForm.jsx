import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgottenPassWordForm() {
  const [formData, setFormData] = useState({
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [isValid, setIsValid] = useState(false);

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    email: "",
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

    // Vérification de l'email :
    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    // Vérification de la question secrète :
    if (name === "securityQuestion") {
      const regexSecurityQuestion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testSecurityQuestion = regexSecurityQuestion.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityQuestion: testSecurityQuestion
          ? ""
          : "La question secrète n'est pas valide",
      }));
    }

    // Vérification de la réponse à la question secrète :
    if (name === "securityAnswer") {
      const regexSecurityAnswer = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testSecurityAnswer = regexSecurityAnswer.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityAnswer: testSecurityAnswer
          ? ""
          : "La réponse à la question secrète n'est pas valide",
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des erreurs :
    const isValid =
      formData.email &&
      formData.securityQuestion &&
      formData.securityAnswer &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }
    setSuccess("");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      email: formData.email,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
    };

    try {
      // Envoi de la requête POST au serveur:
      const response = await fetch(
        "http://localhost:4000/api/users/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();
      console.log(data);
      //Si la requête s'est bien passée 200 :
      if (response.ok) {
        setSuccess("Mot de passe réinitialisé !");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      setSuccess("Une erreur est survenue, veuillez réessayer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formRegister">
      <div className="formRegister__container">
        <h2>Récupération du mot de passe :</h2>

        <div className="form-group-one">
          <div className="form-group">
            <label htmlFor="email">Votre email :</label>
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
            <label htmlFor="securityQuestion">Question secrète :</label>
            <select
              value={formData.securityQuestion}
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
            <label htmlFor="securityQuestion">Votre réponse :</label>
            <input
              value={formData.securityAnswer}
              onChange={handleChange}
              type="text"
              name="securityAnswer"
              id="securityAnswer"
              placeholder="Votre réponse"
            />
            <span className="error">{errors.securityAnswer}</span>
          </div>
        </div>

        <button type="submit">Se connecter</button>
      </div>
    </form>
  );
}
